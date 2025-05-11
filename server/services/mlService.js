const objectClassifier = require("../models/mlModels/objectClassifier");
const objectMapping = require("../utils/objectMapping");

class MLService {
  constructor() {
    this.initializeModels();
  }

  async initializeModels() {
    try {
      await objectClassifier.loadModel();
      console.log("ML Service initialized successfully");
    } catch (error) {
      console.error("Error initializing ML Service:", error);
      throw new Error(
        "Gagal inisialisasi model ML. Aplikasi mungkin tidak berfungsi dengan benar."
      );
    }
  }

  async enhanceObjectDetection(objects) {
    if (!objectClassifier.isModelLoaded) {
      throw new Error(
        "Model ML belum dimuat. Tidak dapat meningkatkan deteksi objek."
      );
    }
    return await objectClassifier.enhanceConfidence(objects);
  }

  async getMaterialSuggestions(objects) {
    if (!objectClassifier.isModelLoaded) {
      throw new Error(
        "Model ML belum dimuat. Tidak dapat menyarankan material."
      );
    }
    return await objectClassifier.suggestCraftMaterials(objects);
  }

  async suggestCrafts(objects) {
    try {
      // Enhance object detection with ML
      const enhancedObjects = await this.enhanceObjectDetection(objects);
      console.log("Enhanced objects:", enhancedObjects);

      // Get material suggestions
      const materialSuggestions = await this.getMaterialSuggestions(
        enhancedObjects
      );
      console.log("Material suggestions:", materialSuggestions);

      // Return the processed objects and material suggestions
      return {
        enhancedObjects,
        materialSuggestions,
      };
    } catch (error) {
      console.error("Error in ML processing:", error);
      throw new Error(
        "Gagal memproses objek dengan Machine Learning: " + error.message
      );
    }
  }
}

module.exports = new MLService();
