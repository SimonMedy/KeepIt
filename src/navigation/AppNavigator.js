import React, { useMemo } from 'react';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { useAppPreferences } from '../context/AppPreferencesContext';

const Stack = createNativeStackNavigator();

/**
 * Configuration de la Navigation React Navigation Stack
 * Écran 1 : Home (Liste des Notes)
 * Écran 2 : Detail (Détail de la Note)
 */
export default function AppNavigator() {
  const { colorScheme } = useAppPreferences();
  const navigationTheme = useMemo(() => {
    const baseTheme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;
    return {
      ...baseTheme,
      colors: {
        ...baseTheme.colors,
        background: colorScheme === 'dark' ? '#111522' : '#faf8ff',
        card: colorScheme === 'dark' ? '#111522' : '#faf8ff',
      },
    };
  }, [colorScheme]);

  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          animation: 'fade',
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Favorites" component={FavoritesScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Detail" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
