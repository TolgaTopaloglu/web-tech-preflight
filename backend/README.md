# Kampüs Etkinlikleri · Backend (Sprint 9)

Etkinlikleri JSON olarak veren Express sunucusu. Veriler Mongoose ile MongoDB'de tutulur; sunucu kapanıp açılınca kayıtlar kaybolmaz. Etkinlikler eklenir, güncellenir, silinir, başlığa göre aranır ve yaklaşanlar ayrı listelenir. Frontend bu sprintte değişmedi, Sprint 11'de bu sözleşmeye göre istek atacak.

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
- `npm run seed` önce `events` koleksiyonunu **boşaltır**, sonra 6 kayıt ekler. Kaç kez çalışırsa çalışsın sonuç 6 kayıttır; sonradan eklenenler silinir. Seed'deki 2 etkinliğin tarihi geçmişte, bu yüzden `/events/upcoming` listesinde görünmez.

## Ortam değişkenleri

| Değişken | Anlamı | Varsayılan |
|---|---|---|
| `PORT` | Sunucunun dinlediği port | `3000` |
| `MONGODB_URI` | MongoDB bağlantı adresi, sonunda veritabanı adı (`/kampus`) | yok, zorunlu |

`.env` GitHub'a gitmez (`.gitignore`). Gerçek Atlas adresi ve şifre yalnızca `.env` içinde durur; koda, README'ye ve Postman koleksiyonuna yazılmaz. `.env.example` yerel bir yer tutucu adres içerir.

## REST sözleşmesi

| Method | Endpoint | Amaç | Başarılı | Hata | Durum |
|---|---|---|---|---|---|
| GET | `/health` | Sunucu ayakta mı | 200 | — | Çalışıyor |
| GET | `/events` | Tarihe göre sıralı liste; `?search=` başlıkta arar, `?category=` süzer | 200 | — | Çalışıyor |
| GET | `/events/upcoming` | Bugün ve sonrası, en yakın önce | 200 | — | Çalışıyor |
| GET | `/events/:id` | Tek etkinlik (`:id` MongoDB `_id` değeri) | 200 | 404 | Çalışıyor |
| POST | `/events` | Yeni etkinlik | 201 | 400 | Çalışıyor |
| PATCH | `/events/:id` | Yalnızca gönderilen alanları günceller, güncel kaydı döner | 200 | 400, 404 | Çalışıyor |
| DELETE | `/events/:id` | Siler, gövde yok | 204 | 404 | Çalışıyor |

**Status code'lar:** 200 tamam · 201 oluşturuldu · 204 içerik yok · 400 eksik/yanlış veri · 404 bulunamadı · 500 sunucu hatası

**Bütün hatalar aynı biçimde:**

```json
{ "error": { "message": "Event not found" } }
```

- Biçimi geçersiz (`/events/yok`) ya da bulunamayan id her uçta 404 döner.
- PATCH'te boş gövde (`Body is empty`) ve `_id`, `createdAt`, `updatedAt`, `__v` alanlarını değiştirme denemesi 400 olur.
- Beklenmeyen hatalarda yanıt `500` ve `"Server error"` olur, ayrıntı yalnızca terminale yazılır.

### Tarih biçimi

Tarih API'de her yerde `"GG-AA-YYYY"` biçimindedir (`"15-10-2026"`). Veritabanında gerçek `Date` olarak saklanır, bu yüzden sıralama ve `/upcoming` tarihi doğru karşılaştırır. `"2026-12-20"` ya da `"31-02-2026"` gibi değerler 400 döner.

### Etkinlik alanları

| Alan | Tip | Kural |
|---|---|---|
| `title` | String | Zorunlu, kırpılır, 3-100 karakter |
| `category` | String | Zorunlu: `Seminer`, `Atölye`, `Söyleşi`, `Yarışma` |
| `date` | Date | Zorunlu, `"GG-AA-YYYY"` |
| `capacity` | Number | En az 0, varsayılan 0 |
| `time` | String | Varsayılan boş |
| `location` | String | Kırpılır, varsayılan boş |
| `description` | String | Kırpılır, en fazla 500 karakter, varsayılan boş |

`_id`, `createdAt` ve `updatedAt` otomatik oluşur.

### Örnek istek ve yanıtlar

`GET /health` → 200

```json
{ "status": "ok", "time": "2026-11-25T10:00:00.000Z", "student": "2416501049" }
```

`POST /events` gövdesi → 201 ve `_id`, `createdAt`, `updatedAt` ile yeni kayıt

```json
{ "title": "Git Atölyesi", "category": "Atölye", "date": "01-12-2026", "time": "14:00", "location": "Bilgisayar Laboratuvarı 1", "capacity": 30, "description": "Git ve GitHub ile ilk adımlar." }
```

`PATCH /events/:id` gövdesi `{ "capacity": 55 }` → 200 ve yalnızca `capacity` değişmiş kayıt

`DELETE /events/:id` → 204, gövde yok; aynı istek tekrar → 404

`GET /events?search=atölye&category=Atölye` → başlığında "atölye" geçen Atölye etkinlikleri (büyük/küçük harf fark etmez)

Tanımsız bir adres → 404 `{ "error": { "message": "Route not found" } }`

## Dosyalar

- `src/server.js` - `.env`'i okur, önce veritabanına bağlanır, sonra portu dinler.
- `src/app.js` - Express uygulaması: cors, `express.json()`, `/health`, `/events`, 404 ve hata yakalayıcı.
- `src/config/database.js` - `MONGODB_URI` ile bağlantı; adres yazdırılmaz.
- `src/utils/date.js` - `"GG-AA-YYYY"` metnini `Date`'e çevirir, geri yazar; bugünün başını verir.
- `src/models/event-model.js` - Event şeması ve modeli (`events` koleksiyonu).
- `src/routes/event-routes.js` - hangi adres hangi fonksiyona gider; `/upcoming`, `/:id`'den önce.
- `src/controllers/event-controller.js` - listeleme, arama, yaklaşanlar, tek kayıt, ekleme, güncelleme, silme.
- `src/data/seed-events.js` - 6 örnek etkinlik (2'si geçmiş tarihli).
- `src/seed.js` - `npm run seed` ile veritabanını doldurur.
- `requests/kampus-api.json` - Postman koleksiyonu (18 istek, 45 test). Kimlikleri kendisi kaydeder; `npm run seed` ve `npm run dev` sonrası Collection Runner ya da `newman run` ile çalıştırılır.
- `requests/run-results.json` - koleksiyonun son çalıştırma sonucu (18 istek, 45 test, 0 hata).
