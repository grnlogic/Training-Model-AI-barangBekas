const tf = require('@tensorflow/tfjs-node');
const objectMapping = require('../../utils/objectMapping');

class ObjectClassifier {
  constructor() {
    this.model = null;
    this.isModelLoaded = false;
  }

  async loadModel() {
    try {
      // For production, you would load a pre-trained model from a file or URL
      // this.model = await tf.loadLayersModel('file://./model/model.json');
      
      // For demonstration, we'll create a simple model that improves confidence scores
      // based on common objects found in crafting projects
      this.model = tf.sequential();
      this.model.add(tf.layers.dense({
        units: 128,
        activation: 'relu',
        inputShape: [1] // Single input - the confidence score
      }));
      this.model.add(tf.layers.dense({
        units: 64, 
        activation: 'relu'
      }));
      this.model.add(tf.layers.dense({
        units: 1,
        activation: 'sigmoid'
      }));
      
      this.model.compile({
        optimizer: 'adam',
        loss: 'binaryCrossentropy',
        metrics: ['accuracy']
      });
      
      this.isModelLoaded = true;
      console.log('ML model loaded successfully');
      return true;
    } catch (error) {
      console.error('Failed to load ML model:', error);
      return false;
    }
  }
  
  // Enhance confidence scores based on context and other objects
  async enhanceConfidence(objects) {
    if (!this.isModelLoaded) {
      await this.loadModel();
    }
    
    // Create a copy of the objects to avoid modifying the original
    const enhancedObjects = [...objects];
    
    // Get detected classes for context analysis
    const detectedClasses = objects.map(obj => obj.class);
    
    // Loop through each object and enhance its confidence
    for (let i = 0; i < enhancedObjects.length; i++) {
      let obj = enhancedObjects[i];
      
      // Create tensor from current confidence score
      const inputTensor = tf.tensor2d([[obj.score]]);
      
      // For demonstration, we'll use a simpler approach since the model isn't trained
      // In a real implementation, we would use the model for prediction
      // const prediction = this.model.predict(inputTensor);
      // const enhancedScore = prediction.dataSync()[0];
      
      // Apply contextual enhancements based on known relationships between objects
      let contextBonus = 0;
      
      // If we detect multiple related objects, increase confidence
      // For example, if we detect both "bottle" and "cap", they're likely related
      if (obj.class === "bottle" && detectedClasses.includes("cap")) {
        contextBonus += 0.1;
      } else if (obj.class === "cap" && detectedClasses.includes("bottle")) {
        contextBonus += 0.1;
      }
      
      // If object is commonly used in crafts, boost its score
      const craftingMaterials = ["bottle", "cardboard", "paper", "fabric", "can", "plastic"];
      if (craftingMaterials.includes(obj.class.toLowerCase())) {
        contextBonus += 0.05;
      }
      
      // Apply the enhancement with a cap at 0.95
      obj.score = Math.min(obj.score + contextBonus, 0.95);
      
      // Clean up tensor
      inputTensor.dispose();
    }
    
    return enhancedObjects;
  }
  
  // Suggest best craft materials based on detected objects
  async suggestCraftMaterials(objects) {
    // First, enhance confidence scores
    const enhancedObjects = await this.enhanceConfidence(objects);
    
    // Map objects to craft materials using the existing mapping
    let craftMaterials = {};
    
    enhancedObjects.forEach(obj => {
      const mappedClass = objectMapping[obj.class] || obj.class;
      
      // Add score to existing material or create new entry
      if (craftMaterials[mappedClass]) {
        craftMaterials[mappedClass] += obj.score;
      } else {
        craftMaterials[mappedClass] = obj.score;
      }
    });
    
    // Sort materials by confidence score
    const sortedMaterials = Object.entries(craftMaterials)
      .sort((a, b) => b[1] - a[1])
      .map(entry => ({ 
        material: entry[0], 
        confidence: entry[1],
        suggested: entry[1] > 0.7 // Suggest materials with high confidence
      }));
    
    return sortedMaterials;
  }
}

module.exports = new ObjectClassifier();
