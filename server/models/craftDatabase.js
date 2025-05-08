// Database kerajinan diperluas dengan lebih banyak jenis kerajinan
const craftDatabase = {
  // KATEGORI: BOTOL PLASTIK
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
  'botol-lampu': {
    nama: 'Lampu Hias dari Botol Plastik',
    bahan: ['botol plastik bening', 'lampu LED', 'cat transparan', 'gunting', 'kabel listrik'],
    langkah: [
      'Bersihkan botol dan lepaskan label',
      'Potong pola dekoratif di dinding botol',
      'Warnai botol dengan cat transparan jika diinginkan',
      'Masukkan rangkaian lampu LED ke dalam botol',
      'Pasang kabel listrik dan colokkan ke sumber listrik'
    ],
    image: 'https://via.placeholder.com/150?text=Lampu+Hias'
  },
  'botol-pot': {
    nama: 'Pot Tanaman Gantung dari Botol Plastik',
    bahan: ['botol plastik besar', 'tali atau kawat', 'gunting', 'cat', 'tanah', 'tanaman kecil'],
    langkah: [
      'Potong botol plastik secara horizontal menjadi dua bagian',
      'Buat lubang di bagian atas untuk tali gantung',
      'Cat botol dengan warna sesuai selera',
      'Buat lubang kecil di dasar pot untuk drainase',
      'Isi dengan tanah dan tanaman',
      'Pasang tali dan gantung di tempat yang diinginkan'
    ],
    image: 'https://via.placeholder.com/150?text=Pot+Gantung'
  },
  'botol-celengan': {
    nama: 'Celengan dari Botol Plastik',
    bahan: ['botol plastik', 'gunting', 'cat', 'kertas dekoratif', 'lem'],
    langkah: [
      'Bersihkan botol dan lepaskan label',
      'Buat lubang di bagian atas botol untuk memasukkan uang',
      'Cat botol atau hiasi dengan kertas dekoratif',
      'Pastikan tutup botol terpasang erat',
      'Celengan siap digunakan untuk menabung'
    ],
    image: 'https://via.placeholder.com/150?text=Celengan'
  },

  // KATEGORI: KALENG BEKAS
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
  'kaleng-lampu': {
    nama: 'Lampu Gantung dari Kaleng',
    bahan: ['kaleng bekas', 'palu dan paku', 'lampu', 'fitting lampu', 'kabel listrik', 'cat'],
    langkah: [
      'Bersihkan kaleng dan pastikan tidak ada bagian tajam',
      'Buat pola lubang pada kaleng menggunakan paku dan palu',
      'Cat kaleng sesuai selera',
      'Pasang fitting lampu dan kabel listrik',
      'Tambahkan lampu dan gantung di tempat yang diinginkan'
    ],
    image: 'https://via.placeholder.com/150?text=Lampu+Gantung'
  },
  'kaleng-pot': {
    nama: 'Pot Tanaman dari Kaleng',
    bahan: ['kaleng bekas', 'cat', 'paku', 'tanah', 'tanaman kecil'],
    langkah: [
      'Bersihkan kaleng dan pastikan tidak ada bagian tajam',
      'Buat beberapa lubang kecil di bagian bawah kaleng untuk drainase',
      'Cat kaleng dengan warna sesuai selera',
      'Isi dengan tanah dan tanam tanaman kecil',
      'Siram secukupnya dan letakkan di tempat yang cukup sinar matahari'
    ],
    image: 'https://via.placeholder.com/150?text=Pot+Tanaman'
  },
  'kaleng-musik': {
    nama: 'Alat Musik Perkusi dari Kaleng',
    bahan: ['kaleng bekas', 'balon', 'karet gelang', 'stik', 'hiasan'],
    langkah: [
      'Bersihkan kaleng dan pastikan tidak ada bagian tajam',
      'Potong balon dan rentangkan diatas mulut kaleng',
      'Pasang karet gelang untuk menahan balon',
      'Hiasi sisi kaleng sesuai selera',
      'Gunakan stik untuk memainkan alat musik perkusi'
    ],
    image: 'https://via.placeholder.com/150?text=Alat+Musik'
  },

  // KATEGORI: KARDUS
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
  'kardus-mainan': {
    nama: 'Mobil-mobilan dari Kardus',
    bahan: ['kardus bekas', 'tutup botol (untuk roda)', 'lem', 'cat', 'gunting', 'tusuk sate (untuk as roda)'],
    langkah: [
      'Gambar pola mobil pada kardus dan potong',
      'Buat lubang untuk as roda',
      'Pasang as roda menggunakan tusuk sate',
      'Pasang roda dari tutup botol',
      'Cat mobil-mobilan sesuai selera'
    ],
    image: 'https://via.placeholder.com/150?text=Mobil+Kardus'
  },
  'kardus-rumah': {
    nama: 'Rumah Mainan dari Kardus',
    bahan: ['kardus besar', 'gunting', 'lem', 'cat/spidol', 'kertas hias'],
    langkah: [
      'Potong kardus menjadi bentuk dasar rumah',
      'Buat pintu dan jendela dengan memotong bagian kardus',
      'Rangkai semua bagian dengan lem',
      'Hiasi dengan cat atau tempelkan kertas hias',
      'Tambahkan detail seperti atap, pintu, dan jendela'
    ],
    image: 'https://via.placeholder.com/150?text=Rumah+Mainan'
  },
  'kardus-frame': {
    nama: 'Bingkai Foto dari Kardus',
    bahan: ['kardus tebal', 'gunting', 'lem', 'hiasan (kancing, manik-manik, dll)', 'cat'],
    langkah: [
      'Potong dua bagian kardus: satu utuh dan satu dengan lubang di tengah',
      'Tempelkan kedua bagian untuk membuat frame',
      'Cat frame sesuai selera',
      'Hiasi dengan kancing, manik-manik, atau hiasan lainnya',
      'Pasang foto dan letakkan di tempat yang diinginkan'
    ],
    image: 'https://via.placeholder.com/150?text=Bingkai+Foto'
  },

  // KATEGORI: KAIN BEKAS
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
  'kain-boneka': {
    nama: 'Boneka dari Kain Bekas',
    bahan: ['kain bekas', 'jarum', 'benang', 'dakron/kapas', 'kancing (untuk mata)', 'gunting'],
    langkah: [
      'Gambar pola boneka pada kain dan potong (buat 2 bagian)',
      'Jahit kedua bagian kain, sisakan lubang untuk mengisi dakron',
      'Balik kain dan isi dengan dakron/kapas',
      'Jahit lubang yang tersisa',
      'Tambahkan detail seperti mata, hidung, dan mulut'
    ],
    image: 'https://via.placeholder.com/150?text=Boneka+Kain'
  },
  'kain-keset': {
    nama: 'Keset dari Kain Bekas',
    bahan: ['kain bekas tebal/handuk bekas', 'gunting', 'jarum', 'benang', 'kain anti-slip (opsional)'],
    langkah: [
      'Potong kain menjadi bentuk keset yang diinginkan',
      'Jika menggunakan beberapa lapisan, jahit bersama-sama',
      'Tambahkan jahitan dekoratif di pinggiran',
      'Tambahkan lapisan anti-slip di bagian bawah (opsional)',
      'Keset siap digunakan'
    ],
    image: 'https://via.placeholder.com/150?text=Keset+Kain'
  },
  'kain-gantungan': {
    nama: 'Gantungan Kunci dari Kain Bekas',
    bahan: ['kain bekas', 'dakron/kapas', 'jarum', 'benang', 'gantungan kunci', 'gunting', 'lem'],
    langkah: [
      'Gambar dan potong pola kecil (berbentuk hati, bintang, dll) pada kain',
      'Jahit pinggiran, sisakan lubang kecil',
      'Isi dengan dakron/kapas',
      'Jahit lubang yang tersisa',
      'Pasang gantungan kunci dengan lem atau jahitan'
    ],
    image: 'https://via.placeholder.com/150?text=Gantungan+Kunci'
  },

  // KATEGORI: KORAN BEKAS
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
  'koran-tempat-tisu': {
    nama: 'Tempat Tisu dari Koran Bekas',
    bahan: ['koran bekas', 'lem', 'gunting', 'pernis/clear coat', 'kotak tisu bekas'],
    langkah: [
      'Potong koran menjadi strip-strip kecil',
      'Gulung strip koran menjadi tabung kecil',
      'Tempelkan gulungan koran pada kotak tisu bekas',
      'Lapisi dengan beberapa lapis pernis untuk melindungi',
      'Tunggu hingga kering dan tempat tisu siap digunakan'
    ],
    image: 'https://via.placeholder.com/150?text=Tempat+Tisu'
  },
  'koran-frame': {
    nama: 'Bingkai Foto dari Koran Bekas',
    bahan: ['koran bekas', 'kardus', 'lem', 'gunting', 'pernis/clear coat'],
    langkah: [
      'Buat rangka bingkai dari kardus',
      'Gulung koran menjadi batang-batang kecil',
      'Tempelkan batang koran pada rangka kardus',
      'Lapisi dengan pernis untuk melindungi dan memberi kilau',
      'Pasang foto setelah bingkai kering'
    ],
    image: 'https://via.placeholder.com/150?text=Bingkai+Koran'
  },
  'koran-vas': {
    nama: 'Vas Bunga dari Koran Bekas',
    bahan: ['koran bekas', 'lem, balon/botol sebagai cetakan', 'cat', 'pernis'],
    langkah: [
      'Tiup balon atau gunakan botol sebagai cetakan',
      'Potong koran menjadi potongan kecil',
      'Campurkan lem dengan air untuk membuat pasta',
      'Tempelkan potongan koran pada cetakan dengan pasta lem (teknik paper mache)',
      'Buat beberapa lapisan dan biarkan kering',
      'Kempiskan balon atau lepaskan botol, lalu cat dan pernis'
    ],
    image: 'https://via.placeholder.com/150?text=Vas+Koran'
  },

  // KATEGORI: ELEKTRONIK BEKAS
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
  },
  'elektronik-speaker': {
    nama: 'Speaker Mini dari Barang Elektronik Bekas',
    bahan: ['casing elektronik bekas', 'speaker kecil', 'amplifier mini', 'kabel', 'solder', 'baterai'],
    langkah: [
      'Kosongkan bagian dalam casing elektronik dengan hati-hati',
      'Pasang speaker dan amplifier di dalam casing',
      'Hubungkan semua komponen dengan kabel dan solder',
      'Buat lubang untuk jack audio dan sakelar',
      'Pasang baterai dan uji speaker'
    ],
    image: 'https://via.placeholder.com/150?text=Speaker+Mini'
  },
  'elektronik-jam': {
    nama: 'Jam Dinding dari Komponen Elektronik',
    bahan: ['motherboard bekas', 'mesin jam', 'jarum jam', 'baterai', 'lem'],
    langkah: [
      'Bersihkan motherboard dari debu dan kotoran',
      'Buat lubang di tengah motherboard untuk mesin jam',
      'Pasang mesin jam dari belakang',
      'Pasang jarum jam di bagian depan',
      'Pasang baterai dan setel waktu'
    ],
    image: 'https://via.placeholder.com/150?text=Jam+Dinding'
  },
  'elektronik-hiasan': {
    nama: 'Hiasan Robot dari Komponen Elektronik',
    bahan: ['berbagai komponen elektronik bekas', 'lem tahan panas', 'kawat', 'tang', 'alas display (kayu/plastik)'],
    langkah: [
      'Kumpulkan berbagai komponen elektronik kecil (chip, resistor, dll)',
      'Susun komponen membentuk badan, kepala, tangan, dan kaki robot',
      'Gunakan kawat untuk menghubungkan bagian-bagian',
      'Rekatkan semua bagian dengan lem tahan panas',
      'Pasang robot pada alas display'
    ],
    image: 'https://via.placeholder.com/150?text=Robot+Hiasan'
  },

  // KATEGORI: BAN BEKAS
  'ban': {
    nama: 'Kursi dari Ban Bekas',
    bahan: ['ban bekas', 'tali tambang', 'gunting', 'cat', 'busa atau bantal (opsional)'],
    langkah: [
      'Bersihkan ban bekas hingga benar-benar bersih',
      'Cat ban dengan warna sesuai selera dan biarkan kering',
      'Anyam tali tambang pada lubang ban untuk membuat dudukan',
      'Tambahkan busa atau bantal kecil untuk kenyamanan (opsional)',
      'Kursi siap digunakan'
    ],
    image: 'https://via.placeholder.com/150?text=Kursi+Ban'
  },
  'ban-meja': {
    nama: 'Meja dari Ban Bekas',
    bahan: ['ban bekas besar', 'papan kayu/kaca untuk permukaan meja', 'cat', 'tali tambang (opsional)'],
    langkah: [
      'Bersihkan ban bekas dan cat sesuai selera',
      'Potong papan kayu atau kaca sesuai ukuran untuk permukaan meja',
      'Letakkan papan di atas ban',
      'Hiasi sisi ban dengan tali tambang jika diinginkan',
      'Meja siap digunakan'
    ],
    image: 'https://via.placeholder.com/150?text=Meja+Ban'
  },
  'ban-ayunan': {
    nama: 'Ayunan dari Ban Bekas',
    bahan: ['ban bekas', 'tali tambang kuat', 'bor', 'cat', 'lapisan kain (opsional)'],
    langkah: [
      'Bersihkan ban dan cat dengan warna cerah',
      'Buat 3-4 lubang di bagian atas ban menggunakan bor',
      'Pasang tali tambang melalui lubang-lubang tersebut',
      'Ikat ujung tali pada dahan pohon atau struktur yang kuat',
      'Tambahkan lapisan kain di bagian dalam ban untuk kenyamanan (opsional)'
    ],
    image: 'https://via.placeholder.com/150?text=Ayunan+Ban'
  },
  'ban-pot': {
    nama: 'Pot Tanaman dari Ban Bekas',
    bahan: ['ban bekas', 'cat', 'plastik/terpal untuk lapisan dalam', 'tanah', 'tanaman'],
    langkah: [
      'Bersihkan ban dan cat dengan warna sesuai selera',
      'Lapisi bagian dalam ban dengan plastik/terpal',
      'Isi dengan tanah',
      'Tanam tanaman pilihan',
      'Letakkan di taman atau halaman'
    ],
    image: 'https://via.placeholder.com/150?text=Pot+Ban'
  },

  // KATEGORI: KAYU/RANTING BEKAS
  'kayu': {
    nama: 'Rak Gantung dari Ranting Kayu',
    bahan: ['ranting kayu yang kuat', 'tali', 'bor', 'amplas', 'pernis kayu'],
    langkah: [
      'Kumpulkan ranting kayu dengan ukuran serupa',
      'Amplas untuk menghaluskan permukaan',
      'Bor lubang di kedua ujung ranting',
      'Pasang tali melalui lubang',
      'Aplikasikan pernis dan biarkan kering',
      'Gantung di dinding'
    ],
    image: 'https://via.placeholder.com/150?text=Rak+Ranting'
  },
  'kayu-hiasan': {
    nama: 'Hiasan Dinding dari Potongan Kayu',
    bahan: ['potongan kayu berbagai ukuran', 'lem kayu', 'amplas', 'cat/pernis', 'gantungan'],
    langkah: [
      'Amplas potongan kayu hingga halus',
      'Susun potongan kayu membentuk pola yang diinginkan (geometris, pohon, dll)',
      'Rekatkan dengan lem kayu',
      'Cat atau pernis sesuai selera',
      'Pasang gantungan dan pajang di dinding'
    ],
    image: 'https://via.placeholder.com/150?text=Hiasan+Kayu'
  },
  'kayu-lilin': {
    nama: 'Tempat Lilin dari Kayu',
    bahan: ['potongan kayu tebal', 'bor dengan mata bor ukuran lilin', 'amplas', 'pernis'],
    langkah: [
      'Pilih potongan kayu yang stabil',
      'Amplas hingga halus',
      'Bor lubang seukuran lilin pada kayu',
      'Aplikasikan pernis untuk melindungi dan memberi kilau',
      'Masukkan lilin ke dalam lubang'
    ],
    image: 'https://via.placeholder.com/150?text=Tempat+Lilin'
  },
  'kayu-gantungan': {
    nama: 'Gantungan Kunci dari Potongan Kayu',
    bahan: ['potongan kayu kecil', 'amplas', 'bor', 'ring gantungan kunci', 'cat/pernis', 'spidol permanen'],
    langkah: [
      'Potong kayu menjadi bentuk yang diinginkan (bulat, persegi, dll)',
      'Amplas hingga halus',
      'Bor lubang kecil di bagian atas',
      'Cat atau pernis sesuai selera',
      'Tuliskan nama atau gambar dengan spidol permanen (opsional)',
      'Pasang ring gantungan kunci'
    ],
    image: 'https://via.placeholder.com/150?text=Gantungan+Kunci'
  },

  // KATEGORI: TUTUP BOTOL
  'tutup-botol': {
    nama: 'Hiasan Dinding dari Tutup Botol',
    bahan: ['tutup botol bekas (sebanyak mungkin)', 'papan/triplek', 'cat', 'lem', 'gantungan'],
    langkah: [
      'Cat tutup botol dengan berbagai warna',
      'Gambar pola pada papan/triplek',
      'Tempelkan tutup botol mengikuti pola dengan lem',
      'Cat bagian papan yang masih terlihat',
      'Pasang gantungan dan pajang di dinding'
    ],
    image: 'https://via.placeholder.com/150?text=Hiasan+Tutup+Botol'
  },
  'tutup-botol-gelang': {
    nama: 'Gelang dari Tutup Botol',
    bahan: ['tutup botol bekas', 'palu dan paku', 'cat', 'tali/kawat', 'tang'],
    langkah: [
      'Ratakan tutup botol dengan palu',
      'Buat lubang di pinggiran tutup botol dengan paku',
      'Cat tutup botol dengan warna sesuai selera',
      'Rangkai tutup botol dengan tali atau kawat',
      'Sesuaikan ukuran gelang dan kencangkan'
    ],
    image: 'https://via.placeholder.com/150?text=Gelang+Tutup+Botol'
  },
  'tutup-botol-magnet': {
    nama: 'Magnet Kulkas dari Tutup Botol',
    bahan: ['tutup botol bekas', 'magnet kecil', 'lem', 'cat', 'hiasan (opsional)'],
    langkah: [
      'Cat tutup botol dengan warna sesuai selera',
      'Tambahkan hiasan atau gambar di bagian depan tutup botol',
      'Tempelkan magnet kecil di bagian belakang tutup botol dengan lem',
      'Tunggu hingga lem kering',
      'Magnet kulkas siap digunakan'
    ],
    image: 'https://via.placeholder.com/150?text=Magnet+Kulkas'
  },
  'tutup-botol-tatakan': {
    nama: 'Tatakan Gelas dari Tutup Botol',
    bahan: ['tutup botol bekas (banyak)', 'lem', 'kain atau kardus tebal sebagai alas'],
    langkah: [
      'Susun tutup botol membentuk lingkaran atau persegi di atas kain/kardus',
      'Rekatkan tutup botol satu sama lain dan ke alas dengan lem',
      'Pastikan susunan tutup botol rapat dan kuat',
      'Potong kelebihan kain/kardus mengikuti bentuk tatakan',
      'Tatakan gelas siap digunakan'
    ],
    image: 'https://via.placeholder.com/150?text=Tatakan+Gelas'
  },

  // KATEGORI: SEDOTAN PLASTIK
  'sedotan': {
    nama: 'Tirai dari Sedotan Plastik',
    bahan: ['sedotan plastik bekas', 'benang/tali', 'jarum', 'gunting', 'manik-manik (opsional)'],
    langkah: [
      'Potong sedotan menjadi potongan berukuran sama',
      'Masukkan benang ke jarum dan ikat simpul di ujung benang',
      'Rangkai potongan sedotan dengan benang',
      'Tambahkan manik-manik di antara sedotan jika diinginkan',
      'Buat beberapa rangkaian dan gantung di atas pintu atau jendela'
    ],
    image: 'https://via.placeholder.com/150?text=Tirai+Sedotan'
  },
  'sedotan-lampu': {
    nama: 'Lampion dari Sedotan Plastik',
    bahan: ['sedotan plastik bekas', 'benang', 'lem', 'balon (sebagai cetakan)', 'lampu LED kecil'],
    langkah: [
      'Tiup balon sebagai cetakan',
      'Oleskan lem pada balon',
      'Tempelkan sedotan pada balon, buat pola jaring-jaring',
      'Tunggu hingga lem kering',
      'Kempiskan dan keluarkan balon',
      'Pasang lampu LED di dalam lampion'
    ],
    image: 'https://via.placeholder.com/150?text=Lampion+Sedotan'
  },
  'sedotan-tempat-pensil': {
    nama: 'Tempat Pensil dari Sedotan Plastik',
    bahan: ['sedotan plastik bekas', 'kaleng/toples bekas', 'lem', 'gunting', 'pita (opsional)'],
    langkah: [
      'Bersihkan kaleng/toples dan pastikan tidak ada bagian tajam',
      'Potong sedotan sedikit lebih tinggi dari kaleng/toples',
      'Tempelkan sedotan secara vertikal mengelilingi kaleng/toples',
      'Ikat dengan pita untuk mempercantik (opsional)',
      'Tempat pensil siap digunakan'
    ],
    image: 'https://via.placeholder.com/150?text=Tempat+Pensil+Sedotan'
  },
  'sedotan-hiasan': {
    nama: 'Hiasan Bintang dari Sedotan Plastik',
    bahan: ['sedotan plastik bekas', 'benang/tali', 'gunting', 'lem'],
    langkah: [
      'Potong 6 sedotan dengan panjang yang sama',
      'Susun 3 sedotan membentuk segitiga dan ikat di tengah',
      'Susun 3 sedotan lainnya membentuk segitiga kedua',
      'Gabungkan kedua segitiga membentuk bintang dan ikat di tengah',
      'Tambahkan benang untuk menggantung'
    ],
    image: 'https://via.placeholder.com/150?text=Hiasan+Bintang'
  },

  // KATEGORI: CD/DVD BEKAS
  'cd': {
    nama: 'Hiasan Dinding dari CD/DVD Bekas',
    bahan: ['CD/DVD bekas', 'lem', 'cermin kecil', 'tali', 'manik-manik (opsional)'],
    langkah: [
      'Bersihkan CD/DVD dari debu dan kotoran',
      'Tempelkan cermin kecil di tengah CD/DVD (opsional)',
      'Buat lubang kecil di bagian atas CD/DVD',
      'Pasang tali melalui lubang untuk menggantung',
      'Tambahkan manik-manik pada tali untuk hiasan'
    ],
    image: 'https://via.placeholder.com/150?text=Hiasan+CD'
  },
  'cd-jam': {
    nama: 'Jam Dinding dari CD/DVD Bekas',
    bahan: ['CD/DVD bekas', 'mesin jam', 'jarum jam', 'lem', 'cat (opsional)'],
    langkah: [
      'Bersihkan CD/DVD dari debu dan kotoran',
      'Cat CD/DVD jika tidak ingin menggunakan tampilan reflektif aslinya',
      'Buat lubang di tengah CD/DVD untuk mesin jam',
      'Pasang mesin jam dari belakang',
      'Pasang jarum jam di bagian depan'
    ],
    image: 'https://via.placeholder.com/150?text=Jam+CD'
  },
  'cd-tatakan': {
    nama: 'Tatakan Gelas dari CD/DVD Bekas',
    bahan: ['CD/DVD bekas', 'kain flanel', 'lem', 'gunting', 'hiasan (opsional)'],
    langkah: [
      'Potong kain flanel seukuran CD/DVD',
      'Tempelkan kain flanel pada salah satu sisi CD/DVD dengan lem',
      'Potong kelebihan kain di pinggiran CD/DVD',
      'Hiasi pinggiran CD/DVD dengan pita atau hiasan lainnya (opsional)',
      'Tatakan gelas siap digunakan'
    ],
    image: 'https://via.placeholder.com/150?text=Tatakan+CD'
  },
  'cd-lampu': {
    nama: 'Lampu Hias dari CD/DVD Bekas',
    bahan: ['CD/DVD bekas (banyak)', 'lem tahan panas', 'kawat atau rangka lampu', 'lampu', 'fitting lampu'],
    langkah: [
      'Potong CD/DVD menjadi potongan-potongan kecil (hati-hati, gunakan sarung tangan)',
      'Rekatkan potongan CD/DVD pada rangka lampu atau kawat dengan lem tahan panas',
      'Pasang fitting lampu dan kabel',
      'Pasang lampu pada fitting',
      'Lampu hias siap digunakan'
    ],
    image: 'https://via.placeholder.com/150?text=Lampu+CD'
  },

  // KATEGORI: SENDOK/GARPU PLASTIK
  'sendok-garpu': {
    nama: 'Hiasan Dinding dari Sendok/Garpu Plastik',
    bahan: ['sendok/garpu plastik bekas', 'papan/kardus tebal', 'lem tahan panas', 'cat', 'gantungan'],
    langkah: [
      'Cat sendok/garpu dengan warna sesuai selera',
      'Susun sendok/garpu membentuk pola di atas papan/kardus (seperti bunga atau pola geometris)',
      'Rekatkan sendok/garpu pada papan/kardus dengan lem tahan panas',
      'Tambahkan gantungan di bagian belakang',
      'Hiasan dinding siap dipajang'
    ],
    image: 'https://via.placeholder.com/150?text=Hiasan+Sendok'
  },
  'sendok-garpu-lampu': {
    nama: 'Lampu Hias dari Sendok Plastik',
    bahan: ['sendok plastik bekas', 'lem tahan panas', 'botol plastik/toples sebagai rangka', 'lampu LED/bohlam kecil', 'kabel dan fitting'],
    langkah: [
      'Potong bagian pegangan sendok plastik',
      'Tempelkan bagian "kepala" sendok pada botol/toples menggunakan lem tahan panas, mulai dari bawah',
      'Buat lapisan bertumpuk hingga menutupi seluruh permukaan botol/toples',
      'Pasang fitting lampu dan kabel di dalam',
      'Pasang lampu dan nyalakan'
    ],
    image: 'https://via.placeholder.com/150?text=Lampu+Sendok'
  },
  'sendok-garpu-gantungan': {
    nama: 'Gantungan Baju dari Sendok/Garpu Plastik',
    bahan: ['sendok/garpu plastik bekas', 'kawat tebal/hanger', 'lem tahan panas', 'tang', 'cat (opsional)'],
    langkah: [
      'Bengkokkan kawat membentuk gantungan baju',
      'Cat sendok/garpu jika diinginkan',
      'Rekatkan sendok/garpu pada kawat dengan lem tahan panas',
      'Pastikan sendok/garpu tersusun rapat dan kuat',
      'Gantungan baju siap digunakan'
    ],
    image: 'https://via.placeholder.com/150?text=Gantungan+Sendok'
  },
  'sendok-garpu-vas': {
    nama: 'Vas Bunga dari Sendok Plastik',
    bahan: ['sendok plastik bekas', 'botol plastik', 'lem tahan panas', 'gunting', 'cat (opsional)'],
    langkah: [
      'Potong bagian atas botol plastik jika diperlukan',
      'Cat sendok plastik jika diinginkan',
      'Tempelkan sendok plastik pada botol dengan bagian cekung menghadap keluar',
      'Susun sendok secara bertumpuk menutupi seluruh permukaan botol',
      'Isi dengan air dan letakkan bunga'
    ],
    image: 'https://via.placeholder.com/150?text=Vas+Sendok'
  }
};

module.exports = craftDatabase;