# SAFEGUARD AI

Sistem simulasi prediksi bencana berbasis web sederhana. Dapat memprediksi risiko banjir, kebakaran, dan gempa bumi berdasarkan parameter lingkungan.

---

## Fitur Utama

- Analisis risiko banjir, kebakaran, dan gempa secara real-time
- Pencarian lokasi dengan peta interaktif
- Riwayat analisa lengkap (disimpan di browser)
- Panduan darurat bencana
- Tampilan responsif

---

## Cara Penggunaan

1. Buka file `index.html`
2. Pilih **Dashboard** untuk melakukan analisa
3. Isi parameter lingkungan (minimal 3) dan lokasi
4. Klik tombol **Analisa Sekarang**
5. Lihat hasil dan riwayat di menu masing-masing

---

## Struktur Proyek

SAFEGUARD-AI/
├── index.html
├── dashboard.html
├── history.html
├── education.html
├── css/style.css
├── js/
│   ├── app.js
│   ├── prediction.js
│   ├── chart.js
│   └── history.js
└── README.md


---

## Catatan

- Data riwayat disimpan di browser (localStorage)
- Pencarian lokasi menggunakan API publik (Photon)
- Proyek ini bersifat simulasi untuk tujuan edukasi

---