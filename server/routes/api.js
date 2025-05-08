const express = require('express');
const router = express.Router();
const craftDatabase = require('../models/craftDatabase');
const craftDatabaseMulti = require('../models/craftDatabaseMulti');

// Route untuk mendapatkan database kerajinan
router.get('/crafts', (req, res) => {
  res.json(craftDatabase);
});

// Route untuk mendapatkan database kerajinan multi-objek
router.get('/crafts-multi', (req, res) => {
  res.json(craftDatabaseMulti);
});

// Pemetaan objek COCO-SSD ke kategori kerajinan
const objectMapping = {
  // Botol dan wadah
  'bottle': 'botol',
  'wine glass': 'botol',
  'cup': 'kaleng',
  'bowl': 'kaleng',
  'vase': 'botol',
  
  // Kardus dan kotak
  'box': 'kardus',
  'suitcase': 'kardus',
  'handbag': 'kardus',
  'backpack': 'kardus',
  
  // Kertas dan buku
  'book': 'koran',
  'newspaper': 'koran',
  'paper': 'koran',
  
  // Kain dan pakaian
  'tie': 'kain',
  'handbag': 'kain',
  'backpack': 'kain',
  'umbrella': 'kain',
  'suitcase': 'kain',
  'shirt': 'kain',
  'dress': 'kain',
  'pants': 'kain',
  'scarf': 'kain',
  'glove': 'kain',
  'skirt': 'kain',
  'hat': 'kain',
  'sock': 'kain',
  
  // Elektronik
  'cell phone': 'elektronik',
  'tv': 'elektronik',
  'laptop': 'elektronik',
  'remote': 'elektronik',
  'keyboard': 'elektronik',
  'mouse': 'elektronik',
  'microwave': 'elektronik',
  'oven': 'elektronik',
  'toaster': 'elektronik',
  'refrigerator': 'elektronik',
  
  // Ban dan roda
  'tire': 'ban',
  'wheel': 'ban',
  'bicycle': 'ban',
  'motorcycle': 'ban',
  
  // Kayu
  'bench': 'kayu',
  'chair': 'kayu',
  'dining table': 'kayu',
  'wooden spoon': 'kayu',
  'stick': 'kayu',
  
  // CD/DVD
  'cd': 'cd',
  'dvd': 'cd',
  'frisbee': 'cd',
  
  // Tutup botol (tidak ada kategori langsung di COCO-SSD, jadi ini perkiraan)
  'cap': 'tutup-botol',
  'bottle cap': 'tutup-botol',
  
  // Sendok/garpu
  'spoon': 'sendok-garpu',
  'fork': 'sendok-garpu',
  'knife': 'sendok-garpu',
  'chopsticks': 'sendok-garpu',
  
  // Sedotan (tidak ada kategori langsung di COCO-SSD, jadi ini perkiraan)
  'straw': 'sedotan'
};

// Route untuk mendapatkan saran kerajinan berdasarkan objek yang terdeteksi (termasuk multi-objek)
router.post('/suggest', (req, res) => {
  try {
    const { objects } = req.body;
    
    if (!objects || !Array.isArray(objects)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Format permintaan tidak valid. Harap sertakan array "objects".'
      });
    }
    
    console.log('Objek yang terdeteksi:', objects);

    // 1. Pembobotan objek berdasarkan confidence score
    let weightedObjects = {};
    
    // Konversi objek terdeteksi ke objek dalam database dengan pembobotan
    objects.forEach(obj => {
      const mappedClass = objectMapping[obj.class] || obj.class;
      
      // Jika objek sudah ada dalam weightedObjects, tambahkan score-nya
      if (weightedObjects[mappedClass]) {
        weightedObjects[mappedClass] += obj.score;
      } else {
        weightedObjects[mappedClass] = obj.score;
      }
    });
    
    console.log('Objek terpetakan dengan bobot:', weightedObjects);
    
    // 2. Urutkan objek berdasarkan bobot tertinggi
    const sortedObjects = Object.entries(weightedObjects)
      .sort((a, b) => b[1] - a[1])
      .map(entry => entry[0]);
    
    console.log('Objek terurut berdasarkan bobot:', sortedObjects);

    // 3. Jika mendeteksi lebih dari 1 objek dengan confidence tinggi, coba cari kerajinan multi-objek
    if (sortedObjects.length > 1) {
      // Ambil 3 objek teratas untuk mencari kombinasi
      const topObjects = sortedObjects.slice(0, 3);
      
      // Cari kerajinan yang cocok dengan kombinasi objek
      const matchingMultiCrafts = craftDatabaseMulti.filter(craft => {
        // Hitung berapa banyak objek terdeteksi yang cocok dengan kombinasi
        const matchingCount = craft.kombinasi.filter(item => topObjects.includes(item)).length;
        
        // Jika setidaknya 2 objek cocok, anggap sebagai match
        return matchingCount >= 2;
      });
      
      if (matchingMultiCrafts.length > 0) {
        // Pilih kerajinan secara acak dari yang cocok
        const randomMultiCraft = matchingMultiCrafts[Math.floor(Math.random() * matchingMultiCrafts.length)];
        
        console.log('Merekomendasikan kerajinan multi-objek:', randomMultiCraft.id);
        
        return res.json({
          success: true,
          suggestion: {
            ...randomMultiCraft,
            isMulti: true
          },
          detectedObjects: objects.map(obj => ({
            class: obj.class,
            mappedClass: objectMapping[obj.class] || obj.class,
            score: obj.score
          }))
        });
      }
    }
    
    // 4. Jika tidak ada kerajinan multi-objek yang cocok, kembali ke metode single-object
    for (const mappedObj of sortedObjects) {
      // Cek jika ada kerajinan khusus berdasarkan objek terdeteksi
      const craftKeys = Object.keys(craftDatabase).filter(key => key.startsWith(mappedObj));
      
      if (craftKeys.length > 0) {
        // Jika ada beberapa kerajinan dalam kategori yang sama, pilih secara acak
        const randomCraftKey = craftKeys[Math.floor(Math.random() * craftKeys.length)];
        
        console.log('Merekomendasikan kerajinan single-object:', randomCraftKey);
        
        return res.json({
          success: true,
          suggestion: {
            ...craftDatabase[randomCraftKey],
            isMulti: false
          },
          detectedObjects: objects.map(obj => ({
            class: obj.class,
            mappedClass: objectMapping[obj.class] || obj.class,
            score: obj.score
          }))
        });
      }
    }

    // 5. Jika tidak ada yang cocok sama sekali
    return res.json({
      success: true,
      suggestion: {
        nama: 'Tidak ada saran spesifik',
        bahan: ['Barang yang terdeteksi tidak ada dalam database kami'],
        langkah: ['Silakan coba unggah gambar dengan barang bekas yang lain seperti botol, kaleng, kardus, kain, atau koran'],
        image: 'https://via.placeholder.com/150?text=Tidak+Ditemukan',
        isMulti: false
      },
      detectedObjects: objects.map(obj => ({
        class: obj.class,
        mappedClass: objectMapping[obj.class] || obj.class,
        score: obj.score
      }))
    });
  } catch (error) {
    console.error('Error dalam API suggest:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Terjadi kesalahan saat memproses permintaan.'
    });
  }
});

// API untuk menghasilkan gambar dari prompt kerajinan
router.post('/generate-image', (req, res) => {
  try {
    const { prompt } = req.body;
    
    if (!prompt) {
      return res.status(400).json({
        success: false,
        message: 'Prompt tidak boleh kosong'
      });
    }
    
    // Di sini Anda dapat mengintegrasikan dengan API generasi gambar seperti OpenAI DALL-E
    // Untuk contoh ini, kita akan menggunakan placeholder dengan prompt sebagai referensi
    
    // Enkode prompt untuk URL
    const encodedPrompt = encodeURIComponent(prompt);
    
    // Buat URL placeholder dengan prompt
    const imageUrl = `https://source.unsplash.com/featured/?${encodedPrompt}`;
    
    // Return URL gambar
    return res.json({
      success: true,
      imageUrl: imageUrl
    });
  } catch (error) {
    console.error('Error dalam API generate-image:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat menghasilkan gambar'
    });
  }
});

module.exports = router;