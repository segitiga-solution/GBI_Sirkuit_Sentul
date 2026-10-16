import { useEffect, useState } from "react";

/* ===============================
   CONTENT STORE — sumber data tunggal untuk website & halaman admin.
   Data disimpan di localStorage sehingga bisa diubah lewat /#/admin
   tanpa perlu backend. Jika belum pernah diedit, default = data bawaan.
================================ */

export interface VideoItem {
  title: string;
  date: string;
  category: string;
  youtubeId: string;
}

export interface ScheduleItem {
  day: string;
  time: string;
  service: string;
  note: string;
}

export interface SiteContent {
  sermons: VideoItem[]; // daftar khotbah (section "Kegiatan & Khotbah")
  activities: VideoItem[]; // video kegiatan jemaat
  weeklyPreacherIds: string[]; // id khotbah yang tampil sebagai "Khotbah Minggu Ini"
  schedules: ScheduleItem[];
  flyers: string[]; // gambar flyer pengkhotbah minggu ini
}

/* ---------- DATA BAWAAN ---------- */

const defaultSchedules: ScheduleItem[] = [
  {
    day: "Minggu",
    time: "09:00 WIB",
    service: "Ibadah Umum",
    note: "Ibadah raya seluruh jemaat setiap Minggu pagi",
  },
  {
    day: "Minggu",
    time: "09:00 WIB",
    service: "Sekolah Minggu",
    note: "Pembinaan iman anak-anak sejak usia dini",
  },
];

const defaultSermons: VideoItem[] = [
  {
    title: "Pdm. Sandra Suharsa | Warisan",
    date: "14 Mei 2026",
    category: "Khotbah",
    youtubeId: "OJg8ZRBc5bA",
  },
  {
    title: "Ev. Rudi Hidayat | Rooted",
    date: "10 Mei 2026",
    category: "Khotbah",
    youtubeId: "Sd0DIxIzZwY",
  },
  {
    title: "Pdt. Abed Purnomo | Membangkitkan Iman",
    date: "3 Mei 2026",
    category: "Khotbah",
    youtubeId: "xuJhHSXwhgw",
  },
  {
    title:
      "EV. Hendri J Pandiangan | Kematian dan Kebangkitan Tuhan Yesus Kristus",
    date: "26 April 2026",
    category: "Khotbah",
    youtubeId: "dN8X_K8USaQ",
  },
  {
    title: "Pdt. Matius Ginting | Mujizat Paskah",
    date: "19 April 2026",
    category: "Khotbah",
    youtubeId: "rDoPFxlCGHA",
  },
  {
    title: "Pdt. Ivonne Ahimsa | Perlindungan Gembala",
    date: "12 April 2026",
    category: "Khotbah",
    youtubeId: "Dd1Iz-Jze7k",
  },
  {
    title: "The Year of The Great Commission | Khotbah EV Hokke Andrian J",
    date: "29 Maret 2026",
    category: "Khotbah",
    youtubeId: "qeiI9XhJrVs",
  },
  {
    title: "Refleksi | Khotbah Firman Tuhan - Pdm. Sandy Suharsa",
    date: "1 Maret 2026",
    category: "Khotbah",
    youtubeId: "oQWY7JixHls",
  },
];

const defaultActivities: VideoItem[] = [
  {
    title: "Ibadah Agung Paskah GBI Sirkuit Sentul",
    date: "20 April 2026",
    category: "Kegiatan",
    youtubeId: "rDoPFxlCGHA",
  },
];

const defaultFlyers = [
  "/flyer-pengkhotbah.jpeg",
  "/flyer-pengkhotbah3.jpeg",
  "/flyer-pengkhotbah4.jpeg",
  "/flyer-pengkhotbah5.jpeg",
  "/flyer-pengkhotbah6.jpeg",
  "/flyer-pengkhotbah7.png",
  "/flyer-pengkhotbah8.jpeg",
  "/flyer-pengkhotbah9.jpeg",
  "/flyer-pengkhotbah10.jpeg",
  "/flyer-pengkhotbah11.jpeg",
  "/flyer-pengkhotbah12.jpeg",
  "/flyer-pengkhotbah13.jpeg",
];

export const defaultContent: SiteContent = {
  sermons: defaultSermons,
  activities: defaultActivities,
  weeklyPreacherIds: [defaultSermons[0].youtubeId],
  schedules: defaultSchedules,
  flyers: defaultFlyers,
};

/* ---------- STORAGE ---------- */

const STORAGE_KEY = "gbi-ssi-content-v1";

function mergeContent(raw: unknown): SiteContent {
  const parsed = (raw ?? {}) as Partial<SiteContent>;
  return {
    sermons: Array.isArray(parsed.sermons) ? parsed.sermons : defaultContent.sermons,
    activities: Array.isArray(parsed.activities)
      ? parsed.activities
      : defaultContent.activities,
    weeklyPreacherIds: Array.isArray(parsed.weeklyPreacherIds)
      ? parsed.weeklyPreacherIds
      : defaultContent.weeklyPreacherIds,
    schedules: Array.isArray(parsed.schedules)
      ? parsed.schedules
      : defaultContent.schedules,
    flyers: Array.isArray(parsed.flyers) ? parsed.flyers : defaultContent.flyers,
  };
}

export function loadContent(): SiteContent {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultContent;
    return mergeContent(JSON.parse(raw));
  } catch {
    return defaultContent;
  }
}

export function saveContent(content: SiteContent) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
  } catch (e) {
    if (e instanceof DOMException && (e.name === "QuotaExceededError" || e.code === 22)) {
      throw new Error(
        "Penyimpanan browser penuh. Kurangi jumlah flyer hasil upload (data gambar besar) atau hapus beberapa flyer."
      );
    }
    throw e;
  }
  window.dispatchEvent(new Event("gbi-content-changed"));
}

export function resetContent() {
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event("gbi-content-changed"));
}

/** Hook reaktif: membaca konten dari localStorage + auto-update saat admin menyimpan. */
export function useContent(): [SiteContent, () => void] {
  const [content, setContent] = useState<SiteContent>(() => loadContent());

  useEffect(() => {
    const refresh = () => setContent(loadContent());
    window.addEventListener("gbi-content-changed", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("gbi-content-changed", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  return [content, () => setContent(loadContent())];
}

/* ---------- UTIL: ekstrak ID YouTube dari berbagai format link ---------- */
export function extractYoutubeId(input: string): string | null {
  const s = input.trim();
  if (!s) return null;

  // sudah berupa ID polos (11 karakter, khas YouTube)
  if (/^[a-zA-Z0-9_-]{11}$/.test(s)) return s;

  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtube\.com\/embed\/|youtube\.com\/shorts\/|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
  ];
  for (const p of patterns) {
    const m = s.match(p);
    if (m) return m[1];
  }
  return null;
}
