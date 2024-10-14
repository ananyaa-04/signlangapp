import React from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';

const LanguageSelection = ({ navigation }) => {
  const selectLanguage = (language) => {
    // Navigate to the TranslationScreen with selected language
    navigation.navigate('TranslationScreen', { language });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Language</Text>
      <Button title="Hindi" onPress={() => selectLanguage('Hindi')} />
      <Button title="Spanish" onPress={() => selectLanguage('Spanish')} />
      <Button title="French" onPress={() => selectLanguage('French')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default LanguageSelection;
