// Database kerajinan sederhana
const craftDatabase = {
  'botol': {
    nama: 'Vas Bunga dari Botol Plastik',
    bahan: ['botol plastik', 'cat', 'gunting', 'tali'],
    langkah: [
      'Potong bagian atas botol plastik',
      'Cat botol sesuai selera',
      'Hiasi dengan tali di leher botol',
      'Isi dengan air dan letakkan bunga'
    ],
    image: 'https://via.placeholder.com/150?text=Vas+Bunga'
  },
  'kaleng': {
    nama: 'Tempat Pensil dari Kaleng',
    bahan: ['kaleng bekas', 'kertas berwarna', 'lem', 'gunting'],
    langkah: [
      'Bersihkan kaleng dan pastikan tidak ada bagian tajam',
      'Potong kertas berwarna sesuai ukuran kaleng',
      'Tempelkan kertas ke kaleng dengan lem',
      'Tunggu hingga kering dan tempat pensil siap digunakan'
    ],
    image: 'https://via.placeholder.com/150?text=Tempat+Pensil'
  },
  'kardus': {
    nama: 'Rak Mini dari Kardus',
    bahan: ['kardus bekas', 'gunting', 'lem', 'cat'],
    langkah: [
      'Potong kardus menjadi bentuk dasar rak (sisi, atas, dan bawah)',
      'Tempelkan bagian-bagian dengan lem',
      'Cat rak sesuai selera',
      'Tunggu hingga kering dan rak siap digunakan'
    ],
    image: 'https://via.placeholder.com/150?text=Rak+Mini'
  },
  'kain': {
    nama: 'Tas Sederhana dari Kain Bekas',
    bahan: ['kain bekas', 'jarum', 'benang', 'gunting'],
    langkah: [
      'Potong kain sesuai pola tas yang diinginkan',
      'Jahit bagian pinggir kain',
      'Tambahkan tali sebagai pegangan',
      'Tas sederhana siap digunakan'
    ],
    image: 'https://via.placeholder.com/150?text=Tas+Kain'
  },
  'koran': {
    nama: 'Keranjang dari Koran Bekas',
    bahan: ['koran bekas', 'lem', 'gunting', 'cat (opsional)'],
    langkah: [
      'Gulung koran memanjang untuk membuat batang',
      'Susun dan tempelkan batang koran membentuk dasar keranjang',
      'Anyam batang koran untuk membentuk dinding keranjang',
      'Semprotkan cat jika ingin memberikan warna'
    ],
    image: 'https://via.placeholder.com/150?text=Keranjang+Koran'
  },
  'elektronik': {
    nama: 'Lampu Meja dari Barang Elektronik Bekas',
    bahan: ['casing elektronik bekas', 'lampu LED', 'kabel', 'solder', 'lem tahan panas'],
    langkah: [
      'Kosongkan bagian dalam casing elektronik dengan hati-hati',
      'Pasang lampu LED dan rangkaian kabel',
      'Buat lubang untuk kabel dan sakelar',
      'Rekatkan semua komponen dengan lem tahan panas',
      'Uji lampu dan pastikan aman digunakan'
    ],
    image: 'https://via.placeholder.com/150?text=Lampu+Meja'
  }
};

module.exports = craftDatabase;