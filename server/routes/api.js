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
    
    // Objek deteksi yang mungkin dari COCO-SSD ke objek dalam database kita
    const objectMapping = {
      'bottle': 'botol',
      'cup': 'kaleng',
      'box': 'kardus',
      'book': 'koran',
      'handbag': 'kain',
      'backpack': 'kain',
      'suitcase': 'kain',
      'cell phone': 'elektronik',
      'tv': 'elektronik'
    };

    // Konversi objek terdeteksi ke objek dalam database kita
    const mappedObjects = objects.map(obj => {
      return objectMapping[obj.class] || obj.class;
    });

    // Cari kerajinan yang cocok
    for (const mappedObj of mappedObjects) {
      if (craftDatabase[mappedObj]) {
        return res.json({
          success: true,
          suggestion: craftDatabase[mappedObj]
        });
      }
    }

    // Jika tidak ada yang cocok
    return res.json({
      success: true,
      suggestion: {
        nama: 'Tidak ada saran spesifik',
        bahan: ['Barang yang terdeteksi tidak ada dalam database kami'],
        langkah: ['Silakan coba unggah gambar dengan barang bekas yang lain seperti botol, kaleng, kardus, kain, atau koran'],
        image: 'https://via.placeholder.com/150?text=Tidak+Ditemukan'
      }
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