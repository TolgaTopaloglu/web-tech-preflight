import { useEffect } from "react";
import { matchPath, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Header from "./components/layout/Header";
import Navigation from "./components/layout/Navigation";
import Footer from "./components/layout/Footer";
import { useEvents } from "./context/EventsContext";
import { findEventById } from "./utils/filter-events";
import HomePage from "./pages/HomePage";
import EventsPage from "./pages/EventsPage";
import EventDetailPage from "./pages/EventDetailPage";
import AdminPage from "./pages/AdminPage";
import AddEventPage from "./pages/AddEventPage";
import EditEventPage from "./pages/EditEventPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import NotFoundPage from "./pages/NotFoundPage";

const pageTitles: Record<string, string> = {
  "/": "Ana Sayfa",
  "/events": "Tüm Etkinlikler",
  "/admin": "Etkinlik Yönetimi",
  "/admin/new": "Etkinlik Ekle",
  "/login": "Giriş Yap",
  "/register": "Kayıt Ol",
  "/forgot-password": "Şifremi Unuttum",
};

function App() {
  const { pathname } = useLocation();
  const { events } = useEvents();

  const detailId = matchPath("/events/:id", pathname)?.params.id;
  const editId = matchPath("/admin/:id/edit", pathname)?.params.id;
  const detail = detailId ? findEventById(events, detailId) : undefined;
  const edit = editId ? findEventById(events, editId) : undefined;

  let title = pageTitles[pathname] ?? "Sayfa bulunamadı";
  if (detailId) title = detail ? detail.title : "Sayfa bulunamadı";
  if (editId) title = edit ? "Etkinlik Güncelle" : "Sayfa bulunamadı";

  useEffect(() => {
    document.title = `Kampüs Etkinlikleri — ${title}`;
  }, [title]);

  return (
    <>
      <div className="site-ust">
        <Header
          title={detail ? detail.title : "Kampüs Etkinlikleri"}
          text="Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin."
        />
        <Navigation />
      </div>

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/events/:id" element={<EventDetailPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/new" element={<AddEventPage />} />
          <Route path="/admin/:id/edit" element={<EditEventPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;
