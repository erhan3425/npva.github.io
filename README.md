# Nova AI - Akıllı Eğitim Platformu

## 🚀 Nasıl Kullanılır?

### 1. Dosyaları Açmak

**Windows'ta:**
1. `index.html` dosyasına **sağ tıklayın**
2. "Birlikte Aç" veya "Open with" seçin
3. Tarayıcınızı seçin (Chrome, Firefox, Edge, vb.)

**VEYA**

1. Tarayıcınızı açın (Chrome, Firefox, Edge)
2. Dosya menüsünden "Dosya Aç" / "Open File" seçin
3. `index.html` dosyasını seçin

### 2. Test Etmek İçin

Eğer butonlar çalışmıyorsa, önce `test.html` dosyasını açın ve test edin.

### 3. Sorun Giderme

**Butonlar çalışmıyorsa:**

1. Tarayıcınızda **F12** tuşuna basın (Developer Tools açılır)
2. **Console** sekmesine tıklayın
3. Kırmızı hata mesajları varsa, bunları kontrol edin
4. "Nova AI Script yüklendi! ✅" mesajını görmelisiniz

**Yaygın Sorunlar:**
- Script yüklenmediyse → Dosya yollarını kontrol edin
- Console'da hata varsa → Hatayı okuyup anlayın
- Sayfa yüklenmiyorsa → Dosyaların aynı klasörde olduğundan emin olun

### 4. Dosya Yapısı

```
new-project/
├── index.html          # Ana sayfa
├── styles.css          # Stil dosyası
├── script.js           # JavaScript dosyası
├── test.html           # Test sayfası
└── README.md           # Bu dosya
```

**ÖNEMLİ:** Tüm dosyalar aynı klasörde olmalı!

## 📋 Özellikler

### Öğrenci Özellikleri:
✅ Kayıt ve avatar seçimi
✅ Ders programı oluşturma
✅ Duygu durumuna göre otomatik program
✅ Sınıflara özel içerikler (5-6-7-8)
✅ Çalışma zamanı takibi
✅ Deneme sınavı girişi ve istatistikler
✅ Video önerileri ve oyunlar

### Öğretmen Özellikleri:
✅ Sınıf oluşturma ve yönetme
✅ Öğrenci takibi
✅ Sınıf kodu paylaşma

## 🔧 Teknik Bilgiler

- **HTML5** - Sayfa yapısı
- **CSS3** - Modern tasarım
- **JavaScript** - Fonksiyonalite
- **LocalStorage** - Veri saklama (tarayıcıda)

## 📱 Tarayıcı Desteği

✅ Google Chrome
✅ Mozilla Firefox
✅ Microsoft Edge
✅ Safari
✅ Opera

## 🐛 Hata Bildirimi

Eğer bir sorun yaşarsanız:

1. **F12** ile Console'u açın
2. Hata mesajını kopyalayın
3. Hangi butona bastığınızı not edin
4. Hangi sayfada olduğunuzu belirtin

## 💡 İpuçları

- İlk açılışta localStorage boş olduğu için "Landing Page" görünür
- Kayıt olduktan sonra veriler tarayıcıda saklanır
- Çıkış yapmazsanız tekrar girdiğinizde otomatik giriş yapar
- Tarayıcı verilerini temizlerseniz kayıtlar silinir

## 🎯 Kullanım Akışı

1. Landing Page → Video izle, "Devam Et"
2. Öğrenci/Öğretmen seç
3. Kayıt formunu doldur
4. Ders programı oluştur
5. Onboarding slaytlarını gör
6. Ana panele giriş yap
7. Duygu durumu seç
8. Özel programını gör ve çalış!

---

**Geliştirici Notu:** Bu sistem şu anda frontend-only çalışıyor. Veriler tarayıcının LocalStorage'ında saklanıyor. Backend entegrasyonu için FastAPI ve MongoDB kullanılabilir.
