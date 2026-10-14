import { useEffect, useState } from "react";
import type { MouseEvent } from "react";
import "./App.css";
import { events } from "./data/events";
import { CATEGORIES } from "./types/campus-event";
import type { CampusEvent, Category } from "./types/campus-event";
import {
  filterByCategory,
  findEventById,
  searchEvents,
} from "./utils/filter-events";

type PageName = "home" | "events" | "detail" | "add" | "update";

const menu: { page: PageName; label: string }[] = [
  { page: "home", label: "Ana Sayfa" },
  { page: "events", label: "Etkinlikler" },
  { page: "add", label: "Ekle" },
];

function formatDate(date: string): string {
  return new Date(`${date}T00:00:00`).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  function go(next: PageName, id: string | null = null) {
    setPage(next);
    setSelectedId(id);
  }

  function goLink(
    e: MouseEvent<HTMLAnchorElement>,
    next: PageName,
    id: string | null = null,
  ) {
    e.preventDefault();
    go(next, id);
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

  function renderCard(event: CampusEvent) {
    return (
      <article className="kart" key={event.id}>
        <h3>{event.title}</h3>
        <span className="rozet">{event.category}</span>
        <p>
          Tarih: {formatDate(event.date)}, {event.time}
        </p>
        <p>Yer: {event.location}</p>
        <p>Kontenjan: {event.capacity} kişi</p>
        <p>{event.description}</p>
        <a href="#" onClick={(e) => goLink(e, "detail", event.id)}>
          Detayları gör →
        </a>
      </article>
    );
  }

  return (
    <>
      <header>
        <h1>{heading}</h1>
        <nav>
          {menu.map((item) => (
            <a
              key={item.page}
              href="#"
              aria-current={page === item.page ? "page" : undefined}
              onClick={(e) => goLink(e, item.page)}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <main>
        {page === "home" && (
          <>
            <p className="yardim">
              Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.
            </p>
            <h2>Yaklaşan 2 Etkinlik</h2>
            <section className="etkinlik-listesi">
              {upcoming.map(renderCard)}
            </section>
            <div className="eylemler">
              <a href="#" onClick={(e) => goLink(e, "events")}>
                Tüm etkinlikleri gör →
              </a>
            </div>
          </>
        )}

        {page === "events" && (
          <>
            <form className="filtre" onSubmit={(e) => e.preventDefault()}>
              <div className="alan">
                <label htmlFor="arama">Etkinlik ara</label>
                <input
                  type="search"
                  id="arama"
                  placeholder="atölye, kariyer..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
              <div className="alan">
                <label htmlFor="kategori-filtre">Kategori</label>
                <select
                  id="kategori-filtre"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Category | "")}
                >
                  <option value="">Tümü</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </form>
            <p id="sonuc" aria-live="polite">
              {filtered.length === 0
                ? "Aramanıza uygun etkinlik bulunamadı."
                : `${filtered.length} etkinlik listeleniyor.`}
            </p>
            <section className="etkinlik-listesi">
              {filtered.map(renderCard)}
            </section>
          </>
        )}

        {page === "detail" && !selected && (
          <div className="hata-kutusu">
            <p>İstenen etkinlik bulunamadı. Listeden bir etkinlik seçin.</p>
            <a href="#" onClick={(e) => goLink(e, "events")}>
              ← Listeye dön
            </a>
          </div>
        )}

        {page === "detail" && selected && (
          <article
            className={
              selected.image ? "detay-karti" : "detay-karti afissiz"
            }
          >
            {selected.image && (
              <figure>
                <img src={selected.image} alt={`${selected.title} etkinlik afişi`} />
                <figcaption>Şekil: {selected.title} afişi</figcaption>
              </figure>
            )}
            <div className="kunye">
              <h2>Etkinlik Künyesi</h2>
              <dl>
                <dt>Tarih</dt>
                <dd>
                  <time dateTime={`${selected.date}T${selected.time}`}>
                    {formatDate(selected.date)}, {selected.time}
                  </time>
                </dd>
                <dt>Yer</dt>
                <dd>{selected.location}</dd>
                <dt>Kategori</dt>
                <dd>{selected.category}</dd>
                <dt>Kontenjan</dt>
                <dd>{selected.capacity} kişi</dd>
              </dl>
            </div>
            <div className="aciklama">
              <h2>Açıklama</h2>
              <p>{selected.description}</p>
            </div>
            <div className="eylemler">
              <a href="#" onClick={(e) => goLink(e, "events")}>
                ← Listeye dön
              </a>
              <a href="#" onClick={(e) => goLink(e, "update", selected.id)}>
                Bu etkinliği güncelle
              </a>
            </div>
          </article>
        )}

        {(page === "add" || page === "update") && (
          <>
            <p className="yardim">
              Yıldızlı (*) alanlar zorunludur. Bu sprintte form veri
              kaydetmez; sadece görünümdür.
            </p>
            <form className="form" onSubmit={(e) => e.preventDefault()}>
              <div className="alan">
                <label htmlFor="title">
                  Etkinlik adı <span className="zorunlu">*</span>
                </label>
                <input
                  id="title"
                  type="text"
                  maxLength={80}
                  placeholder="Örn. Kariyer Günleri"
                />
              </div>
              <div className="alan">
                <label htmlFor="category">
                  Kategori <span className="zorunlu">*</span>
                </label>
                <select id="category" defaultValue="">
                  <option value="">Seçiniz</option>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div className="alan">
                <label htmlFor="date">
                  Tarih <span className="zorunlu">*</span>
                </label>
                <input id="date" type="date" />
              </div>
              <div className="alan">
                <label htmlFor="time">
                  Saat <span className="zorunlu">*</span>
                </label>
                <input id="time" type="time" />
              </div>
              <div className="alan">
                <label htmlFor="location">
                  Yer <span className="zorunlu">*</span>
                </label>
                <input
                  id="location"
                  type="text"
                  placeholder="Örn. A Blok Konferans Salonu"
                />
              </div>
              <div className="alan">
                <label htmlFor="capacity">Kontenjan (isteğe bağlı)</label>
                <input id="capacity" type="number" min={1} max={1000} />
              </div>
              <div className="alan">
                <label htmlFor="description">Açıklama</label>
                <textarea id="description" rows={5} />
              </div>
              <button type="submit">
                {page === "add" ? "Kaydet" : "Güncelle"}
              </button>
            </form>
          </>
        )}
      </main>

      <footer>
        <p>Tolga Topaloğlu · 2416501049 · 2026</p>
      </footer>
    </>
  );
}

export default App;
