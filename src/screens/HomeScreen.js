import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, RefreshControl, StatusBar, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { supabaseService } from '../lib/supabase';
import AddNoteForm from '../components/AddNoteForm';
import EmptyState from '../components/EmptyState';
import ErrorState from '../components/ErrorState';
import LoadingState from '../components/LoadingState';
import NoteCard from '../components/NoteCard';
import FloatingNavBar from '../components/FloatingNavBar';
import { useAppPreferences } from '../context/AppPreferencesContext';

/** Écran principal : lecture et ajout des notes Supabase. */
export default function HomeScreen({ navigation }) {
  const { colorScheme } = useAppPreferences();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const fetchNotes = useCallback(async (pullToRefresh = false) => {
    try {
      pullToRefresh ? setRefreshing(true) : setLoading(true);
      setError(null);
      setNotes(await supabaseService.getNotes());
    } catch (requestError) {
      setError(requestError.message || 'Impossible de charger les notes.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  // Réactualise la liste après un retour depuis le détail (ex. suppression).
  useFocusEffect(
    useCallback(() => {
      if (!loading) fetchNotes(true);
    }, [fetchNotes, loading])
  );

  const handleAddNote = async (title) => {
    await supabaseService.insertNote(title);
    await fetchNotes(true);
  };

  const listHeader = (
    <>
      <View className="mb-6 border-b border-outline-variant/20 pb-4 dark:border-[#3b4053]">
        <View className="flex-row items-center justify-between">
          <View className="h-10 w-10 items-center justify-center rounded-full bg-surface-high dark:bg-[#262d45]">
            <Ionicons name="menu" size={25} color="#4648d4" />
          </View>
          <View className="items-center">
            <Text className="text-3xl font-bold tracking-tight text-primary dark:text-[#aeb2ff]">KeepIt</Text>
            <Text className="mt-1 text-xs font-medium text-on-surface-variant dark:text-[#c7cad8]">
              Mes notes enregistrées
            </Text>
          </View>
          <View className="h-10 w-10 items-center justify-center rounded-full border border-outline-variant bg-surface-high dark:border-[#3b4053] dark:bg-[#262d45]">
            <Ionicons name="person" size={20} color="#464554" />
          </View>
        </View>
      </View>
      <AddNoteForm onAddNote={handleAddNote} />
    </>
  );

  return (
    <SafeAreaView className="flex-1 bg-background dark:bg-[#111522]" edges={['top']}>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={colorScheme === 'dark' ? '#111522' : '#faf8ff'} />
      {loading && !refreshing ? (
        <LoadingState />
      ) : error ? (
        <View className="flex-1 px-5 pt-4">
          {listHeader}
          <ErrorState error={error} onRetry={fetchNotes} />
        </View>
      ) : (
        <FlatList
          className="flex-1 px-5 pt-4"
          data={notes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <NoteCard note={item} onPress={(note) => navigation.navigate('Detail', { note })} />
          )}
          ListHeaderComponent={listHeader}
          ListEmptyComponent={<EmptyState />}
          contentContainerStyle={{ paddingBottom: 112 }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => fetchNotes(true)}
              tintColor="#4648d4"
              colors={['#4648d4']}
            />
          }
        />
      )}

      <FloatingNavBar navigation={navigation} activeRoute="Home" />
    </SafeAreaView>
  );
}
