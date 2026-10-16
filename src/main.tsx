import { Component, StrictMode, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import InvitationStandalone from "./InvitationStandalone";
import AdminPage from "./pages/admin/AdminPage";
import "./index.css";

/* Error boundary: kalau ada halaman yang error, tampilkan pesan jelas
   (bukan blank putih) beserta pesan errornya. */
class ErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null as Error | null };
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  componentDidCatch(error: Error) {
    console.error("[ErrorBoundary]", error);
  }
  render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900 p-6">
          <div className="max-w-md w-full bg-white rounded-2xl p-6 shadow-xl text-slate-800">
            <h1 className="text-lg font-extrabold mb-2">Terjadi kesalahan pada halaman ini</h1>
            <p className="text-sm text-slate-600 mb-3 break-words font-mono">
              {String(this.state.error?.message || this.state.error)}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="rounded-xl bg-amber-500 px-4 py-2 text-white font-bold hover:bg-amber-600"
            >
              Muat Ulang
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/invitation" element={<InvitationStandalone />} />
          <Route path="/admin" element={<AdminPage />} />
          {/* fallback: rute hash tak dikenal -> tampilkan website utama */}
          <Route path="*" element={<App />} />
        </Routes>
      </ErrorBoundary>
    </HashRouter>
  </StrictMode>
);
