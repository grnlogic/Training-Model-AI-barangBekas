// Database kerajinan kombinasi untuk beberapa objek
const craftDatabaseMulti = [
  {
    id: 'botol-kaleng-1',
    nama: 'Lampu Hias Gantung Modern',
    bahan: ['botol plastik bekas', 'kaleng bekas', 'lampu LED', 'kabel listrik', 'lem tahan panas', 'cat', 'tali'],
    langkah: [
      'Bersihkan botol plastik dan kaleng bekas',
      'Potong bagian bawah botol plastik',
      'Potong kaleng menjadi pola dekoratif (strip atau spiral)',
      'Cat botol dan kaleng sesuai selera',
      'Pasang lampu LED di dalam kaleng',
      'Gabungkan kaleng di tengah botol menggunakan lem tahan panas',
      'Pasang tali untuk menggantung lampu',
      'Pasang kabel listrik dan sambungkan ke lampu LED'
    ],
    tingkatKesulitan: 'Sedang',
    kategori: 'Dekorasi Rumah',
    estimasiWaktu: '2-3 jam',
    kombinasi: ['botol', 'kaleng'],
    imagePrompt: 'A modern hanging lamp made from plastic bottles and decorated tin cans with LED lights inside, minimalist and elegant'
  },
  {
    id: 'kardus-kain-1',
    nama: 'Organizer Meja Multifungsi',
    bahan: ['kardus bekas', 'kain bekas', 'gunting', 'lem', 'penggaris', 'pensil', 'jarum', 'benang'],
    langkah: [
      'Potong kardus menjadi bentuk dasar organizer dengan beberapa kompartemen',
      'Ukur dan potong kain untuk melapisi kardus',
      'Tempelkan kain pada kardus dengan lem',
      'Buat jahitan di tepi kain untuk memperkuat dan mempercantik',
      'Buat sekat-sekat tambahan sesuai kebutuhan',
      'Tambahkan lapisan kain pada sekat untuk memperkuat',
      'Dekorasi sesuai selera'
    ],
    tingkatKesulitan: 'Mudah',
    kategori: 'Peralatan Kantor',
    estimasiWaktu: '1-2 jam',
    kombinasi: ['kardus', 'kain'],
    imagePrompt: 'A stylish desk organizer made from cardboard covered with colorful fabric, with multiple compartments for stationery'
  },
  {
    id: 'botol-koran-1',
    nama: 'Vas Bunga Artistik',
    bahan: ['botol plastik bekas', 'koran bekas', 'lem kayu', 'cat akrilik', 'kuas', 'gunting', 'vernis'],
    langkah: [
      'Bersihkan botol plastik dan lepaskan label',
      'Potong koran menjadi strip-strip kecil',
      'Campur lem kayu dengan sedikit air',
      'Tempelkan strip koran pada botol menggunakan teknik paper mache',
      'Buat beberapa lapisan dan biarkan kering',
      'Bentuk tekstur yang menarik dengan menambahkan lapisan koran',
      'Cat vas dengan warna dasar',
      'Tambahkan detail dan aksen dengan cat',
      'Lapisi dengan vernis untuk perlindungan'
    ],
    tingkatKesulitan: 'Sedang',
    kategori: 'Dekorasi Rumah',
    estimasiWaktu: '3-4 jam (termasuk waktu pengeringan)',
    kombinasi: ['botol', 'koran'],
    imagePrompt: 'An artistic flower vase made from plastic bottle covered with newspaper papier-mâché, painted with bright colors and patterns'
  },
  {
    id: 'kaleng-kain-1',
    nama: 'Tempat Penyimpanan Dekoratif',
    bahan: ['kaleng bekas berbagai ukuran', 'kain bekas', 'tali', 'lem tahan panas', 'gunting', 'pita dekoratif'],
    langkah: [
      'Bersihkan kaleng dan pastikan tidak ada bagian tajam',
      'Ukur keliling dan tinggi kaleng',
      'Potong kain sesuai ukuran kaleng dengan tambahan 1 cm untuk lipatan',
      'Tempelkan kain pada kaleng dengan lem tahan panas',
      'Lipat bagian atas dan bawah kain ke dalam kaleng',
      'Tambahkan tali atau pita di bagian atas sebagai pegangan',
      'Dekorasi dengan pita atau hiasan lainnya'
    ],
    tingkatKesulitan: 'Mudah',
    kategori: 'Penyimpanan',
    estimasiWaktu: '30-60 menit per kaleng',
    kombinasi: ['kaleng', 'kain'],
    imagePrompt: 'Decorative storage containers made from tin cans covered with colorful fabric, with rope handles and ribbon decoration'
  },
  {
    id: 'kardus-botol-1',
    nama: 'Mainan Mobil RC Sederhana',
    bahan: ['kardus tebal', 'botol plastik kecil (roda)', 'tusuk sate', 'lem tahan panas', 'gunting', 'cutter', 'cat'],
    langkah: [
      'Gambar dan potong bentuk dasar mobil dari kardus',
      'Potong botol plastik menjadi roda (4 buah)',
      'Buat lubang di kardus untuk poros roda',
      'Pasang tusuk sate sebagai poros',
      'Pasang roda dari potongan botol ke tusuk sate',
      'Buat kemudi dan detail lainnya dari kardus',
      'Cat mobil sesuai selera',
      'Tunggu hingga kering'
    ],
    tingkatKesulitan: 'Sedang',
    kategori: 'Mainan',
    estimasiWaktu: '2 jam',
    kombinasi: ['kardus', 'botol'],
    imagePrompt: 'A toy car made from cardboard with wheels made from plastic bottle caps, colorful and sturdy'
  },
  {
    id: 'koran-botol-cd-1',
    nama: 'Hiasan Dinding Mozaik 3D',
    bahan: ['koran bekas', 'CD bekas', 'botol plastik', 'lem tahan panas', 'gunting', 'cat akrilik', 'kawat tipis', 'pigura bekas'],
    langkah: [
      'Potong CD menjadi potongan-potongan kecil berbentuk mozaik',
      'Gulung koran menjadi batang-batang spiral',
      'Potong botol menjadi bentuk bunga atau daun',
      'Susun desain di atas kardus atau papan bekas',
      'Rekatkan semua elemen dengan lem tahan panas',
      'Cat beberapa bagian untuk aksen',
      'Pasang kawat di bagian belakang untuk menggantung',
      'Bingkai dengan pigura bekas jika diinginkan'
    ],
    tingkatKesulitan: 'Sulit',
    kategori: 'Seni & Dekorasi',
    estimasiWaktu: '4-5 jam',
    kombinasi: ['koran', 'botol', 'cd'],
    imagePrompt: 'A 3D mosaic wall art made from pieces of CDs, newspaper coils, and plastic bottle shapes, creating a shimmering abstract pattern'
  },
  {
    id: 'kaleng-koran-1',
    nama: 'Pot Tanaman Bertingkat',
    bahan: ['kaleng bekas berbagai ukuran', 'koran bekas', 'cat tahan air', 'bor atau paku', 'tali atau rantai', 'tanah', 'tanaman kecil'],
    langkah: [
      'Bersihkan kaleng dan buat lubang drainase di bagian bawah',
      'Gulung koran dan bentuk menjadi tali yang kuat',
      'Cat kaleng dengan cat tahan air',
      'Buat lubang di bagian samping kaleng untuk menggantung',
      'Rangkai kaleng secara vertikal menggunakan tali koran',
      'Isi kaleng dengan tanah',
      'Tanam tanaman kecil di setiap kaleng',
      'Gantung di tempat yang diinginkan'
    ],
    tingkatKesulitan: 'Sedang',
    kategori: 'Berkebun',
    estimasiWaktu: '2-3 jam',
    kombinasi: ['kaleng', 'koran'],
    imagePrompt: 'A tiered hanging planter made from painted tin cans connected with newspaper rope, with small plants growing from each can'
  },
  {
    id: 'botol-kardus-kain-1',
    nama: 'Rumah Boneka Miniatur',
    bahan: ['botol plastik (furnitur)', 'kardus (struktur)', 'kain bekas (dekorasi)', 'lem', 'gunting', 'cat', 'kertas warna'],
    langkah: [
      'Potong kardus membentuk dinding dan lantai rumah boneka',
      'Rangkai struktur dasar dengan lem',
      'Buat furnitur mini dari potongan botol plastik',
      'Potong kain untuk tirai, karpet, dan seprai mini',
      'Lapisi dinding dengan kertas warna atau cat',
      'Pasang furnitur dan dekorasi dalam rumah',
      'Tambahkan detail dengan cat dan hiasan kecil',
      'Buat atap dan finishing sentuhan akhir'
    ],
    tingkatKesulitan: 'Sulit',
    kategori: 'Mainan',
    estimasiWaktu: '5-6 jam',
    kombinasi: ['botol', 'kardus', 'kain'],
    imagePrompt: 'A detailed miniature dollhouse made from cardboard structure, with furniture made from plastic bottles, and tiny fabric decorations like curtains and rugs'
  },
  {
    id: 'ban-kayu-1',
    nama: 'Kursi Santai Outdoor',
    bahan: ['ban bekas', 'kayu bekas atau ranting tebal', 'tali tambang', 'bor', 'cat tahan air', 'bantal kecil (opsional)'],
    langkah: [
      'Bersihkan ban bekas hingga benar-benar bersih',
      'Cat ban dengan cat tahan air dan biarkan kering',
      'Potong kayu atau ranting menjadi beberapa batang seukuran diameter ban',
      'Bor lubang di ban untuk memasukkan batang kayu',
      'Susun batang kayu sebagai dudukan',
      'Ikat batang kayu dengan tali tambang untuk memperkuat',
      'Tambahkan anyaman tali tambang sebagai sandaran',
      'Tambahkan bantal kecil jika diinginkan'
    ],
    tingkatKesulitan: 'Sulit',
    kategori: 'Furnitur',
    estimasiWaktu: '4-5 jam',
    kombinasi: ['ban', 'kayu'],
    imagePrompt: 'A comfortable outdoor chair made from a painted tire with wooden slats as seat and rope weaving as backrest'
  },
  {
    id: 'botol-sendok-garpu-1',
    nama: 'Lampu Gantung Futuristik',
    bahan: ['botol plastik bening', 'sendok dan garpu plastik bekas', 'lampu LED', 'kabel listrik', 'lem tahan panas', 'cat metalik (opsional)'],
    langkah: [
      'Bersihkan botol dan lepaskan label',
      'Potong sendok dan garpu plastik menjadi bagian-bagian (kepala sendok/garpu)',
      'Warnai dengan cat metalik jika diinginkan',
      'Buat pola lubang di botol untuk memasang kepala sendok/garpu',
      'Tempelkan kepala sendok/garpu di lubang dengan lem tahan panas',
      'Pasang lampu LED di dalam botol',
      'Pasang kabel listrik',
      'Uji lampu dan sesuaikan posisi hiasan jika perlu'
    ],
    tingkatKesulitan: 'Sedang',
    kategori: 'Pencahayaan',
    estimasiWaktu: '2-3 jam',
    kombinasi: ['botol', 'sendok-garpu'],
    imagePrompt: 'A futuristic hanging lamp made from a clear plastic bottle with plastic spoons and forks attached around it, illuminated from inside with LED lights'
  },
  {
    id: 'kardus-cd-1',
    nama: 'Kotak Perhiasan Mewah',
    bahan: ['kardus tebal', 'CD bekas', 'lem', 'gunting', 'cat metalik', 'kain beludru (opsional)', 'engsel kecil (bisa dari kardus tebal)'],
    langkah: [
      'Potong kardus membentuk kotak dengan tutup',
      'Potong CD menjadi potongan-potongan kecil berbentuk mozaik',
      'Cat bagian dalam kotak',
      'Tempelkan potongan CD di bagian luar kotak membentuk pola yang indah',
      'Buat engsel dari kardus tebal atau pita',
      'Lapisi bagian dalam dengan kain beludru jika ada',
      'Tambahkan sekat-sekat di dalam kotak jika diperlukan',
      'Biarkan kering sepenuhnya sebelum digunakan'
    ],
    tingkatKesulitan: 'Sedang',
    kategori: 'Penyimpanan',
    estimasiWaktu: '3 jam',
    kombinasi: ['kardus', 'cd'],
    imagePrompt: 'A luxurious jewelry box made from cardboard covered with mosaic pieces from old CDs creating a shimmering effect, lined with velvet inside'
  },
  {
    id: 'botol-tutup-botol-1',
    nama: 'Tirai Hiasan Jendela',
    bahan: ['botol plastik kecil', 'tutup botol warna-warni', 'tali nilon transparan', 'bor kecil atau paku panas', 'cat transparan (opsional)'],
    langkah: [
      'Potong botol plastik menjadi bentuk-bentuk menarik (bunga, spiral, dll)',
      'Buat lubang kecil di tutup botol dan potongan botol',
      'Cat potongan botol dengan cat transparan jika diinginkan',
      'Rangkai tutup botol dan potongan botol di tali nilon',
      'Buat beberapa rangkaian dengan panjang yang bervariasi',
      'Pasang tali-tali tersebut pada batang atau kayu di atas jendela',
      'Sesuaikan panjang dan posisi hingga terlihat menarik'
    ],
    tingkatKesulitan: 'Mudah',
    kategori: 'Dekorasi Jendela',
    estimasiWaktu: '2 jam',
    kombinasi: ['botol', 'tutup-botol'],
    imagePrompt: 'A window curtain made from colorful bottle caps and small plastic bottle cutouts shaped like flowers, strung on transparent nylon threads'
  },
  {
    id: 'kaleng-cd-1',
    nama: 'Lampu Meja Disco',
    bahan: ['kaleng besar', 'CD bekas', 'lampu LED', 'kabel listrik', 'lem tahan panas', 'gunting', 'bor kecil', 'alas kayu (opsional)'],
    langkah: [
      'Bersihkan kaleng dan buat lubang untuk kabel di bagian bawah',
      'Potong CD menjadi potongan-potongan kecil berbentuk segitiga',
      'Tempelkan potongan CD di seluruh permukaan kaleng',
      'Pasang lampu LED di dalam kaleng',
      'Buat lubang-lubang kecil di kaleng menggunakan bor',
      'Pasang kabel listrik',
      'Pasang alas kayu jika diinginkan',
      'Uji lampu dan nikmati efek disco dari pantulan CD'
    ],
    tingkatKesulitan: 'Sedang',
    kategori: 'Pencahayaan',
    estimasiWaktu: '2-3 jam',
    kombinasi: ['kaleng', 'cd'],
    imagePrompt: 'A disco table lamp made from a large can covered with triangular pieces of CDs, with small holes for light to shine through creating a sparkling effect'
  },
  {
    id: 'koran-kain-1',
    nama: 'Keranjang Anyaman Multifungsi',
    bahan: ['koran bekas', 'kain bekas', 'lem', 'gunting', 'cat akrilik', 'vernis'],
    langkah: [
      'Gulung koran membentuk batang-batang panjang dan kuat',
      'Anyam batang koran membentuk dasar keranjang',
      'Lanjutkan menganyam hingga membentuk keranjang sesuai ukuran yang diinginkan',
      'Potong kain untuk lapisan dalam keranjang',
      'Tempelkan kain di bagian dalam keranjang',
      'Cat bagian luar keranjang dengan warna yang diinginkan',
      'Aplikasikan vernis untuk perlindungan dan kilau',
      'Biarkan kering sepenuhnya sebelum digunakan'
    ],
    tingkatKesulitan: 'Sedang',
    kategori: 'Penyimpanan',
    estimasiWaktu: '3-4 jam',
    kombinasi: ['koran', 'kain'],
    imagePrompt: 'A woven multipurpose basket made from rolled newspaper tubes with a fabric lining inside, painted in bright colors'
  },
  {
    id: 'kardus-koran-botol-1',
    nama: 'Kota Miniatur Futuristik',
    bahan: ['kardus berbagai ukuran', 'koran bekas', 'botol plastik', 'lem', 'cat akrilik', 'gunting', 'lampu LED kecil (opsional)'],
    langkah: [
      'Potong kardus menjadi bentuk gedung-gedung dengan berbagai ukuran',
      'Gulung koran untuk membuat pipa dan struktur penghubung',
      'Potong botol plastik untuk kubah dan struktur futuristik',
      'Rangkai semua elemen membentuk kota miniatur',
      'Perkuat struktur dengan lem',
      'Cat dengan warna metalik dan futuristik',
      'Tambahkan detail jalan dan lansekap',
      'Pasang lampu LED kecil jika diinginkan untuk efek malam hari'
    ],
    tingkatKesulitan: 'Sulit',
    kategori: 'Diorama',
    estimasiWaktu: '6-8 jam',
    kombinasi: ['kardus', 'koran', 'botol'],
    imagePrompt: 'A detailed futuristic miniature city made from cardboard buildings, newspaper tubes as connecting structures, and plastic bottles as domes and futuristic elements, painted in metallic colors'
  },
  {
    id: 'botol-sedotan-1',
    nama: 'Lampu Hias Mekanik',
    bahan: ['botol plastik bening', 'sedotan plastik warna-warni', 'lampu LED', 'lem tahan panas', 'gunting', 'benang transparan', 'motor kecil (opsional)'],
    langkah: [
      'Potong botol plastik menjadi dua bagian',
      'Potong sedotan menjadi berbagai ukuran',
      'Rangkai sedotan membentuk struktur seperti atom atau molekul',
      'Hubungkan struktur dengan benang transparan',
      'Pasang lampu LED di bagian bawah botol',
      'Susun struktur sedotan di dalam botol',
      'Jika ada motor kecil, pasang untuk membuat struktur berputar',
      'Rekatkan kedua bagian botol kembali'
    ],
    tingkatKesulitan: 'Sulit',
    kategori: 'Pencahayaan',
    estimasiWaktu: '3-4 jam',
    kombinasi: ['botol', 'sedotan'],
    imagePrompt: 'A mechanical light decoration made from a clear plastic bottle containing colorful straw structures resembling atoms or molecules, illuminated by LED lights from below'
  }
];

module.exports = craftDatabaseMulti;