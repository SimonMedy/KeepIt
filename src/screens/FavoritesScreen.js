import React, { useCallback, useState } from 'react';
import { FlatList, RefreshControl, StatusBar, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { supabaseService } from '../lib/supabase';
import FloatingNavBar from '../components/FloatingNavBar';
import ErrorState from '../components/ErrorState';
import NoteCard from '../components/NoteCard';
import { useAppPreferences } from '../context/AppPreferencesContext';

export default function FavoritesScreen({ navigation }) {
  const { favoriteIds, colorScheme } = useAppPreferences();
  const [notes, setNotes] = useState(() => {
    const cachedNotes = supabaseService.getCachedNotes();
    return cachedNotes ? cachedNotes.filter((note) => favoriteIds.includes(note.id)) : [];
  });
  const [hasLoaded, setHasLoaded] = useState(() => supabaseService.getCachedNotes() !== null);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const loadFavorites = useCallback(async (refresh = false) => {
    try {
      if (refresh) setRefreshing(true);
      setError(null);
      const allNotes = await supabaseService.getNotes();
      setNotes(allNotes.filter((note) => favoriteIds.includes(note.id)));
      setHasLoaded(true);
    } catch (requestError) {
      setError(requestError.message || 'Impossible de charger les favoris.');
    } finally {
      setRefreshing(false);
    }
  }, [favoriteIds]);

  useFocusEffect(useCallback(() => { loadFavorites(); }, [loadFavorites]));

  const header = (
    <View className="mb-6 flex-row items-center">
      <View className="mr-3 h-11 w-11 items-center justify-center rounded-full bg-primary-container">
        <Ionicons name="star" size={23} color="#ffffff" />
      </View>
      <View>
        <Text className="text-3xl font-bold text-on-background dark:text-[#f7f7ff]">Favoris</Text>
        <Text className="mt-1 text-sm text-on-surface-variant dark:text-[#c7cad8]">Vos notes importantes</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-background dark:bg-[#111522]" edges={['top']}>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={colorScheme === 'dark' ? '#111522' : '#faf8ff'} />
      {error && !hasLoaded ? (
        <View className="flex-1 px-5 pt-6">{header}<ErrorState error={error} onRetry={loadFavorites} /></View>
      ) : (
        <FlatList
          className="flex-1 px-5 pt-6"
          data={notes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <NoteCard note={item} onPress={(note) => navigation.navigate('Detail', { note })} />}
          ListHeaderComponent={header}
          ListEmptyComponent={
            hasLoaded ? <View className="items-center px-8 py-20">
              <Ionicons name="star-outline" size={42} color="#6366f1" />
              <Text className="mt-4 text-xl font-semibold text-on-background dark:text-[#f7f7ff]">Aucun favori</Text>
              <Text className="mt-2 text-center text-base leading-6 text-on-surface-variant dark:text-[#c7cad8]">
                Ouvrez une note puis touchez l’étoile pour la retrouver ici.
              </Text>
            </View> : null
          }
          contentContainerStyle={{ paddingBottom: 112 }}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => loadFavorites(true)} tintColor="#6366f1" />}
          showsVerticalScrollIndicator={false}
        />
      )}
      <FloatingNavBar navigation={navigation} activeRoute="Favorites" />
    </SafeAreaView>
  );
}
