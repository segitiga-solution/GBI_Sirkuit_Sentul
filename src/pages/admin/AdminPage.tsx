import { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Lock,
  LogOut,
  Save,
  Trash2,
  Plus,
  Star,
  Eye,
  Image as ImageIcon,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Video,
  CalendarDays,
  ArrowLeft,
  UploadCloud,
  Loader2,
  Pin,
} from "lucide-react";
import {
  useContent,
  loadContent,
  saveContent,
  resetContent,
  extractYoutubeId,
  type SiteContent,
  type VideoItem,
} from "../../data/content";

/* ===============================
   ADMIN GBI SIRKUIT SENTUL
   - Login sederhana (passcode disimpan di sessionStorage)
   - Tab Khotbah: tambah/hapus/edit, tandai "Khotbah Minggu Ini"
   - Tab Kegiatan: tambah link video kegiatan
   - Tab Flyer: atur gambar flyer pengkhotbah minggu ini
================================ */

const ADMIN_KEY = "gbi-ssi-admin";
// Ubah passcode admin di sini bila perlu.
const ADMIN_PASSCODE = "GBI2026";

type Tab = "sermons" | "activities" | "flyers";

/* ---------- LOGIN ---------- */
function LoginCard({ onSuccess }: { onSuccess: () => void }) {
  const [pass, setPass] = useState("");
  const [error, setError] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pass === ADMIN_PASSCODE) {
      sessionStorage.setItem(ADMIN_KEY, "1");
      onSuccess();
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-amber-950 px-4">
      <form
        onSubmit={submit}
        className="w-full max-w-sm bg-white rounded-3xl shadow-premium p-8 text-left"
      >
        <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-200 mb-6">
          <Lock className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 text-center">
          Admin GBI Sirkuit Sentul
        </h1>
        <p className="text-slate-500 text-sm text-center mt-2 mb-6">
          Masuk untuk memperbarui khotbah minggu ini, video kegiatan, dan flyer.
        </p>
        <label className="block text-sm font-semibold text-slate-700 mb-1.5">
          Passcode
        </label>
        <input
          type="password"
          value={pass}
          onChange={(e) => {
            setPass(e.target.value);
            setError(false);
          }}
          placeholder="Masukkan passcode admin"
          autoFocus
          className={`w-full rounded-xl border px-4 py-3 text-slate-900 outline-none transition focus:ring-2 ${
            error
              ? "border-red-400 focus:ring-red-200"
              : "border-slate-200 focus:ring-amber-300 focus:border-amber-400"
          }`}
        />
        {error && (
          <p className="text-red-500 text-sm mt-2 flex items-center gap-1.5">
            <AlertTriangle className="h-4 w-4" /> Passcode salah. Coba lagi.
          </p>
        )}
        <button
          type="submit"
          className="mt-6 w-full rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold py-3 hover:shadow-lg hover:shadow-amber-200 transition-all"
        >
          Masuk
        </button>
        <p className="text-xs text-slate-400 mt-4 text-center">
          Default passcode: <span className="font-mono">{ADMIN_PASSCODE}</span>{" "}
          (ubah di <span className="font-mono">AdminPage.tsx</span>)
        </p>
        <Link
          to="/"
          className="mt-4 flex items-center justify-center gap-1.5 text-sm text-slate-500 hover:text-amber-600 transition"
        >
          <ArrowLeft className="h-4 w-4" /> Kembali ke website
        </Link>
      </form>
    </div>
  );
}

/* ---------- VIDEO ROW EDITOR ---------- */
function VideoRow({
  item,
  isWeekly,
  onToggleWeekly,
  onChange,
  onDelete,
}: {
  item: VideoItem;
  isWeekly?: boolean;
  onToggleWeekly?: () => void;
  onChange: (patch: Partial<VideoItem>) => void;
  onDelete: () => void;
}) {
  const [linkInput, setLinkInput] = useState<string | null>(null);
  const [invalid, setInvalid] = useState(false);

  const applyLink = (value: string) => {
    const id = extractYoutubeId(value);
    if (id) {
      onChange({ youtubeId: id });
      setLinkInput(null);
      setInvalid(false);
    } else {
      setInvalid(true);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-col sm:flex-row gap-4">
      {/* thumbnail */}
      <div className="relative w-full sm:w-40 shrink-0 rounded-xl overflow-hidden bg-slate-100" style={{ aspectRatio: "16/9" }}>
        <img
          src={`https://i.ytimg.com/vi/${item.youtubeId}/mqdefault.jpg`}
          alt={item.title}
          className="w-full h-full object-cover"
          onError={(e) => ((e.target as HTMLImageElement).style.opacity = "0.3")}
        />
        <a
          href={`https://www.youtube.com/watch?v=${item.youtubeId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/30 transition"
          title="Buka di YouTube"
        >
          <Eye className="h-8 w-8 text-white opacity-0 hover:opacity-100 transition" />
        </a>
      </div>

      {/* fields */}
      <div className="flex-1 space-y-2">
        <input
          value={item.title}
          onChange={(e) => onChange({ title: e.target.value })}
          placeholder="Judul khotbah / kegiatan"
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-amber-300 focus:border-amber-400 outline-none"
        />
        <div className="flex flex-wrap gap-2">
          <input
            value={item.date}
            onChange={(e) => onChange({ date: e.target.value })}
            placeholder="Tanggal (mis. 18 Oktober 2026)"
            className="flex-1 min-w-[160px] rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:ring-2 focus:ring-amber-300 outline-none"
          />
          <input
            value={item.category}
            onChange={(e) => onChange({ category: e.target.value })}
            placeholder="Kategori"
            className="w-32 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:ring-2 focus:ring-amber-300 outline-none"
          />
        </div>

        {/* link youtube */}
        {linkInput === null ? (
          <button
            onClick={() => setLinkInput(item.youtubeId)}
            className="text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-1.5 hover:bg-amber-100 transition inline-flex items-center gap-1.5"
          >
            <Video className="h-3.5 w-3.5" />
            ID: {item.youtubeId} — ganti link YouTube
          </button>
        ) : (
          <div className="space-y-1.5">
            <div className="flex gap-2">
              <input
                value={linkInput}
                onChange={(e) => {
                  setLinkInput(e.target.value);
                  setInvalid(false);
                }}
                onKeyDown={(e) => e.key === "Enter" && applyLink(linkInput)}
                placeholder="Tempel link YouTube (watch / youtu.be / shorts) atau ID"
                autoFocus
                className={`flex-1 rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 ${
                  invalid
                    ? "border-red-400 focus:ring-red-200"
                    : "border-slate-200 focus:ring-amber-300"
                }`}
              />
              <button
                onClick={() => applyLink(linkInput)}
                className="rounded-lg bg-slate-900 text-white text-sm font-semibold px-3 py-2 hover:bg-slate-700 transition"
              >
                OK
              </button>
              <button
                onClick={() => setLinkInput(null)}
                className="rounded-lg border border-slate-200 text-slate-500 text-sm px-3 py-2 hover:bg-slate-50 transition"
              >
                Batal
              </button>
            </div>
            {invalid && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <AlertTriangle className="h-3.5 w-3.5" /> Link YouTube tidak valid.
              </p>
            )}
          </div>
        )}
      </div>

      {/* actions */}
      <div className="flex sm:flex-col items-center justify-between sm:justify-start gap-2 shrink-0">
        {onToggleWeekly !== undefined && (
          <button
            onClick={onToggleWeekly}
            title={isWeekly ? "Tandai sebagai khotbah minggu ini (aktif)" : "Jadikan khotbah minggu ini"}
            className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold border transition ${
              isWeekly
                ? "bg-amber-500 text-white border-amber-500 shadow-md shadow-amber-200"
                : "bg-white text-slate-500 border-slate-200 hover:border-amber-400 hover:text-amber-600"
            }`}
          >
            <Star className={`h-3.5 w-3.5 ${isWeekly ? "fill-current" : ""}`} />
            Minggu Ini
          </button>
        )}
        <button
          onClick={onDelete}
          title="Hapus"
          className="rounded-lg px-3 py-2 text-xs font-semibold text-red-500 border border-red-200 bg-white hover:bg-red-50 transition inline-flex items-center gap-1.5"
        >
          <Trash2 className="h-3.5 w-3.5" /> Hapus
        </button>
      </div>
    </div>
  );
}

/* ---------- ADD FORM ---------- */
function AddVideoForm({
  label,
  defaultCategory,
  onAdd,
}: {
  label: string;
  defaultCategory: string;
  onAdd: (item: VideoItem) => void;
}) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState(defaultCategory);
  const [link, setLink] = useState("");
  const [error, setError] = useState("");

  const today = new Date().toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = extractYoutubeId(link);
    if (!title.trim()) return setError("Judul wajib diisi.");
    if (!id) return setError("Link / ID YouTube tidak valid.");
    onAdd({
      title: title.trim(),
      date: date.trim() || today,
      category: category.trim() || defaultCategory,
      youtubeId: id,
    });
    setTitle("");
    setDate("");
    setLink("");
    setError("");
  };

  return (
    <form
      onSubmit={submit}
      className="bg-slate-50 border border-dashed border-slate-300 rounded-2xl p-5 space-y-3"
    >
      <p className="font-bold text-slate-800 flex items-center gap-2">
        <Plus className="h-4 w-4 text-amber-600" /> {label}
      </p>
      <div className="grid sm:grid-cols-2 gap-3">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Judul *"
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm bg-white outline-none focus:ring-2 focus:ring-amber-300"
        />
        <input
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder={`Tanggal (default: ${today})`}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm bg-white outline-none focus:ring-2 focus:ring-amber-300"
        />
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Kategori"
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm bg-white outline-none focus:ring-2 focus:ring-amber-300"
        />
        <input
          value={link}
          onChange={(e) => {
            setLink(e.target.value);
            setError("");
          }}
          placeholder="Link YouTube * (https://youtube.com/watch?v=...)"
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm bg-white outline-none focus:ring-2 focus:ring-amber-300"
        />
      </div>
      {error && (
        <p className="text-sm text-red-500 flex items-center gap-1.5">
          <AlertTriangle className="h-4 w-4" /> {error}
        </p>
      )}
      <button
        type="submit"
        className="rounded-xl bg-slate-900 text-white text-sm font-bold px-5 py-2.5 hover:bg-slate-700 transition inline-flex items-center gap-2"
      >
        <Plus className="h-4 w-4" /> Tambahkan
      </button>
    </form>
  );
}

/* ---------- MAIN PAGE ---------- */
export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(
    () => sessionStorage.getItem(ADMIN_KEY) === "1"
  );
  const [content, refresh] = useContent();
  const [draft, setDraft] = useState<SiteContent>(content);
  const [tab, setTab] = useState<Tab>("sermons");
  const [saved, setSaved] = useState(false);
  const [newFlyer, setNewFlyer] = useState("");
  const [flyerError, setFlyerError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [saveError, setSaveError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const dirty = useMemo(
    () => JSON.stringify(draft) !== JSON.stringify(content),
    [draft, content]
  );

  if (!loggedIn) return <LoginCard onSuccess={() => setLoggedIn(true)} />;

  const save = () => {
    try {
      saveContent(draft);
      refresh();
      setSaved(true);
      setSaveError("");
      setTimeout(() => setSaved(false), 2500);
    } catch (e) {
      setSaveError(e instanceof Error ? e.message : "Gagal menyimpan perubahan.");
    }
  };

  const logout = () => {
    sessionStorage.removeItem(ADMIN_KEY);
    setLoggedIn(false);
  };

  const restoreDefaults = () => {
    if (!window.confirm("Kembalikan semua konten ke data bawaan website?"))
      return;
    resetContent();
    refresh();
    setDraft(loadContent());
  };

  /* ----- helpers edit list ----- */
  const patchItem = (key: "sermons" | "activities", i: number, patch: Partial<VideoItem>) =>
    setDraft((d) => ({
      ...d,
      [key]: d[key].map((v, idx) => (idx === i ? { ...v, ...patch } : v)),
    }));

  const removeItem = (key: "sermons" | "activities", i: number) =>
    setDraft((d) => {
      const removed = d[key][i];
      return {
        ...d,
        [key]: d[key].filter((_, idx) => idx !== i),
        weeklyPreacherIds: d.weeklyPreacherIds.filter(
          (id) => id !== removed.youtubeId
        ),
      };
    });

  const addItem = (key: "sermons" | "activities", item: VideoItem) =>
    setDraft((d) => ({ ...d, [key]: [item, ...d[key]] }));

  const toggleWeekly = (youtubeId: string) =>
    setDraft((d) => ({
      ...d,
      weeklyPreacherIds: d.weeklyPreacherIds.includes(youtubeId)
        ? d.weeklyPreacherIds.filter((id) => id !== youtubeId)
        : [youtubeId, ...d.weeklyPreacherIds],
    }));

  const addFlyer = (e: React.FormEvent) => {
    e.preventDefault();
    const v = newFlyer.trim();
    if (!v) return;
    if (!/^https?:\/\//.test(v) && !v.startsWith("/")) {
      setFlyerError("Gunakan URL lengkap (https://...) atau path lokal (/nama-file.jpg).");
      return;
    }
    setDraft((d) => ({ ...d, flyers: [...d.flyers, v] }));
    setNewFlyer("");
    setFlyerError("");
  };

  /** Pindahkan flyer ke urutan pertama = tampil sebagai "Utama" di beranda. */
  const makeMainFlyer = (i: number) => {
    setDraft((d) => {
      const next = [...d.flyers];
      const [picked] = next.splice(i, 1);
      return { ...d, flyers: [picked, ...next] };
    });
  };

  /* ----- upload flyer dari laptop (file lokal -> data URL, tersimpan di localStorage) ----- */
  const MAX_UPLOAD_MB = 4; // naikkan bila perlu, tapi ingat kuota localStorage browser (~5MB)
  const MAX_TOTAL_DATA_URLS = 3; // hemat kuota localStorage untuk hasil upload

  const readImageAsDataUrl = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(new Error("Gagal membaca file"));
      reader.readAsDataURL(file);
    });

  /** Kompres gambar agar hemat penyimpanan browser. */
  const compressImage = (dataUrl: string, maxW = 1080, quality = 0.82) =>
    new Promise<string>((resolve) => {
      const img = new Image();
      img.onload = () => {
        const scale = Math.min(1, maxW / img.width);
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext("2d");
        if (!ctx) return resolve(dataUrl);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.onerror = () => resolve(dataUrl);
      img.src = dataUrl;
    });

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const images = Array.from(files).filter((f) => /^image\/(jpeg|png|webp|gif)$/i.test(f.type));
    if (images.length === 0) {
      setFlyerError("Format tidak didukung. Gunakan JPG, PNG, WEBP, atau GIF.");
      return;
    }
    const tooBig = images.find((f) => f.size > MAX_UPLOAD_MB * 1024 * 1024);
    if (tooBig) {
      setFlyerError(`File "${tooBig.name}" melebihi ${MAX_UPLOAD_MB}MB. Pilih file lebih kecil.`);
      return;
    }
    setUploading(true);
    setFlyerError("");
    try {
      const urls = await Promise.all(
        images.map(async (f) => compressImage(await readImageAsDataUrl(f)))
      );
      setDraft((d) => {
        const others = d.flyers.filter((s) => !s.startsWith("data:image"));
        const uploaded = d.flyers.filter((s) => s.startsWith("data:image"));
        const keep = [...uploaded, ...urls].slice(-MAX_TOTAL_DATA_URLS);
        return { ...d, flyers: [...others, ...keep] };
      });
    } catch {
      setFlyerError("Terjadi kesalahan saat memproses gambar. Coba lagi.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const tabs: { id: Tab; label: string; icon: typeof Video; count: number }[] = [
    { id: "sermons", label: "Khotbah", icon: Video, count: draft.sermons.length },
    { id: "activities", label: "Kegiatan", icon: CalendarDays, count: draft.activities.length },
    { id: "flyers", label: "Flyer Minggu Ini", icon: ImageIcon, count: draft.flyers.length },
  ];

  return (
    <div className="min-h-screen bg-slate-100 pb-32">
      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shrink-0">
              <Lock className="h-5 w-5 text-white" />
            </div>
            <div className="min-w-0">
              <p className="font-extrabold text-slate-900 leading-tight truncate">
                Admin · GBI Sirkuit Sentul
              </p>
              <p className="text-xs text-slate-500">Kelola konten website</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-amber-600 border border-slate-200 rounded-xl px-3 py-2 bg-white transition"
            >
              <Eye className="h-4 w-4" /> Lihat Website
            </Link>
            <button
              onClick={logout}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-red-500 border border-slate-200 rounded-xl px-3 py-2 bg-white transition"
            >
              <LogOut className="h-4 w-4" /> Keluar
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 pt-8">
        {/* TABS */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition border ${
                tab === t.id
                  ? "bg-slate-900 text-white border-slate-900 shadow-md"
                  : "bg-white text-slate-600 border-slate-200 hover:border-amber-400"
              }`}
            >
              <t.icon className="h-4 w-4" />
              {t.label}
              <span
                className={`text-xs rounded-full px-2 py-0.5 ${
                  tab === t.id ? "bg-white/20" : "bg-slate-100"
                }`}
              >
                {t.count}
              </span>
            </button>
          ))}
        </div>

        {/* ===== TAB KHOTBAH ===== */}
        {tab === "sermons" && (
          <div className="space-y-5">
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-sm text-amber-800 flex gap-2.5">
              <Star className="h-5 w-5 shrink-0 fill-current" />
              <p>
                Klik tombol <b>“Minggu Ini”</b> pada khotbah untuk menampilkannya
                di bagian <b>Pengkhotbah & Khotbah Minggu Ini</b> pada website.
                Anda bisa memilih lebih dari satu.
              </p>
            </div>

            {draft.weeklyPreacherIds.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {draft.weeklyPreacherIds.map((id) => {
                  const v = draft.sermons.find((s) => s.youtubeId === id);
                  return (
                    <span
                      key={id}
                      className="inline-flex items-center gap-1.5 bg-amber-500 text-white text-xs font-bold rounded-full px-3 py-1.5"
                    >
                      <Star className="h-3 w-3 fill-current" />
                      {v ? v.title : id}
                      <button
                        onClick={() => toggleWeekly(id)}
                        className="hover:underline ml-1"
                        title="Batalkan"
                      >
                        ✕
                      </button>
                    </span>
                  );
                })}
              </div>
            )}

            <AddVideoForm
              label="Tambah Khotbah Baru"
              defaultCategory="Khotbah"
              onAdd={(item) => addItem("sermons", item)}
            />

            {draft.sermons.map((v, i) => (
              <VideoRow
                key={`${v.youtubeId}-${i}`}
                item={v}
                isWeekly={draft.weeklyPreacherIds.includes(v.youtubeId)}
                onToggleWeekly={() => toggleWeekly(v.youtubeId)}
                onChange={(patch) => patchItem("sermons", i, patch)}
                onDelete={() => removeItem("sermons", i)}
              />
            ))}
          </div>
        )}

        {/* ===== TAB KEGIATAN ===== */}
        {tab === "activities" && (
          <div className="space-y-5">
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 text-sm text-blue-800 flex gap-2.5">
              <CalendarDays className="h-5 w-5 shrink-0" />
              <p>
                Tambahkan rekaman <b>kegiatan jemaat</b> (ibadah special, retreat,
                NBOS, dll). Tempel link YouTube — ID diambil otomatis.
              </p>
            </div>

            <AddVideoForm
              label="Tambah Video Kegiatan"
              defaultCategory="Kegiatan"
              onAdd={(item) => addItem("activities", item)}
            />

            {draft.activities.length === 0 && (
              <p className="text-sm text-slate-500 italic">
                Belum ada video kegiatan.
              </p>
            )}
            {draft.activities.map((v, i) => (
              <VideoRow
                key={`${v.youtubeId}-${i}`}
                item={v}
                onChange={(patch) => patchItem("activities", i, patch)}
                onDelete={() => removeItem("activities", i)}
              />
            ))}
          </div>
        )}

        {/* ===== TAB FLYER ===== */}
        {tab === "flyers" && (
          <div className="space-y-5">
            <div className="bg-purple-50 border border-purple-200 rounded-2xl p-4 text-sm text-purple-800 flex gap-2.5">
              <ImageIcon className="h-5 w-5 shrink-0" />
              <p>
                Atur gambar <b>flyer pengkhotbah minggu ini</b>. Anda bisa{' '}
                <b>upload langsung dari laptop/HP</b> (drag &amp; drop atau pilih file),
                meng-upload file ke folder <span className="font-mono">public/</span> lalu
                menambahkan path-nya (mis. <span className="font-mono">/flyer-minggu-ini.jpg</span>),
                atau menempel URL gambar eksternal.
              </p>
              <p className="mt-2 text-xs text-slate-500">
                💡 Hover pada kartu flyer untuk memunculkan tombol <b>&quot;Jadikan Utama&quot;</b> —
                flyer utama tampil pertama di beranda. Jangan lupa klik <b>Simpan</b>.
              </p>
            </div>

            {/* Upload dropzone dari file lokal */}
            <div
              role="button"
              tabIndex={0}
              onClick={() => !uploading && fileInputRef.current?.click()}
              onKeyDown={(e) => e.key === "Enter" && fileInputRef.current?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragOver(false);
                handleFiles(e.dataTransfer.files);
              }}
              className={`rounded-2xl border-2 border-dashed p-8 text-center cursor-pointer transition ${
                dragOver
                  ? "border-amber-500 bg-amber-50 scale-[1.01]"
                  : "border-slate-300 bg-white hover:border-amber-400 hover:bg-amber-50/40"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                multiple
                className="hidden"
                onChange={(e) => handleFiles(e.target.files)}
              />
              {uploading ? (
                <div className="flex flex-col items-center gap-2 text-slate-600">
                  <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
                  <p className="text-sm font-semibold">Memproses gambar…</p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <UploadCloud className="h-8 w-8 text-amber-500" />
                  <p className="text-sm font-bold text-slate-700">
                    Seret flyer ke sini, atau klik untuk pilih dari laptop
                  </p>
                  <p className="text-xs text-slate-400">
                    JPG / PNG / WEBP / GIF · maks {MAX_UPLOAD_MB}MB per file · otomatis dikompres
                  </p>
                </div>
              )}
            </div>

            <form onSubmit={addFlyer} className="bg-slate-50 border border-dashed border-slate-300 rounded-2xl p-5 space-y-3">
              <p className="font-bold text-slate-800 flex items-center gap-2">
                <Plus className="h-4 w-4 text-amber-600" /> Tambah Flyer via Path / URL
              </p>
              <input
                value={newFlyer}
                onChange={(e) => {
                  setNewFlyer(e.target.value);
                  setFlyerError("");
                }}
                placeholder="/flyer-pengkhotbah14.jpeg atau https://..."
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm bg-white outline-none focus:ring-2 focus:ring-amber-300"
              />
              {flyerError && (
                <p className="text-sm text-red-500 flex items-center gap-1.5">
                  <AlertTriangle className="h-4 w-4" /> {flyerError}
                </p>
              )}
              <button
                type="submit"
                className="rounded-xl bg-slate-900 text-white text-sm font-bold px-5 py-2.5 hover:bg-slate-700 transition inline-flex items-center gap-2"
              >
                <Plus className="h-4 w-4" /> Tambahkan
              </button>
            </form>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {draft.flyers.map((src, i) => (
                <div
                  key={`${src}-${i}`}
                  className="relative group bg-white rounded-2xl border border-slate-200 overflow-hidden"
                >
                  <img
                    src={src}
                    alt={`Flyer ${i + 1}`}
                    className="w-full h-48 object-contain bg-amber-50/50"
                    onError={(e) =>
                      ((e.target as HTMLImageElement).alt = "Gambar tidak ditemukan")
                    }
                  />
                  <div className="p-2 text-[10px] text-slate-400 truncate font-mono">
                    {src}
                  </div>
                  <button
                    onClick={() =>
                      setDraft((d) => ({
                        ...d,
                        flyers: d.flyers.filter((_, idx) => idx !== i),
                      }))
                    }
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition shadow-lg hover:bg-red-600"
                    title="Hapus flyer"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                  {i !== 0 && (
                    <button
                      onClick={() => makeMainFlyer(i)}
                      className="absolute top-2 left-2 bg-blue-600 text-white text-[10px] font-bold rounded-full px-3 py-1.5 opacity-0 group-hover:opacity-100 transition shadow-lg hover:bg-blue-700 inline-flex items-center gap-1"
                      title="Tampilkan sebagai flyer pertama / utama di beranda"
                    >
                      <Pin className="h-3 w-3" /> Jadikan Utama
                    </button>
                  )}
                  {i === 0 && (
                    <span className="absolute top-2 left-2 bg-amber-500 text-white text-[10px] font-bold rounded-full px-2 py-1 flex items-center gap-1">
                      <Pin className="h-3 w-3" /> Utama
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* RESET */}
        <div className="mt-10 pt-6 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={restoreDefaults}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-red-500 transition"
          >
            <RotateCcw className="h-4 w-4" /> Kembalikan ke data bawaan
          </button>
          <Link to="/" className="sm:hidden text-sm font-semibold text-amber-600">
            ← Lihat Website
          </Link>
        </div>
      </main>

      {/* SAVE BAR */}
      <div
        className={`fixed bottom-0 inset-x-0 z-50 transition-transform duration-300 ${
          dirty ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="max-w-5xl mx-auto px-4 pb-5">
          {saveError && (
            <div className="mb-2 bg-red-600 text-white rounded-2xl px-4 py-3 text-sm flex items-start gap-2 shadow-lg">
              <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0" /> {saveError}
            </div>
          )}
          <div className="bg-slate-900 rounded-2xl shadow-2xl px-5 py-4 flex items-center justify-between gap-4">
            <p className="text-sm text-slate-300">
              Ada perubahan yang belum disimpan.
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setDraft(content)}
                className="text-sm font-semibold text-slate-300 hover:text-white rounded-xl px-4 py-2.5 border border-slate-700 transition"
              >
                Batalkan
              </button>
              <button
                onClick={save}
                className="inline-flex items-center gap-2 text-sm font-bold text-white rounded-xl px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:shadow-lg hover:shadow-amber-500/30 transition"
              >
                <Save className="h-4 w-4" /> Simpan Perubahan
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* TOAST */}
      {saved && (
        <div className="fixed top-20 right-4 z-50 bg-green-600 text-white rounded-xl px-4 py-3 shadow-lg flex items-center gap-2 animate-[fadeInUp_.3s_ease]">
          <CheckCircle2 className="h-5 w-5" /> Perubahan tersimpan! Website sudah
          diperbarui.
        </div>
      )}
    </div>
  );
}
