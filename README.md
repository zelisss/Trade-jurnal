# Trade Jurnal

Traderlar için işlem günlüğü ve performans analizi. Her işlemi teyitleri, sonucu ve (SL ise) eksikleriyle kaydet; uygulama hangi paritede, hangi konseptte ve hangi teyitlerle daha başarılı olduğunu hesaplayıp yorumlasın.

## İndir ve kur

| Platform | Nasıl |
|---|---|
| **Windows** | [Son sürüm](https://github.com/zelisss/trade-jurnal/releases/latest) → `TradeJurnal-…-win-x64.exe` |
| **macOS** | Son sürüm → `.dmg` (Apple Silicon: `arm64`, Intel: `x64`). İlk açılışta sağ tık → *Aç* |
| **Linux** | Son sürüm → `.AppImage` |
| **Android** | Son sürüm → `.apk` (bilinmeyen kaynaklara izin ver) ya da web sürümünde Chrome → *Uygulamayı yükle* |
| **iPhone / iPad** | Safari’de **https://zelisss.github.io/trade-jurnal/** → Paylaş → *Ana Ekrana Ekle* |
| **Tarayıcı** | https://zelisss.github.io/trade-jurnal/ — Chrome/Edge’de adres çubuğundaki *yükle* simgesiyle masaüstü uygulaması olarak da kurulabilir |

Uygulama tamamen çevrimdışı çalışır. **Veriler her cihazda ayrı saklanır**; cihaz değiştirirken *Ayarlar → Yedek indir* ve diğer cihazda *Yedekten yükle* kullan.

## Özellikler

**İşlem girişi** — parite, yön, seans (saate göre otomatik), HTF/giriş zaman dilimi, konsept, setup kalitesi, teyitler, giriş nedeni; giriş/SL/TP/çıkıştan RR ve R otomatik; SL olduğunda **“eksik / hata neydi?”** bölümü; duygu durumu, plana uyum, ders notu, grafik görüntüleri, etiketler.

**Panel** — net R / K/Z, kazanma oranı, beklenti, profit factor, maks. düşüş, seriler, sermaye eğrisi, aylık takvim.

**Analiz** — parite, konsept, seans, gün, saat, yön, kalite, duygu, plana uyum ve teyit sayısına göre istatistikler; konsept × parite ısı haritası; teyitlerin etkisi; SL’lerde eksik teyitler; hataların maliyeti.

**Koç & Yorumlar** — güçlü yönler, geliştirilmesi gerekenler ve önerilen kurallar (otomatik, Türkçe). claude.ai’da açıldığında Claude ile kişisel koç değerlendirmesi.

**Veri** — JSON yedek indir/yükle, Excel uyumlu CSV, demo modu.

## Proje yapısı

```
index.html             Uygulamanın tamamı (HTML + CSS + JS)
manifest.webmanifest   PWA tanımı
sw.js                  Çevrimdışı önbellek (service worker)
icons/                 Uygulama ikonları
desktop/               Electron masaüstü uygulaması (Windows/macOS/Linux)
mobile/                Capacitor Android uygulaması
scripts/copy-web.js    Web dosyalarını masaüstü/mobil paketlere kopyalar
.github/workflows/     main’e her push’ta web sürümünü yayınlar, .exe/.dmg/.AppImage/.apk derleyip Release oluşturur
```

### Yerelde çalıştırma

```bash
# Web: index.html'i tarayıcıda aç (ya da)
python3 -m http.server 8000

# Masaüstü
cd desktop && npm install && npm start      # geliştirme
npm run dist                                # kurulum dosyası → desktop/dist

# Android (Android Studio + SDK gerekli)
cd mobile && npm install && npm run web && npx cap add android && npx cap sync android
npx cap open android
```

### Android imzalama

Release APK’ları sabit bir anahtarla imzalanır, böylece güncellemeler eski sürümün üzerine kurulur. Anahtar repo ayarlarında iki gizli değer olarak tutulur: `ANDROID_KEYSTORE_B64` (keystore dosyasının base64’ü) ve `ANDROID_KEYSTORE_PASSWORD` (alias: `tradejurnal`). Tanımlı değilse debug imzalı APK üretilir.

Kısayollar: `N` yeni işlem · `Esc` kapat · `Ctrl/⌘ + Enter` kaydet
