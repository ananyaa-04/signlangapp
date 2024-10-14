import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LanguageSelection from './src/LanguageSelection';
import TranslationScreen from './src/TranslationScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LanguageSelection">
        <Stack.Screen name="LanguageSelection" component={LanguageSelection} />
        <Stack.Screen name="TranslationScreen" component={TranslationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
