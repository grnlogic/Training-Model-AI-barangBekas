const express = require('express');
const router = express.Router();
const craftDatabase = require('../models/craftDatabase');

// Route untuk mendapatkan database kerajinan
router.get('/crafts', (req, res) => {
  res.json(craftDatabase);
});

// Route untuk mendapatkan saran kerajinan berdasarkan objek yang terdeteksi
router.post('/suggest', (req, res) => {
  try {
    const { objects } = req.body;
    
    if (!objects || !Array.isArray(objects)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Format permintaan tidak valid. Harap sertakan array "objects".'
      });
    }
    
    // Pemetaan objek yang lebih lengkap dari COCO-SSD ke objek dalam database kita
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

    console.log('Objek yang terdeteksi:', objects);

    // Pembobotan objek berdasarkan confidence score
    let weightedObjects = {};
    
    // Konversi objek terdeteksi ke objek dalam database kita dengan pembobotan
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
    
    // Urutkan objek berdasarkan bobot tertinggi
    const sortedObjects = Object.entries(weightedObjects)
      .sort((a, b) => b[1] - a[1])
      .map(entry => entry[0]);
    
    console.log('Objek terurut berdasarkan bobot:', sortedObjects);
    
    // Cari kerajinan yang cocok berdasarkan objek dengan bobot tertinggi
    for (const mappedObj of sortedObjects) {
      // Cek jika ada kerajinan khusus berdasarkan objek terdeteksi
      const craftKeys = Object.keys(craftDatabase).filter(key => key.startsWith(mappedObj));
      
      if (craftKeys.length > 0) {
        // Jika ada beberapa kerajinan dalam kategori yang sama, pilih secara acak
        const randomCraftKey = craftKeys[Math.floor(Math.random() * craftKeys.length)];
        
        console.log('Merekomendasikan kerajinan:', randomCraftKey);
        
        return res.json({
          success: true,
          suggestion: craftDatabase[randomCraftKey],
          detectedObjects: objects.map(obj => ({
            class: obj.class,
            mappedClass: objectMapping[obj.class] || obj.class,
            score: obj.score
          }))
        });
      }
    }

    // Jika tidak ada yang cocok
    return res.json({
      success: true,
      suggestion: {
        nama: 'Tidak ada saran spesifik',
        bahan: ['Barang yang terdeteksi tidak ada dalam database kami'],
        langkah: ['Silakan coba unggah gambar dengan barang bekas lain seperti botol, kaleng, kardus, kain, atau koran'],
        image: 'https://via.placeholder.com/150?text=Tidak+Ditemukan'
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

module.exports = router;