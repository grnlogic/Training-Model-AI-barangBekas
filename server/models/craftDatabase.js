// Database kerajinan diperluas dengan lebih banyak jenis kerajinan dari barang rumah tangga
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
    image: 'https://via.placeholder.com/150?text=Vas+Bunga',
    imagePrompt: 'A beautiful flower vase made from a recycled plastic bottle, painted in bright colors with twine decorating the neck'
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
    image: 'https://via.placeholder.com/150?text=Lampu+Hias',
    imagePrompt: 'Decorative lamp made from clear plastic bottle with cut patterns, illuminated from inside with LED lights, casting beautiful patterns on the wall'
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
    image: 'https://via.placeholder.com/150?text=Pot+Gantung',
    imagePrompt: 'Hanging plant pot made from large plastic bottle, painted in bright colors, with rope for hanging, filled with small plants'
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
    image: 'https://via.placeholder.com/150?text=Celengan',
    imagePrompt: 'Piggy bank made from plastic bottle, painted colorfully with a slot for coins and money'
  },
  'botol-penyiram': {
    nama: 'Alat Penyiram Tanaman dari Botol Bekas',
    bahan: ['botol plastik', 'paku', 'palu', 'cat (opsional)'],
    langkah: [
      'Bersihkan botol dan lepaskan label',
      'Buat beberapa lubang kecil di tutup botol menggunakan paku dan palu',
      'Cat botol jika diinginkan untuk tampilan lebih menarik',
      'Isi botol dengan air',
      'Tutup rapat dan gunakan untuk menyiram tanaman'
    ],
    image: 'https://via.placeholder.com/150?text=Alat+Penyiram',
    imagePrompt: 'Watering can made from plastic bottle with small holes in the cap for gentle watering of plants'
  },
  'botol-tirai': {
    nama: 'Tirai Dekoratif dari Botol Plastik',
    bahan: ['botol plastik berwarna', 'gunting', 'tali nilon atau benang kuat', 'manik-manik (opsional)', 'jarum besar'],
    langkah: [
      'Potong botol plastik menjadi spiral atau bentuk lainnya',
      'Buat lubang kecil di setiap potongan',
      'Masukkan tali nilon melalui lubang',
      'Tambahkan manik-manik di antara potongan botol jika diinginkan',
      'Gantung di jendela atau pintu sebagai tirai dekoratif'
    ],
    image: 'https://via.placeholder.com/150?text=Tirai+Botol',
    imagePrompt: 'Decorative curtain made from colorful plastic bottles cut into spirals or shapes, strung on nylon thread, hanging on a window'
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
    image: 'https://via.placeholder.com/150?text=Tempat+Pensil',
    imagePrompt: 'Pencil holder made from tin can covered with colorful paper, standing on desk with pencils inside'
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
    image: 'https://via.placeholder.com/150?text=Lampu+Gantung',
    imagePrompt: 'Hanging lamp made from tin can with punched patterns that create beautiful light patterns when lit'
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
    image: 'https://via.placeholder.com/150?text=Pot+Tanaman',
    imagePrompt: 'Plant pot made from painted tin can with drainage holes, filled with soil and small plant'
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
    image: 'https://via.placeholder.com/150?text=Alat+Musik',
    imagePrompt: 'Percussion instrument made from tin can with balloon stretched over the top, decorated colorfully'
  },
  'kaleng-lentera': {
    nama: 'Lentera dari Kaleng Bekas',
    bahan: ['kaleng bekas', 'palu', 'paku', 'lilin', 'cat tahan panas', 'kawat untuk pegangan'],
    langkah: [
      'Bersihkan kaleng dan pastikan tidak ada bagian tajam',
      'Gambar pola lubang pada kaleng',
      'Buat lubang mengikuti pola dengan paku dan palu',
      'Cat kaleng dengan cat tahan panas',
      'Pasang kawat sebagai pegangan di bagian atas',
      'Letakkan lilin di dalam kaleng'
    ],
    image: 'https://via.placeholder.com/150?text=Lentera+Kaleng',
    imagePrompt: 'Lantern made from tin can with punched pattern holes, painted, with wire handle and candle inside'
  },
  'kaleng-rak': {
    nama: 'Rak Mini dari Kaleng Susu',
    bahan: ['kaleng susu bekas', 'tali atau kawat', 'cat', 'lem tahan panas', 'paku kecil'],
    langkah: [
      'Bersihkan kaleng susu dan lepaskan label',
      'Cat kaleng dengan warna yang diinginkan',
      'Rangkai kaleng secara horizontal dengan lem tahan panas',
      'Buat lubang kecil di bagian atas kaleng',
      'Pasang tali atau kawat melalui lubang untuk menggantung rak',
      'Rak mini siap digunakan untuk menyimpan barang kecil'
    ],
    image: 'https://via.placeholder.com/150?text=Rak+Mini+Kaleng',
    imagePrompt: 'Mini shelf made from painted milk cans arranged horizontally, hanging on wall with items stored inside'
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
    image: 'https://via.placeholder.com/150?text=Rak+Mini',
    imagePrompt: 'Small shelf made from cardboard, painted in bright colors, with multiple compartments for storage'
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
    image: 'https://via.placeholder.com/150?text=Mobil+Kardus',
    imagePrompt: 'Toy car made from cardboard with bottle cap wheels, colorfully painted'
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
    image: 'https://via.placeholder.com/150?text=Rumah+Mainan',
    imagePrompt: 'Dollhouse made from cardboard box with cut doors and windows, painted and decorated'
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
    image: 'https://via.placeholder.com/150?text=Bingkai+Foto',
    imagePrompt: 'Photo frame made from cardboard, painted and decorated with buttons and beads'
  },
  'kardus-organizer': {
    nama: 'Organizer Meja dari Kardus',
    bahan: ['kardus bekas', 'gunting', 'lem', 'cat atau kertas kado', 'penggaris'],
    langkah: [
      'Gambar dan potong pola dasar organizer dengan kompartemen',
      'Lipat dan rekatkan bagian-bagian dengan lem',
      'Cat atau lapisi dengan kertas kado',
      'Buat sekat-sekat tambahan sesuai kebutuhan',
      'Organizer siap digunakan untuk menyimpan alat tulis atau aksesori kecil'
    ],
    image: 'https://via.placeholder.com/150?text=Organizer+Kardus',
    imagePrompt: 'Desk organizer made from cardboard with multiple compartments, painted and decorated'
  },
  'kardus-laptop': {
    nama: 'Dudukan Laptop dari Kardus',
    bahan: ['kardus tebal', 'gunting', 'lem', 'cat (opsional)', 'penggaris'],
    langkah: [
      'Gambar dan potong pola dudukan laptop dari kardus tebal',
      'Buat lipatan dan slot pemasangan agar kokoh',
      'Rekatkan bagian-bagian dengan lem',
      'Cat jika diinginkan untuk tampilan lebih menarik',
      'Uji kekuatan dengan meletakkan laptop di atasnya'
    ],
    image: 'https://via.placeholder.com/150?text=Dudukan+Laptop',
    imagePrompt: 'Laptop stand made from thick cardboard with proper angles for ergonomic use'
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
    image: 'https://via.placeholder.com/150?text=Tas+Kain',
    imagePrompt: 'Simple tote bag made from recycled fabric with sturdy handles'
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
    image: 'https://via.placeholder.com/150?text=Boneka+Kain',
    imagePrompt: 'Cute stuffed toy made from fabric scraps, stuffed with cotton and with button eyes'
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
    image: 'https://via.placeholder.com/150?text=Keset+Kain',
    imagePrompt: 'Floor mat made from old towels or thick fabric with decorative stitching around the edges'
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
    image: 'https://via.placeholder.com/150?text=Gantungan+Kunci',
    imagePrompt: 'Fabric keychain in the shape of heart or star, stuffed and attached to a key ring'
  },
  'kain-masker': {
    nama: 'Masker Kain dari Baju Bekas',
    bahan: ['kain katun bekas', 'karet elastis', 'jarum', 'benang', 'gunting', 'kertas untuk pola'],
    langkah: [
      'Buat pola masker pada kertas',
      'Jiplak pola pada kain dan potong (buat 2 atau 3 lapisan)',
      'Jahit lapisan-lapisan kain menjadi satu',
      'Lipat pinggiran dan jahit untuk membuat tepi yang rapi',
      'Pasang karet elastis di kedua sisi masker',
      'Masker kain siap digunakan'
    ],
    image: 'https://via.placeholder.com/150?text=Masker+Kain',
    imagePrompt: 'Cloth face mask made from cotton fabric with elastic ear loops'
  },
  'kain-tempat-tisu': {
    nama: 'Tempat Tisu dari Kain Bekas',
    bahan: ['kain bekas', 'karton tebal', 'gunting', 'lem', 'jarum', 'benang', 'kotak tisu bekas'],
    langkah: [
      'Ukur kotak tisu yang akan dilapisi',
      'Potong karton sesuai ukuran dan bentuk kotak tisu',
      'Potong kain lebih besar dari ukuran karton (beri kelonggaran untuk lipatan)',
      'Lapisi karton dengan kain dan rekatkan dengan lem',
      'Jahit bagian yang perlu dijahit agar lebih kuat',
      'Pasang ke kotak tisu'
    ],
    image: 'https://via.placeholder.com/150?text=Tempat+Tisu+Kain',
    imagePrompt: 'Decorative tissue box cover made from recycled fabric with neat stitching'
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
    image: 'https://via.placeholder.com/150?text=Keranjang+Koran',
    imagePrompt: 'Woven basket made from rolled newspaper tubes, painted in a decorative color'
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
    image: 'https://via.placeholder.com/150?text=Tempat+Tisu',
    imagePrompt: 'Tissue box cover made from rolled newspaper tubes, varnished for protection and shine'
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
    image: 'https://via.placeholder.com/150?text=Bingkai+Koran',
    imagePrompt: 'Photo frame made from rolled newspaper tubes attached to cardboard base, varnished'
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
    image: 'https://via.placeholder.com/150?text=Vas+Koran',
    imagePrompt: 'Flower vase made from paper mache using newspaper, painted and varnished for an elegant finish'
  },
  'koran-kertas-daur-ulang': {
    nama: 'Kertas Daur Ulang dari Koran',
    bahan: ['koran bekas', 'ember/baskom', 'blender/mixer', 'screen mesh/kain kasa', 'bingkai kayu', 'air'],
    langkah: [
      'Robek koran menjadi potongan-potongan kecil',
      'Rendam dalam air hangat selama beberapa jam',
      'Blender campuran koran dan air hingga menjadi bubur',
      'Tuangkan bubur ke dalam baskom berisi air',
      'Celupkan screen mesh yang dipasang pada bingkai kayu ke dalam baskom',
      'Angkat perlahan untuk menangkap bubur kertas',
      'Keringkan di bawah sinar matahari',
      'Setelah kering, lepaskan kertas daur ulang dari bingkai'
    ],
    image: 'https://via.placeholder.com/150?text=Kertas+Daur+Ulang',
    imagePrompt: 'Homemade recycled paper made from newspaper pulp, with visible texture and natural edges'
  },
  'koran-hiasan-dinding': {
    nama: 'Hiasan Dinding dari Koran',
    bahan: ['koran bekas', 'kardus/triplek sebagai alas', 'lem', 'cat akrilik', 'clear coat', 'tali untuk gantungan'],
    langkah: [
      'Potong kardus/triplek sesuai ukuran hiasan dinding yang diinginkan',
      'Gulung koran menjadi batang-batang tipis',
      'Bentuk batang koran menjadi pola dekoratif (bunga, abstrak, dll)',
      'Tempelkan pada alas dengan lem',
      'Cat sesuai selera',
      'Lapisi dengan clear coat agar tahan lama',
      'Pasang tali untuk menggantung'
    ],
    image: 'https://via.placeholder.com/150?text=Hiasan+Dinding+Koran',
    imagePrompt: 'Wall art made from rolled newspaper forming a decorative pattern on cardboard base, painted in artistic colors'
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
    image: 'https://via.placeholder.com/150?text=Lampu+Meja',
    imagePrompt: 'Table lamp made from repurposed electronic casing with LED light installed'
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
    image: 'https://via.placeholder.com/150?text=Speaker+Mini',
    imagePrompt: 'Mini speaker made from old electronic case with repurposed audio components'
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
    image: 'https://via.placeholder.com/150?text=Jam+Dinding',
    imagePrompt: 'Wall clock made from old computer motherboard with clock mechanism installed in center'
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
    image: 'https://via.placeholder.com/150?text=Robot+Hiasan',
    imagePrompt: 'Decorative robot figure made from various electronic components like circuit boards, resistors, and wires'
  },
  'elektronik-phone-stand': {
    nama: 'Penyangga Ponsel dari Keyboard Bekas',
    bahan: ['keyboard bekas', 'obeng', 'lem tahan panas', 'cutter', 'amplas'],
    langkah: [
      'Bongkar keyboard bekas dengan hati-hati',
      'Ambil bagian casing keyboard',
      'Bentuk casing menjadi penyangga ponsel dengan sudut yang sesuai',
      'Haluskan bagian tepi yang tajam dengan amplas',
      'Rekatkan bagian-bagian dengan lem tahan panas',
      'Uji dengan meletakkan ponsel di atasnya'
    ],
    image: 'https://via.placeholder.com/150?text=Penyangga+Ponsel',
    imagePrompt: 'Phone stand made from old keyboard case, with proper angle for watching videos'
  },
  'elektronik-laci-mini': {
    nama: 'Laci Mini dari CD-ROM Bekas',
    bahan: ['drive CD-ROM bekas', 'obeng', 'lem', 'cat (opsional)', 'kertas dekoratif (opsional)'],
    langkah: [
      'Bongkar drive CD-ROM dan bersihkan',
      'Simpan casing dan mekanisme laci',
      'Dekorasi dengan cat atau kertas dekoratif',
      'Rakit kembali bagian mekanisme laci',
      'Gunakan sebagai laci mini untuk menyimpan barang kecil seperti klip, koin, dll.'
    ],
    image: 'https://via.placeholder.com/150?text=Laci+Mini',
    imagePrompt: 'Mini drawer made from old CD-ROM drive, painted and used for storing small items'
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
    image: 'https://via.placeholder.com/150?text=Kursi+Ban',
    imagePrompt: 'Chair made from old tire with rope weaving for the seat, painted in bright color'
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
    image: 'https://via.placeholder.com/150?text=Meja+Ban',
    imagePrompt: 'Coffee table made from large tire as base with wooden top, painted decoratively'
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
    image: 'https://via.placeholder.com/150?text=Ayunan+Ban',
    imagePrompt: 'Tire swing hanging from tree with colorful paint and rope'
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
    image: 'https://via.placeholder.com/150?text=Pot+Ban',
    imagePrompt: 'Garden planter made from painted tire filled with soil and flowering plants'
  },
  'ban-sandal': {
    nama: 'Sandal dari Ban Bekas',
    bahan: ['ban bekas', 'gunting/pisau tajam', 'tali nilon atau karet', 'lem kuat', 'pola kaki'],
    langkah: [
      'Buat pola sol sandal pada kertas',
      'Jiplak pola pada ban bekas',
      'Potong ban sesuai pola dengan gunting/pisau tajam',
      'Haluskan tepi potongan ban',
      'Pasang tali nilon atau karet sebagai tali sandal',
      'Kencangkan tali dengan lem kuat',
      'Biarkan lem mengering sebelum digunakan'
    ],
    image: 'https://via.placeholder.com/150?text=Sandal+Ban',
    imagePrompt: 'Sandals made from tire rubber with straps, durable and practical'
  },
  'ban-rak-sepatu': {
    nama: 'Rak Sepatu dari Ban Sepeda',
    bahan: ['ban sepeda bekas', 'baut dan mur', 'bor', 'cat', 'papan kayu (opsional)'],
    langkah: [
      'Bersihkan ban sepeda bekas',
      'Cat ban dengan warna sesuai selera',
      'Susun ban secara horizontal atau vertikal',
      'Gabungkan ban dengan baut dan mur',
      'Pasang di dinding atau letakkan di lantai',
      'Tambahkan papan kayu di bagian bawah untuk alas (opsional)',
      'Rak sepatu siap digunakan'
    ],
    image: 'https://via.placeholder.com/150?text=Rak+Sepatu+Ban',
    imagePrompt: 'Shoe rack made from bicycle tires stacked and bolted together, painted in bright colors'
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
    image: 'https://via.placeholder.com/150?text=Rak+Ranting',
    imagePrompt: 'Hanging shelf made from sturdy tree branch with rope hangers, varnished to highlight wood grain'
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
    image: 'https://via.placeholder.com/150?text=Hiasan+Kayu',
    imagePrompt: 'Wall art made from wood pieces arranged in geometric pattern, stained in different wood tones'
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
    image: 'https://via.placeholder.com/150?text=Tempat+Lilin',
    imagePrompt: 'Candle holder made from thick wood block with holes drilled for candles, natural finish'
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
    image: 'https://via.placeholder.com/150?text=Gantungan+Kunci',
    imagePrompt: 'Wooden keychain with personalized text or design, attached to key ring'
  },
  'kayu-standing-desk': {
    nama: 'Standing Desk Sederhana dari Kayu Bekas',
    bahan: ['papan kayu bekas', 'penggaris', 'gergaji', 'amplas', 'bor', 'sekrup', 'pernis'],
    langkah: [
      'Ukur dan potong papan kayu sesuai ukuran meja yang diinginkan',
      'Amplas semua permukaan dan tepi hingga halus',
      'Buat konstruksi kaki meja dengan tinggi yang sesuai untuk berdiri',
      'Bor lubang untuk sekrup',
      'Pasang semua bagian dengan sekrup',
      'Aplikasikan pernis untuk melindungi kayu',
      'Tunggu hingga kering sebelum digunakan'
    ],
    image: 'https://via.placeholder.com/150?text=Standing+Desk',
    imagePrompt: 'Simple standing desk made from reclaimed wood planks, with proper height for working while standing'
  },
  'kayu-rak-tanaman': {
    nama: 'Rak Tanaman Bertingkat dari Kayu Bekas',
    bahan: ['papan kayu bekas', 'gergaji', 'amplas', 'bor', 'sekrup', 'cat untuk eksterior', 'penggaris'],
    langkah: [
      'Ukur dan potong papan kayu menjadi beberapa tingkatan',
      'Amplas semua permukaan dan tepi',
      'Buat konstruksi rangka untuk rak bertingkat',
      'Pasang papan pada rangka dengan sekrup',
      'Cat dengan cat untuk eksterior agar tahan cuaca',
      'Tunggu hingga kering sebelum meletakkan pot tanaman'
    ],
    image: 'https://via.placeholder.com/150?text=Rak+Tanaman',
    imagePrompt: 'Multi-tiered plant stand made from reclaimed wood, painted for outdoor use, with potted plants displayed'
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
    image: 'https://via.placeholder.com/150?text=Hiasan+Tutup+Botol',
    imagePrompt: 'Wall art made from colorful bottle caps arranged in pattern on board'
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
    image: 'https://via.placeholder.com/150?text=Gelang+Tutup+Botol',
    imagePrompt: 'Bracelet made from flattened bottle caps, painted and strung together'
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
    image: 'https://via.placeholder.com/150?text=Magnet+Kulkas',
    imagePrompt: 'Refrigerator magnets made from decorated bottle caps with magnets attached to back'
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
    image: 'https://via.placeholder.com/150?text=Tatakan+Gelas',
    imagePrompt: 'Coaster made from bottle caps arranged in pattern on fabric backing'
  },
  'tutup-botol-jam': {
    nama: 'Jam Dinding dari Tutup Botol',
    bahan: ['tutup botol bekas (banyak)', 'papan/triplek berbentuk lingkaran', 'mesin jam', 'cat', 'lem', 'jarum jam'],
    langkah: [
      'Cat papan/triplek sebagai dasar jam',
      'Susun tutup botol mengelilingi tepi papan/triplek',
      'Rekatkan tutup botol dengan lem',
      'Buat lubang di tengah papan untuk mesin jam',
      'Pasang mesin jam dan jarum jam',
      'Pasang baterai dan atur waktu'
    ],
    image: 'https://via.placeholder.com/150?text=Jam+Tutup+Botol',
    imagePrompt: 'Wall clock with frame made from bottle caps arranged around circular board with clock hands'
  },
  'tutup-botol-gorden': {
    nama: 'Gorden dari Tutup Botol',
    bahan: ['tutup botol bekas (banyak)', 'bor kecil', 'tali nilon/senar pancing', 'cat (opsional)', 'manik-manik (opsional)'],
    langkah: [
      'Buat lubang di tutup botol menggunakan bor kecil',
      'Cat tutup botol jika diinginkan',
      'Masukkan tali nilon/senar pancing melalui lubang tutup botol',
      'Tambahkan manik-manik di antara tutup botol jika diinginkan',
      'Buat beberapa rangkaian tutup botol',
      'Gantung rangkaian pada batang gorden'
    ],
    image: 'https://via.placeholder.com/150?text=Gorden+Tutup+Botol',
    imagePrompt: 'Curtain made from colorful bottle caps strung on fishing line, hanging in doorway or window'
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
    image: 'https://via.placeholder.com/150?text=Tirai+Sedotan',
    imagePrompt: 'Colorful curtain made from plastic straws cut into pieces and strung on thread, hanging in doorway'
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
    image: 'https://via.placeholder.com/150?text=Lampion+Sedotan',
    imagePrompt: 'Lantern made from plastic straws arranged in lattice pattern on balloon base, with LED light inside'
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
    image: 'https://via.placeholder.com/150?text=Tempat+Pensil+Sedotan',
    imagePrompt: 'Pencil holder made from can covered with vertical plastic straws around the outside, tied with ribbon'
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
    image: 'https://via.placeholder.com/150?text=Hiasan+Bintang',
    imagePrompt: 'Star ornament made from plastic straws arranged in star pattern and tied in center'
  },
  'sedotan-gelang': {
    nama: 'Gelang dari Sedotan Plastik',
    bahan: ['sedotan plastik warna-warni', 'gunting', 'benang elastis', 'jarum', 'manik-manik (opsional)'],
    langkah: [
      'Potong sedotan menjadi potongan kecil (sekitar 1 cm)',
      'Masukkan benang elastis ke jarum',
      'Rangkai potongan sedotan pada benang elastis',
      'Tambahkan manik-manik di antara sedotan jika diinginkan',
      'Sesuaikan panjang dengan ukuran pergelangan tangan',
      'Ikat kedua ujung benang elastis dengan kuat'
    ],
    image: 'https://via.placeholder.com/150?text=Gelang+Sedotan',
    imagePrompt: 'Colorful bracelet made from small pieces of plastic straws strung on elastic thread'
  },
  'sedotan-bunga': {
    nama: 'Bunga Hias dari Sedotan Plastik',
    bahan: ['sedotan plastik warna-warni', 'gunting', 'kawat tipis', 'isolasi', 'lidi atau ranting sebagai tangkai'],
    langkah: [
      'Potong sedotan menjadi potongan 5-6 cm',
      'Pipihkan sedotan dan potong ujungnya menjadi bentuk kelopak bunga',
      'Buat 5-6 kelopak untuk setiap bunga',
      'Susun kelopak melingkar dan ikat bagian bawahnya dengan kawat',
      'Pasang pada lidi atau ranting sebagai tangkai',
      'Lapisi tangkai dengan sedotan hijau atau isolasi hijau'
    ],
    image: 'https://via.placeholder.com/150?text=Bunga+Sedotan',
    imagePrompt: 'Decorative flowers made from colored plastic straws cut into petal shapes and arranged on stem'
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
    image: 'https://via.placeholder.com/150?text=Hiasan+CD',
    imagePrompt: 'Wall hanging made from old CDs with reflective surface, decorative string for hanging'
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
    image: 'https://via.placeholder.com/150?text=Jam+CD',
    imagePrompt: 'Wall clock made from CD with clock mechanism installed in center and numbers around the edge'
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
    image: 'https://via.placeholder.com/150?text=Tatakan+CD',
    imagePrompt: 'Coaster made from CD covered with felt on one side, decorated around the edges'
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
    image: 'https://via.placeholder.com/150?text=Lampu+CD',
    imagePrompt: 'Decorative lamp with frame covered in pieces of CDs that reflect light in rainbow patterns'
  },
  'cd-mozaik': {
    nama: 'Mozaik dari CD/DVD Bekas',
    bahan: ['CD/DVD bekas', 'gunting yang kuat', 'sarung tangan pelindung', 'lem tahan panas', 'papan atau kanvas sebagai alas'],
    langkah: [
      'Kenakan sarung tangan pelindung untuk keamanan',
      'Potong-potong CD/DVD menjadi kepingan-kepingan kecil dengan gunting',
      'Gambar desain pada papan atau kanvas',
      'Tempelkan kepingan CD/DVD mengikuti desain dengan lem tahan panas',
      'Biarkan kering sepenuhnya sebelum dipajang'
    ],
    image: 'https://via.placeholder.com/150?text=Mozaik+CD',
    imagePrompt: 'Mosaic artwork made from pieces of broken CDs arranged in pattern on board, reflecting light with rainbow colors'
  },
  'cd-tiruan-es': {
    nama: 'Tiruan Es untuk Dekorasi dari CD Bekas',
    bahan: ['CD/DVD bekas', 'gunting yang kuat', 'sarung tangan pelindung', 'lem tahan panas', 'lampu LED (opsional)'],
    langkah: [
      'Kenakan sarung tangan pelindung untuk keamanan',
      'Potong CD/DVD menjadi kepingan yang menyerupai kristal es',
      'Haluskan tepian yang tajam',
      'Susun dan tempelkan dengan lem tahan panas sesuai dengan dekorasi yang diinginkan',
      'Tambahkan lampu LED di belakang untuk efek berkilau (opsional)'
    ],
    image: 'https://via.placeholder.com/150?text=Tiruan+Es+CD',
    imagePrompt: 'Decorative ice crystal effect made from cut CD pieces reflecting light like ice or crystals'
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
    image: 'https://via.placeholder.com/150?text=Hiasan+Sendok',
    imagePrompt: 'Wall art made from plastic spoons and forks arranged in flower or geometric pattern, painted in bright colors'
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
    image: 'https://via.placeholder.com/150?text=Lampu+Sendok',
    imagePrompt: 'Lamp shade made from plastic spoon heads attached to bottle frame, creating soft diffused light'
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
    image: 'https://via.placeholder.com/150?text=Gantungan+Sendok',
    imagePrompt: 'Coat hanger with plastic spoons or forks attached to create decorative functional hanger'
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
    image: 'https://via.placeholder.com/150?text=Vas+Sendok',
    imagePrompt: 'Flower vase made from plastic bottle covered with overlapping plastic spoons, creating petal-like appearance'
  },
  'sendok-bunga': {
    nama: 'Bunga Dekoratif dari Sendok Plastik',
    bahan: ['sendok plastik bekas', 'lem tahan panas', 'kawat atau lidi untuk tangkai', 'cat akrilik', 'gunting'],
    langkah: [
      'Potong bagian pegangan sendok, tinggalkan bagian kepala sendok',
      'Panaskan bagian kepala sendok dengan hair dryer atau api kecil hingga agak lunak (hati-hati)',
      'Bentuk sendok menjadi kelopak bunga (tekuk sedikit ke arah belakang)',
      'Cat kelopak bunga sesuai selera',
      'Tempelkan beberapa kelopak melingkar dengan lem tahan panas',
      'Pasang tangkai dari kawat atau lidi'
    ],
    image: 'https://via.placeholder.com/150?text=Bunga+Sendok',
    imagePrompt: 'Decorative flowers made from plastic spoons with curved petals, painted in bright colors with stems'
  },
  'sendok-cermin': {
    nama: 'Bingkai Cermin dari Sendok Plastik',
    bahan: ['sendok plastik bekas (banyak)', 'cermin bulat/kotak', 'karton tebal', 'lem tahan panas', 'cat semprot'],
    langkah: [
      'Potong karton sesuai bentuk cermin dengan tambahan lebar untuk bingkai',
      'Tempelkan cermin di tengah karton',
      'Cat sendok plastik dengan cat semprot',
      'Potong bagian pegangan sendok',
      'Tempelkan kepala sendok mengelilingi cermin dengan lem tahan panas, bagian cekung menghadap keluar',
      'Buat beberapa lapisan hingga bingkai terlihat penuh'
    ],
    image: 'https://via.placeholder.com/150?text=Cermin+Sendok',
    imagePrompt: 'Mirror with frame made from overlapping plastic spoons arranged in sunburst pattern, painted gold or silver'
  },

  // KATEGORI BARU: SPATULA/SUTIL BEKAS
  'spatula': {
    nama: 'Rak Kunci dari Spatula Bekas',
    bahan: ['spatula/sutil plastik bekas', 'papan kayu kecil', 'sekrup', 'bor', 'cat (opsional)'],
    langkah: [
      'Bersihkan spatula/sutil dengan baik',
      'Cat spatula jika diinginkan',
      'Pasang spatula pada papan kayu dengan sekrup, bagian kepala menghadap ke atas',
      'Pasang gantungan di bagian belakang papan',
      'Gantungkan di dekat pintu sebagai tempat menggantung kunci'
    ],
    image: 'https://via.placeholder.com/150?text=Rak+Kunci+Spatula',
    imagePrompt: 'Key rack made from old plastic spatula mounted on wooden board, with keys hanging from spatula handle'
  },

  // KATEGORI BARU: MAINAN PLASTIK BEKAS
  'mainan': {
    nama: 'Pot Tanaman dari Mainan Plastik',
    bahan: ['mainan plastik bekas (mobil, robot, boneka, dll)', 'bor kecil', 'cat tahan air', 'tanah', 'tanaman kecil atau kaktus'],
    langkah: [
      'Pilih mainan plastik dengan ukuran yang cukup untuk menjadi pot',
      'Buat lubang drainase dengan bor kecil di bagian bawah',
      'Cat mainan dengan warna sesuai selera (opsional)',
      'Isi dengan tanah',
      'Tanam kaktus kecil atau tanaman sukulen',
      'Letakkan di lokasi yang sesuai'
    ],
    image: 'https://via.placeholder.com/150?text=Pot+Mainan',
    imagePrompt: 'Succulent planter made from old plastic toy (car, robot, or doll) with small plant growing inside'
  },

  // KATEGORI BARU: SISIR BEKAS
  'sisir': {
    nama: 'Tempat Perhiasan dari Sisir Bekas',
    bahan: ['sisir plastik bekas', 'cat akrilik', 'lem tahan panas', 'hiasan (opsional)', 'kain felt (opsional)'],
    langkah: [
      'Bersihkan sisir dengan baik',
      'Cat sisir dengan warna yang diinginkan',
      'Tambahkan kain felt di bagian dasar jika diinginkan',
      'Tambahkan hiasan dekoratif dengan lem tahan panas',
      'Gunakan untuk menyimpan cincin, anting, atau perhiasan kecil lainnya'
    ],
    image: 'https://via.placeholder.com/150?text=Tempat+Perhiasan+Sisir',
    imagePrompt: 'Jewelry organizer made from old plastic comb, painted and decorated, with rings inserted between teeth'
  },

  // KATEGORI BARU: PAYUNG BEKAS
  'payung': {
    nama: 'Lampu Gantung dari Payung Bekas',
    bahan: ['payung bekas', 'lampu string/LED', 'gunting', 'tali', 'lem atau jarum dan benang'],
    langkah: [
      'Lepaskan kain payung dari rangka',
      'Bersihkan kain payung dan jemur hingga kering',
      'Gantung rangka payung terbalik dari langit-langit',
      'Pasang lampu string/LED di dalam rangka payung',
      'Rapikan kabel dan pastikan aman'
    ],
    image: 'https://via.placeholder.com/150?text=Lampu+Payung',
    imagePrompt: 'Hanging lamp made from upside-down umbrella frame with string lights inside, creating diffused lighting'
  }
};

module.exports = craftDatabase;