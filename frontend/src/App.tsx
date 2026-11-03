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
  "/": "Kampüs Etkinlikleri",
  "/events": "Tüm Etkinlikler",
  "/admin": "Etkinlik Yönetimi",
  "/admin/new": "Etkinlik Ekle",
  "/login": "Giriş Yap",
  "/register": "Kayıt Ol",
  "/forgot-password": "Şifremi Unuttum",
};

const pageTexts: Record<string, string> = {
  "/": "Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.",
  "/events": "Ekim ayında kampüste düzenlenen etkinlikler.",
};

function App() {
  const location = useLocation();
  const { events } = useEvents();

  const path =
    location.pathname.length > 1
      ? location.pathname.replace(/\/+$/, "")
      : location.pathname;
  const eventId =
    matchPath("/events/:id", path)?.params.id ??
    matchPath("/admin/:id/edit", path)?.params.id;
  const event = eventId ? findEventById(events, eventId) : undefined;

  let title = pageTitles[path] ?? "Sayfa Bulunamadı";
  let text: string | undefined = pageTexts[path];
  if (eventId) {
    title = event ? event.title : "Sayfa Bulunamadı";
    text = event ? `${event.category} · ${event.location}` : undefined;
  }

  const tabTitle =
    path === "/" ? "Kampüs Etkinlikleri" : `${title} — Kampüs Etkinlikleri`;

  useEffect(() => {
    document.title = tabTitle;
  }, [tabTitle]);

  return (
    <>
      <div className="site-ust">
        <Header title={title} text={text} />
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
