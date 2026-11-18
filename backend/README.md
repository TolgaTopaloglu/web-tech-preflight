# Kampüs Etkinlikleri · Backend (Sprint 8)

Etkinlikleri JSON olarak veren Express sunucusu. Veriler Mongoose ile MongoDB'de tutulur; sunucu kapanıp açılınca kayıtlar kaybolmaz. Frontend bu sprintte değişmedi, Sprint 11'de bu sözleşmeye göre istek atacak.

## Çalıştırma

```bash
cd backend
npm install
cp .env.example .env   # MONGODB_URI değerini kendi veritabanınla değiştir
npm run seed           # events koleksiyonunu 6 örnek kayıtla doldurur
npm run dev            # node --watch: dosya değişince yeniden başlar
```

- Adres: `http://localhost:3000` (kontrol: `http://localhost:3000/health`)
- `npm start` aynı sunucuyu izleme olmadan başlatır.
- `npm run seed` önce `events` koleksiyonunu **boşaltır**, sonra 6 kayıt ekler. Kaç kez çalışırsa çalışsın sonuç 6 kayıttır; sonradan eklenenler silinir.

## Ortam değişkenleri

| Değişken | Anlamı | Varsayılan |
|---|---|---|
| `PORT` | Sunucunun dinlediği port | `3000` |
| `MONGODB_URI` | MongoDB bağlantı adresi, sonunda veritabanı adı (`/kampus`) | yok, zorunlu |

`.env` GitHub'a gitmez (`.gitignore`). Gerçek Atlas adresi ve şifre yalnızca `.env` içinde durur; koda, README'ye ve Postman koleksiyonuna yazılmaz. `.env.example` yerel bir yer tutucu adres içerir.

## REST sözleşmesi

| Method | Endpoint | Amaç | Başarılı | Hata | Durum |
|---|---|---|---|---|---|
| GET | `/health` | Sunucu ayakta mı | 200 | — | Tamam |
| GET | `/events` | Tarihe göre sıralı liste (`?category=Atölye` isteğe bağlı) | 200 | — | Tamam |
| GET | `/events/:id` | Tek etkinlik (`:id` MongoDB `_id` değeri) | 200 | 404 | Tamam |
| POST | `/events` | Yeni etkinlik | 201 | 400 | Tamam |
| PATCH | `/events/:id` | Güncelle | 200 | 400, 404 | Sprint 9 |
| DELETE | `/events/:id` | Sil | 204 | 404 | Sprint 9 |

**Status code'lar:** 200 tamam · 201 oluşturuldu · 204 içerik yok · 400 eksik/yanlış veri · 404 bulunamadı · 500 sunucu hatası

**Bütün hatalar aynı biçimde:**

```json
{ "error": { "message": "Event not found" } }
```

Biçimi geçersiz id (`/events/yok`) ve bulunamayan id ikisi de 404 döner. Beklenmeyen hatalarda yanıt `500` ve `"Server error"` olur, ayrıntı yalnızca terminale yazılır.

### Etkinlik alanları

| Alan | Tip | Kural |
|---|---|---|
| `title` | String | Zorunlu, kırpılır, 3-100 karakter |
| `category` | String | Zorunlu: `Seminer`, `Atölye`, `Söyleşi`, `Yarışma` |
| `date` | String | Zorunlu |
| `capacity` | Number | En az 0, varsayılan 0 |
| `time` | String | Varsayılan boş |
| `location` | String | Kırpılır, varsayılan boş |
| `description` | String | Kırpılır, en fazla 500 karakter, varsayılan boş |

`_id`, `createdAt` ve `updatedAt` otomatik oluşur.

### Örnek istek ve yanıtlar

`GET /health` → 200

```json
{ "status": "ok", "time": "2026-11-18T10:00:00.000Z", "student": "2416501049" }
```

`POST /events` gövdesi → 201 ve `_id`, `createdAt`, `updatedAt` ile yeni kayıt

```json
{ "title": "Git Atölyesi", "category": "Atölye", "date": "2026-12-01", "time": "14:00", "location": "Bilgisayar Laboratuvarı 1", "capacity": 30, "description": "Git ve GitHub ile ilk adımlar." }
```

`POST /events` gövdesinde yalnızca `title` varsa → 400

```json
{ "error": { "message": "Event validation failed: date: Path `date` is required., category: Path `category` is required." } }
```

Tanımsız bir adres → 404 `{ "error": { "message": "Route not found" } }`

## Dosyalar

- `src/server.js` - `.env`'i okur, önce veritabanına bağlanır, sonra portu dinler.
- `src/app.js` - Express uygulaması: cors, `express.json()`, `/health`, `/events`, 404 ve hata yakalayıcı.
- `src/config/database.js` - `MONGODB_URI` ile bağlantı; adres yazdırılmaz.
- `src/models/event-model.js` - Event şeması ve modeli (`events` koleksiyonu).
- `src/routes/event-routes.js` - hangi adres hangi fonksiyona gider.
- `src/controllers/event-controller.js` - isteği işler, modeli kullanır, yanıtı döndürür.
- `src/data/seed-events.js` - 6 örnek etkinlik.
- `src/seed.js` - `npm run seed` ile veritabanını doldurur.
- `requests/kampus-api.json` - Postman koleksiyonu (6 istek). `npm run seed` kimlikleri değiştirir; 3. istekteki `_id`'yi `GET /events` listesinden kopyalayıp güncelle.
