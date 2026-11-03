Canlı: https://tolgatopaloglu-frontend.vercel.app

# Kampüs Etkinlikleri - Sprint 6 ve vize

Sprint 5'teki bileşenler React Router ile gerçek adreslere bağlandı. Etkinlik listesi ve ekle, güncelle, sil işlemleri `EventsContext`'te tutulur; her sayfa listeyi `useEvents()` ile okur. Formlar controlled input kullanır, kurallar `validateEvent` içindedir. Veri bellektedir: sayfa yenilenince başlangıç listesine döner.

## Kurulum

```bash
npm install
npm run dev
```

- `npm run dev` - geliştirme sunucusu (http://localhost:5173)
- `npm run build` - üretim derlemesi (`tsc -b && vite build`)
- `npm run lint` - oxlint
- `npm run preview` - derlenmiş hâli açar

## Route listesi

| Adres | Sayfa |
|---|---|
| `/` | `HomePage` |
| `/events` | `EventsPage` |
| `/events/:id` | `EventDetailPage` |
| `/login` | `LoginPage` |
| `/register` | `RegisterPage` |
| `/forgot-password` | `ForgotPasswordPage` |
| `/admin` | `AdminPage` |
| `/admin/new` | `AddEventPage` |
| `/admin/:id/edit` | `EditEventPage` |
| `*` | `NotFoundPage` |

Giriş kontrolü yoktur: `/admin` doğrudan açılır. Giriş, kayıt ve şifremi unuttum sayfaları yalnızca formdur, bilgiyi hiçbir yere göndermez.

## Dosyalar

- `package.json` - proje adı, komutlar, paket listesi (`react-router-dom` dahil).
- `package-lock.json` - yüklenen paketlerin tam sürümlerini kilitler.
- `tsconfig*.json` - TypeScript ayarları (`strict` açık).
- `vite.config.ts` - Vite ayarları ve React eklentisi; CSS küçültme kapalı (`--no` değeri yuvarlanmasın diye).
- `vercel.json` - tüm adresleri `index.html`'e yönlendirir; `/events` gibi adresler yenilenince de açılır.
- `index.html` - tek HTML dosyası, içinde boş `div#root` var.
- `src/main.tsx` - `BrowserRouter` ve `EventsProvider` ile `App`'i çizer.
- `src/App.tsx` - Header, Navigation, `Routes` ve Footer; state yok. Üst başlığı ve sekme başlığını adrese göre belirler.
- `src/App.css` - numaraya göre renk ve fontlu stiller.
- `src/context/EventsContext.tsx` - etkinlik listesi, `addEvent`, `updateEvent`, `deleteEvent` ve `useEvents`.
- `src/pages/` - 10 sayfa bileşeni (adrese bağlı olanlar).
- `src/components/layout/` - `Header`, `Navigation` (`NavLink`), `Footer`.
- `src/components/events/` - `EventCard`, `EventList`, `EventFilter`, `EventDetail`.
- `src/components/forms/EventForm.tsx` - ekleme ve güncelleme sayfalarının ortak formu; `initialData`, `submitText`, `onSubmit` alır.
- `src/types/campus-event.ts` - `CampusEvent`, `Category`, `EventFormData`, `EventFormErrors` tipleri.
- `src/data/events.ts` - tipli 6 etkinlik verisi.
- `src/utils/filter-events.ts` - arama, kategori filtresi ve id ile bulma saf fonksiyonları.
- `src/utils/format-date.ts` - ISO tarihi "12 Ekim 2026" biçimine çevirir.
- `src/utils/validate-event.ts` - etkinlik formu kuralları; hata nesnesi döndürür.
- `public/` - olduğu gibi kopyalanan dosyalar (etkinlik afişleri).
