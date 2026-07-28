import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'nativewind';

const FAVORITES_KEY = '@keepit/favorite-note-ids';
const THEME_KEY = '@keepit/theme';
const AppPreferencesContext = createContext(null);

export function AppPreferencesProvider({ children }) {
  const { colorScheme, setColorScheme } = useColorScheme();
  const [favoriteIds, setFavoriteIds] = useState([]);
  const didLoadPreferences = useRef(false);

  useEffect(() => {
    if (didLoadPreferences.current) return undefined;
    didLoadPreferences.current = true;

    async function loadPreferences() {
      const [savedTheme, savedFavorites] = await Promise.all([
        AsyncStorage.getItem(THEME_KEY),
        AsyncStorage.getItem(FAVORITES_KEY),
      ]);

      if (savedTheme === 'dark' || savedTheme === 'light') setColorScheme(savedTheme);
      if (savedFavorites) setFavoriteIds(JSON.parse(savedFavorites));
    }

    loadPreferences().catch(() => {});
    return undefined;
  }, []);

  const setTheme = useCallback(
    async (theme) => {
      setColorScheme(theme);
      await AsyncStorage.setItem(THEME_KEY, theme);
    },
    [setColorScheme]
  );

  const toggleFavorite = useCallback((noteId) => {
    setFavoriteIds((current) => {
      const next = current.includes(noteId)
        ? current.filter((id) => id !== noteId)
        : [...current, noteId];
      AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(next)).catch(() => {});
      return next;
    });
  }, []);

  const clearFavorites = useCallback(async () => {
    setFavoriteIds([]);
    await AsyncStorage.removeItem(FAVORITES_KEY);
  }, []);

  const value = useMemo(
    () => ({
      colorScheme: colorScheme === 'dark' ? 'dark' : 'light',
      setTheme,
      favoriteIds,
      toggleFavorite,
      clearFavorites,
    }),
    [clearFavorites, colorScheme, favoriteIds, setTheme, toggleFavorite]
  );

  return <AppPreferencesContext.Provider value={value}>{children}</AppPreferencesContext.Provider>;
}

export function useAppPreferences() {
  const context = useContext(AppPreferencesContext);
  if (!context) throw new Error('useAppPreferences doit être utilisé dans AppPreferencesProvider.');
  return context;
}
