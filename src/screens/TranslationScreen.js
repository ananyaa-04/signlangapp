import React, { useState, useRef } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { RNCamera } from 'react-native-camera';  // For webcam input
import Tts from 'react-native-tts';             // For text-to-speech
import tflite from 'react-native-tflite';       // TensorFlow Lite model inference

const TranslationScreen = ({ route }) => {
  const [translatedText, setTranslatedText] = useState('');
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const cameraRef = useRef(null);
  
  // Receive selected language from the previous screen
  const { language } = route.params;

  const predictSignLanguage = async (imageData) => {
    // Call TensorFlow Lite model to predict the sign language letter
    let tfliteModel = new tflite();
    tfliteModel.loadModel({
      model: 'model.tflite',  // Your TensorFlow Lite model file
      labels: 'labels.txt',   // Your labels file
      numThreads: 1
    }, (err, res) => {
      if (err) {
        console.error(err);
      }
    });
 // Run the prediction
 tfliteModel.runModelOnImage({
    path: imageData,  // Image captured from the camera
    imageMean: 128.0,
    imageStd: 128.0,
    numResults: 1,
    threshold: 0.05
  }, (err, prediction) => {
    if (err) {
      console.error(err);
    } else {
      let result = prediction[0].label;  // Predicted English letter
      setTranslatedText(result);

      // If the selected language is not Hindi, translate to Hindi for voice output
      if (language !== 'Hindi') {
        translateToHindi(result);
      } else if (isVoiceEnabled) {
        Tts.speak(result);  // Speak the translated text in Hindi
      }
    }
  });
};

const translateToHindi = (englishText) => {
  // Logic to translate English text to Hindi
  // You may use a translation library or API to perform this translation// For example: 
    // const hindiText = await translateAPI.translate(englishText, { to: 'hi' });
    const hindiText = englishToHindi(englishText); // A placeholder for the actual translation logic

    setTranslatedText(hindiText);
    if (isVoiceEnabled) {
      Tts.speak(hindiText);  // Speak the Hindi translation
    }
  };

  const toggleVoice = () => {
    setIsVoiceEnabled(!isVoiceEnabled);
  };
  const captureImage = async () => {
    if (cameraRef.current) {
      const data = await cameraRef.current.takePictureAsync();
      predictSignLanguage(data.uri);  // Call the prediction function
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.language}>Selected Language: {language}</Text>
      
      <RNCamera
        style={styles.camera}
        type={RNCamera.Constants.Type.front}
        captureAudio={false}
        ref={cameraRef}
      />

      <Button
        title="Predict"
        onPress={captureImage}
      />

      <Text style={styles.translatedText}>Translated Text: {translatedText}</Text>
      
      <TouchableOpacity onPress={toggleVoice}>
        <Text style={styles.voiceButton}>
          {isVoiceEnabled ? 'Disable Voice' : 'Enable Voice'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

// Placeholder function for translating English text to Hindi
const englishToHindi = (text) => {
  const translations = {
    'A': 'अ',
    'B': 'ब',
    'C': 'स',
    // Add more translations here
  };
  return translations[text] || text; // Return the Hindi translation or the original text
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  language: {
    fontSize: 18,
    marginBottom: 10,
  },
  camera: {
    width: 300,
    height: 400,
    marginBottom: 20,
  },
  translatedText: {
    fontSize: 24,
    marginTop: 20,
  },
  voiceButton: {
    marginTop: 20,
    fontSize: 18,
    color: 'blue',
  },
});

export default TranslationScreen;

