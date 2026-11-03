# Web Teknolojileri ve Programlama

Kampüs Etkinlikleri: fakültedeki seminer, atölye ve söyleşileri listeleyen, arayan ve yöneten React uygulaması.

Tolga Topaloğlu · 2416501049

## Canlı adres

https://tolgatopaloglu-frontend.vercel.app

## Kurulum

```bash
cd frontend
npm install
npm run dev
```

Üretim derlemesi için `npm run build`.

## Route listesi

| Adres | Sayfa |
|---|---|
| `/` | Ana sayfa |
| `/events` | Etkinlik listesi, arama ve kategori filtresi |
| `/events/:id` | Etkinlik detayı |
| `/login` | Giriş |
| `/register` | Kayıt |
| `/forgot-password` | Şifremi unuttum |
| `/admin` | Yönetim: etkinlik tablosu, düzenle, sil |
| `/admin/new` | Yeni etkinlik ekle |
| `/admin/:id/edit` | Etkinlik güncelle |
| `*` | Sayfa bulunamadı |

## Proje yapısı

```
prototype/   S1-S3  HTML · CSS · JavaScript (referans)
frontend/    S4-S6  Vite · TypeScript (strict) · React · React Router  ← yayınlanan ürün
```

Dosya ayrıntıları için [frontend/README.md](frontend/README.md).
