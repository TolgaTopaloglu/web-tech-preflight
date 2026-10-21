Canlı: https://kampus-etkinlik.vercel.app

# Kampüs Etkinlikleri - Sprint 5

Sprint 4'teki tek parça `App.tsx` bileşenlere bölündü: her parça kendi dosyasında, veriyi `props` ile alır, olayları `callback` ile `App`'e bildirir. State `App`'te kalır (lifting state). Ekran Sprint 4 ile aynıdır.

## Komutlar

- `npm run dev` - geliştirme sunucusu (http://localhost:5173)
- `npm run build` - üretim derlemesi (`tsc -b && vite build`)
- `npm run preview` - derlenmiş hâli açar

## Dosyalar

- `package.json` - proje adı, komutlar (`dev`, `build`), paket listesi.
- `package-lock.json` - yüklenen paketlerin tam sürümlerini kilitler.
- `node_modules/` - indirilen paketler, GitHub'a gitmez.
- `tsconfig*.json` - TypeScript ayarları (`strict` açık).
- `vite.config.ts` - Vite ayarları ve React eklentisi; CSS küçültme kapalı (`--no` değeri yuvarlanmasın diye).
- `index.html` - tek HTML dosyası, içinde boş `div#root` var.
- `src/main.tsx` - React'i başlatır, `App`'i `root`'a çizer.
- `src/App.tsx` - state'leri tutar, sayfa geçişini yönetir, bileşenleri birleştirir.
- `src/App.css` - Sprint 3'teki numaraya göre renk ve fontlu stiller.
- `src/index.css` - genel stil, boş.
- `src/components/layout/Header.tsx` - başlık, isteğe bağlı alt yazı ve menüyü saran üst bölüm.
- `src/components/layout/Navigation.tsx` - menü; açık sayfayı alır, tıklamayı `onNavigate` ile bildirir.
- `src/components/layout/Footer.tsx` - props'suz alt bilgi.
- `src/components/events/EventCard.tsx` - tek etkinlik kartı; `onShowDetail(id)` ile detay ister.
- `src/components/events/EventList.tsx` - etkinlik dizisini `EventCard`'lara çevirir, boşsa mesaj gösterir.
- `src/components/events/EventFilter.tsx` - arama kutusu ve kategori seçimi; değişimi yukarı bildirir.
- `src/components/events/EventDetail.tsx` - seçili etkinliğin afişi, künyesi ve iki butonu.
- `src/components/forms/EventForm.tsx` - ekleme ve güncelleme sayfalarının ortak formu.
- `src/types/campus-event.ts` - `CampusEvent` ve `Category` tipleri.
- `src/types/page.ts` - `PageName` tipi.
- `src/data/events.ts` - tipli 6 etkinlik verisi.
- `src/utils/filter-events.ts` - arama, kategori filtresi ve id ile bulma saf fonksiyonları.
- `src/utils/format-date.ts` - ISO tarihi "12 Ekim 2026" biçimine çevirir.
- `public/` - olduğu gibi kopyalanan dosyalar (etkinlik afişleri).
