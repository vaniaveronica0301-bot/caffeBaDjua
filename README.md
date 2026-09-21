# ☕ Coffee by BaDjua - Website Profil & E-Katalog UMKM

Website resmi dan katalog interaktif untuk **Coffee by BaDjua**, dibangun untuk memenuhi kriteria **Tugas Pemrograman Web** dengan standar industri:
- ✅ **Bahasa HTML5 & CSS3 Modern** (Desain responsif untuk HP, Tablet, & Laptop dengan palet warna hangat bertema cafe).
- ✅ **Implementasi Penuh jQuery** (Navigasi responsif, filter kategori dinamis, live search, kalkulator keranjang realtime, integrasi checkout WhatsApp otomatis, modal lightbox foto).
- ✅ **Dokumentasi Bisnis & Bukti Wawancara UMKM** (Dilengkapi foto menu resmi, foto racikan barista, dan modul wawancara dengan owner/perwakilan kedai).
- ✅ **Siap Terhubung ke GitHub & Online via GitHub Pages**.

---

## 📂 Struktur Proyek

```
caffeBaDjua/
├── index.html              # Halaman utama dengan struktur semantik HTML5
├── css/
│   └── style.css           # Desain modern, responsif, & palet warna warm coffee shop
├── js/
│   ├── jquery.min.js       # Library jQuery v3.7.1 lokal (+ CDN fallback)
│   └── main.js             # Skrip controller interaktif jQuery & JavaScript
├── assets/
│   └── images/
│       ├── menu-badjua.jpg # Foto menu fisik resmi Coffee by BaDjua
│       └── latte-art.jpg   # Foto karya barista & sajian kopi BaDjua
└── README.md               # Dokumentasi lengkap proyek & panduan deploy online
```

---

## 🚀 Fitur-Fitur Interaktif (Implementasi jQuery)

1. **Navigasi Responsif & ScrollSpy**:
   - Menu bar mobile dengan animasi hamburger slide-toggle (`slideToggle`).
   - Sticky navbar dengan bayangan otomatis saat di-scroll.
   - Highlight menu aktif otomatis sesuai posisi scroll halaman.
2. **Pencarian Real-Time (Live Search)**:
   - Pencarian menu instan tanpa reload halaman menggunakan event `keyup` / `input`.
   - Tombol bersihkan pencarian (*clear search*).
3. **Filter Kategori Menu Beranimasi**:
   - Filter menu: *Semua*, *Signature*, *Coffee*, *Non Coffee*, *Snacks*, dan *Food*.
   - Animasi transisi halus (`fadeIn`/`fadeOut`).
4. **Kalkulator & Keranjang Pesanan Interaktif**:
   - Menambahkan item ke keranjang dengan varian (*Hot* / *Iced*).
   - Pengaturan jumlah porsi (+ / -) dan tombol hapus item.
   - Perhitungan otomatis subtotal dan total harga dengan format mata uang Rupiah (`Rp xx.xxx`).
   - Data keranjang tersimpan di *LocalStorage* browser sehingga tidak hilang saat halaman di-refresh.
5. **Checkout WhatsApp Otomatis**:
   - Menghasilkan format pesan pesanan rapi (Nama pemesan, no meja/take-away, rincian menu, total bayar).
   - Membuka aplikasi WhatsApp secara otomatis dengan pesan siap kirim.
6. **Lightbox Modal Foto Dokumentasi**:
   - Setiap foto dokumentasi (menu fisik, barista, dan wawancara) dapat diklik untuk pratinjau resolusi tinggi.
   - Mendukung penutupan popup dengan tombol `Esc` atau klik di luar area foto.
7. **Fitur Ganti Foto Dokumentasi Interaktif**:
   - Tersedia input upload file langsung di halaman sehingga mahasiswa dapat langsung mempratinjau foto bersama owner kedai.

---

## 📋 Data Menu Berdasarkan Menu Resmi Coffee by BaDjua

| Kategori | Nama Menu | Pilihan Varian & Harga |
| :--- | :--- | :--- |
| **Signature** | Badjua Coffee | Iced: Rp 20.000 |
| **Signature** | Badjua Presso | Hot: Rp 25.000 |
| **Coffee** | Americano | Hot: Rp 12.000 / Iced: Rp 13.000 |
| **Coffee** | Brown Sugar Coffee | Hot: Rp 15.000 / Iced: Rp 20.000 |
| **Coffee** | Coffee Milk | Hot: Rp 13.000 / Iced: Rp 17.000 |
| **Coffee** | Coffee Milk Float | Iced: Rp 23.000 |
| **Coffee** | Affogato | Iced: Rp 20.000 |
| **Coffee** | Vietnam Drip | Hot: Rp 13.000 / Iced: Rp 15.000 |
| **Coffee** | Espresso & Black Coffee | Hot: Rp 10.000 / Rp 12.000 |
| **Non Coffee** | Chocolate & Dark Milo | 22K - 25K |
| **Non Coffee** | Green Tea & Thai Tea | 15K - 18K |
| **Non Coffee** | Taro, Vanila, Pandan | Iced: Rp 16.000 |
| **Snacks** | Pisang Nugget Cokelat Keju | Rp 17.000 |
| **Snacks** | Kentang Goreng / Keripik | Rp 15.000 / Rp 12.000 |
| **Food** | Nasi Goreng Badjua | Rp 22.000 |
| **Food** | Nasi Anak Kos | Rp 15.000 |
| **Food** | Mie Goreng / Rebus Telur | Rp 15.000 |

*Jam Operasional Kedai:* **09.00 - 23.00** (Close order: 22.30)  
*Instagram:* **[@badjuacoffee](https://instagram.com/badjuacoffee)**

---

## 🌐 Tautan Resmi Repositori & Website Online

- **URL Repositori GitHub:** [https://github.com/vaniaveronica0301-bot/caffeBaDjua](https://github.com/vaniaveronica0301-bot/caffeBaDjua)
- **URL Website Resmi (GitHub Pages):** [https://vaniaveronica0301-bot.github.io/caffeBaDjua/](https://vaniaveronica0301-bot.github.io/caffeBaDjua/)

Website ini sudah aktif secara online dan dapat diakses langsung oleh siapa saja, termasuk dosen pengampu, dari browser mana pun tanpa konfigurasi tambahan!

---

## 👨‍🎓 Identitas Mahasiswa / Kelompok
- **Mata Kuliah:** Pemrograman Web
- **Topik Proyek:** Pengembangan Website Profil & E-Katalog UMKM Coffee by BaDjua
- **Anggota Kelompok:** *(Silakan isi Nama & NIM Anda pada bagian footer `index.html`)*
