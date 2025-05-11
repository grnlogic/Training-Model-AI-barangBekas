# BarbekRaft - Aplikasi Rekomendasi Kerajinan dari Barang Bekas

![BarbekRaft Logo](https://dummyimage.com/600x400/000/fff&text=BarbekRaft)

BarbekRaft adalah aplikasi inovatif yang menggunakan kecerdasan buatan untuk mendeteksi objek dalam gambar dan memberikan rekomendasi kerajinan dari barang bekas. Aplikasi ini bertujuan untuk mendorong daur ulang kreatif dan mengurangi limbah dengan memberikan ide-ide kerajinan yang dapat dibuat dari barang-barang rumah tangga yang sudah tidak terpakai.

> **Proyek ini dilanjutkan dan dikembangkan dari repositori [https://github.com/tryaannn](https://github.com/tryaannn)**

## Fitur Utama

- 🔍 **Deteksi Objek**: Mendeteksi objek-objek dalam gambar secara otomatis
- 🤖 **AI Powered**: Menggunakan model AI (Google Gemini) untuk memberikan rekomendasi kerajinan yang kreatif
- 📱 **Responsif**: Antarmuka pengguna yang responsif untuk desktop dan mobile
- 📝 **Petunjuk Lengkap**: Memberikan daftar bahan, langkah-langkah, tingkat kesulitan, dan estimasi waktu
- 🖼️ **Visualisasi**: Menghasilkan gambar contoh kerajinan
- 📊 **Kategori Material**: Mengkategorikan material daur ulang secara otomatis

## Prasyarat

- Node.js (v14 atau lebih baru)
- npm/yarn
- API key untuk layanan AI:
  - OpenAI API key
  - Google Gemini API key
  - (Opsional) Deepseek API key

## Instalasi

### 1. Clone repository

```bash
git clone https://github.com/grnlogic/barbekraft.git
cd barbekraft
```

### 2. Instal dependensi untuk server dan client

```bash
# Instal dependensi server
cd server
npm install

# Instal dependensi client
cd ../client
npm install
```

### 3. Konfigurasi environment variables

Buat file `.env` di folder server dengan konfigurasi berikut:

```env
# API Keys
OPENAI_API_KEY=your_openai_api_key
GEMINI_API_KEY=your_gemini_api_key
DEEPSEEK_API_KEY=your_deepseek_api_key

# API Configuration
OPENAI_API_URL=https://api.openai.com/v1/chat/completions
GEMINI_API_URL=https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent
DEEPSEEK_API_URL=https://api.deepseek.com/v1/chat/completions

# API Rate Limiting
MIN_TIME_BETWEEN_CALLS_MS=3000
MAX_API_CALLS_PER_HOUR=20
OPENAI_MAX_TOKENS=300
GEMINI_MAX_TOKENS=300

# Server Configuration
PORT=5000
NODE_ENV=development
```

## Menjalankan Aplikasi

### 1. Jalankan Diagnostic Tool untuk memastikan API berfungsi

```bash
cd server
node diagnostic.js
```

### 2. Jalankan server dan client

```bash
# Jalankan server (di folder server)
npm run dev

# Jalankan client (di folder client)
cd ../client
npm start
```

Aplikasi akan tersedia di http://localhost:3000

## Struktur Proyek
