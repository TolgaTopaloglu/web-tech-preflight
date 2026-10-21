import { useEffect, useState } from "react";
import "./App.css";
import { events } from "./data/events";
import type { Category } from "./types/campus-event";
import type { PageName } from "./types/page";
import {
  filterByCategory,
  findEventById,
  searchEvents,
} from "./utils/filter-events";
import Header from "./components/layout/Header";
import Navigation from "./components/layout/Navigation";
import Footer from "./components/layout/Footer";
import EventList from "./components/events/EventList";
import EventFilter from "./components/events/EventFilter";
import EventDetail from "./components/events/EventDetail";
import EventForm from "./components/forms/EventForm";

function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  function go(next: PageName, id: string | null = null) {
    setPage(next);
    setSelectedId(id);
  }

  const upcoming = [...events]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 2);

  const categories = [...new Set(events.map((e) => e.category))];
  const filtered = filterByCategory(searchEvents(events, searchText), category);

  const selected =
    selectedId !== null ? findEventById(events, selectedId) : undefined;

  let heading = "Kampüs Etkinlikleri";
  if (page === "events") heading = "Tüm Etkinlikler";
  if (page === "add") heading = "Etkinlik Ekle";
  if (page === "update") heading = "Etkinlik Güncelle";
  if (page === "detail") {
    heading = selected ? selected.title : "Etkinlik bulunamadı";
  }

  const title = page === "home" ? "Ana Sayfa" : heading;

  useEffect(() => {
    document.title = `Kampüs Etkinlikleri — ${title}`;
  }, [title]);

  return (
    <>
      <div className="site-ust">
        <Header
          title={heading}
          text={
            page === "home"
              ? "Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin."
              : undefined
          }
        />
        <Navigation current={page} onNavigate={go} />
      </div>

      <main>
        {page === "home" && (
          <>
            <h2>Yaklaşan 2 Etkinlik</h2>
            <EventList
              events={upcoming}
              onShowDetail={(id) => go("detail", id)}
            />
            <div className="eylemler">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  go("events");
                }}
              >
                Tüm etkinlikleri gör →
              </a>
            </div>
          </>
        )}

        {page === "events" && (
          <>
            <EventFilter
              searchText={searchText}
              category={category}
              categories={categories}
              onSearchChange={setSearchText}
              onCategoryChange={setCategory}
            />
            {filtered.length > 0 && (
              <p id="sonuc" aria-live="polite">
                {filtered.length} etkinlik listeleniyor.
              </p>
            )}
            <EventList
              events={filtered}
              onShowDetail={(id) => go("detail", id)}
              emptyText="Aramanıza uygun etkinlik bulunamadı."
            />
          </>
        )}

        {page === "detail" &&
          (selected ? (
            <EventDetail
              event={selected}
              onBack={() => go("events")}
              onEdit={(id) => go("update", id)}
            />
          ) : (
            <div className="hata-kutusu">
              <p>İstenen etkinlik bulunamadı. Listeden bir etkinlik seçin.</p>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  go("events");
                }}
              >
                ← Listeye dön
              </a>
            </div>
          ))}

        {(page === "add" || page === "update") && (
          <EventForm onSubmit={() => window.scrollTo(0, 0)} />
        )}
      </main>

      <Footer />
    </>
  );
}

export default App;
