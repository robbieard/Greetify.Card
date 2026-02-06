# FullScreenCard Components

Komponen FullScreenInteractiveCard telah direfactor menjadi beberapa komponen kecil yang lebih mudah dikelola dan efisien.

## Struktur Komponen

### 1. **index.jsx** - Main Component
Komponen utama yang menggabungkan semua sub-komponen.

### 2. **templateConfigs.js** - Configuration Data
Berisi konfigurasi untuk semua template (birthday, wedding, anniversary, graduation).

### 3. **hooks.js** - Custom Hooks
- `useAudio`: Mengelola audio playback
- `useSlideNavigation`: Mengelola navigasi slide dan keyboard
- `useLottie`: Mengelola loading Lottie animations

### 4. **SlideComponents.jsx** - Individual Slide Components
- `IntroSlide`: Slide pembuka
- `NameSlide`: Slide nama dengan animasi khusus per template
- `PhotoSlide`: Slide foto dengan layout berbeda
- `HeartfeltSlide`: Slide pesan heartfelt
- `AgeSlide`: Slide umur dengan animasi khusus
- `WishSlide`: Slide wish/message
- `DurationSlide`: Slide durasi untuk anniversary

### 5. **UtilityComponents.jsx** - Utility Components
- `FinaleSlide`: Slide penutup
- `CardBackground`: Background component (video/lottie)
- `NavigationControls`: Kontrol navigasi dan audio

### 6. **SlideRenderer.jsx** - Slide Renderer
Komponen yang menentukan slide mana yang akan dirender berdasarkan tipe.

### 7. **WelcomeScreen.jsx** - Welcome Screen
Screen pembuka sebelum card dibuka.

### 8. **TemplateNotFound.jsx** - Error Component
Komponen error untuk template yang tidak ditemukan.

## Keuntungan Refactoring

1. **Modular**: Setiap komponen memiliki tanggung jawab yang jelas
2. **Reusable**: Komponen dapat digunakan kembali
3. **Maintainable**: Mudah untuk maintenance dan debugging
4. **Scalable**: Mudah menambah template atau slide baru
5. **Performance**: Loading lebih cepat karena code splitting
6. **Clean Code**: Kode lebih bersih dan mudah dibaca

## Cara Menambah Template Baru

1. Tambahkan konfigurasi di `templateConfigs.js`
2. Jika perlu slide khusus, tambahkan di `SlideComponents.jsx`
3. Update `SlideRenderer.jsx` jika ada tipe slide baru

## Cara Menambah Slide Baru

1. Buat komponen slide di `SlideComponents.jsx`
2. Tambahkan case baru di `SlideRenderer.jsx`
3. Update konfigurasi template di `templateConfigs.js`