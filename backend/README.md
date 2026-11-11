# Kampüs Etkinlikleri · Backend (Sprint 7)

Frontend'in yanında ikinci bir uygulama: etkinlikleri JSON olarak veren Express sunucusu. Veri şimdilik bellekte (`src/data/events.js`); sunucu yeniden başlayınca POST ile eklenenler kaybolur. Frontend bu sprintte değişmedi, Sprint 11'de bu sözleşmeye göre istek atacak.

## Çalıştırma

```bash
cd backend
npm install
cp .env.example .env   # PORT değerini istersen değiştir
npm run dev            # node --watch: dosya değişince yeniden başlar
```

- Adres: `http://localhost:3000` (kontrol: `http://localhost:3000/health`)
- `npm start` aynı sunucuyu izleme olmadan başlatır.

## Ortam değişkenleri

| Değişken | Anlamı | Varsayılan |
|---|---|---|
| `PORT` | Sunucunun dinlediği port | `3000` |

`.env` GitHub'a gitmez (`.gitignore`); gerekli değişkenler `.env.example` dosyasındadır.

## REST sözleşmesi

| Method | Endpoint | Amaç | Başarılı | Hata | Durum |
|---|---|---|---|---|---|
| GET | `/health` | Sunucu ayakta mı | 200 | — | Bu sprint |
| GET | `/events` | Listeyi getir (`?category=Atölye` isteğe bağlı) | 200 | — | Bu sprint |
| GET | `/events/:id` | Tek etkinlik | 200 | 404 | Bu sprint |
| POST | `/events` | Yeni etkinlik | 201 | 400 | Bu sprint |
| PATCH | `/events/:id` | Güncelle | 200 | 400, 404 | Sprint 9 |
| DELETE | `/events/:id` | Sil | 204 | 404 | Sprint 9 |

**Status code'lar:** 200 tamam · 201 oluşturuldu · 204 içerik yok · 400 eksik/yanlış veri · 404 bulunamadı

**Bütün hatalar aynı biçimde:**

```json
{ "error": { "message": "Event not found" } }
```

### Örnek istek ve yanıtlar

`GET /health` → 200

```json
{ "status": "ok", "time": "2026-11-11T10:00:00.000Z", "student": "2416501049" }
```

`POST /events` gövdesi (`title`, `category`, `date` zorunlu) → 201 ve yeni kayıt (id `event-<zaman>`)

```json
{ "title": "Git Atölyesi", "category": "Atölye", "date": "2026-12-01", "capacity": 30 }
```

`POST /events` gövdesinde bunlardan biri yoksa → 400

```json
{ "error": { "message": "title, category and date are required" } }
```

Tanımsız bir adres → 404 `{ "error": { "message": "Route not found" } }`

## Dosyalar

- `src/server.js` - `.env`'i okur, portu dinler.
- `src/app.js` - Express uygulaması: cors, `express.json()`, `/health`, `/events`, 404.
- `src/routes/event-routes.js` - hangi adres hangi fonksiyona gider.
- `src/controllers/event-controller.js` - isteği işler, yanıtı döndürür.
- `src/data/events.js` - bellek içi 6 etkinlik.
- `requests/kampus-api.json` - Postman koleksiyonu (6 istek).
