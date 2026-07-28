import React, { useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { supabaseService } from '../lib/supabase';
import { useAppPreferences } from '../context/AppPreferencesContext';

function formatFullDate(dateString) {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function DetailScreen({ route, navigation }) {
  const { note: initialNote } = route.params || {};
  const { colorScheme, favoriteIds, toggleFavorite } = useAppPreferences();
  const [note, setNote] = useState(initialNote);
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(initialNote?.title || '');
  const [content, setContent] = useState(initialNote?.content || '');
  const [saving, setSaving] = useState(false);

  if (!note) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-background px-6 dark:bg-[#111522]">
        <Text className="text-lg text-on-background dark:text-[#f7f7ff]">Aucune note sélectionnée.</Text>
      </SafeAreaView>
    );
  }

  const isFavorite = favoriteIds.includes(note.id);

  const saveNote = async () => {
    try {
      setSaving(true);
      const updatedNote = await supabaseService.updateNote(note.id, title, content);
      setNote(updatedNote);
      setEditing(false);
    } catch (error) {
      Alert.alert('Impossible d’enregistrer', error.message);
    } finally {
      setSaving(false);
    }
  };

  const cancelEdition = () => {
    setTitle(note.title);
    setContent(note.content || '');
    setEditing(false);
  };

  const deleteNote = () => {
    Alert.alert('Supprimer la note', 'Cette action est définitive.', [
      { text: 'Annuler', style: 'cancel' },
      {
        text: 'Supprimer',
        style: 'destructive',
        onPress: async () => {
          try {
            await supabaseService.deleteNote(note.id);
            navigation.goBack();
          } catch (error) {
            Alert.alert('Erreur', error.message || 'La note n’a pas pu être supprimée.');
          }
        },
      },
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-background dark:bg-[#111522]" edges={['top']}>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={colorScheme === 'dark' ? '#111522' : '#faf8ff'} />
      <View className="flex-row items-center justify-between px-5 py-4">
        <TouchableOpacity className="flex-row items-center rounded-lg px-1 py-2" onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color="#6366f1" />
          <Text className="ml-1 text-sm font-bold text-primary dark:text-[#aeb2ff]">Retour</Text>
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-on-background dark:text-[#f7f7ff]">Détail de la note</Text>
        <View className="flex-row items-center">
          <TouchableOpacity className="rounded-full p-2" onPress={() => toggleFavorite(note.id)} accessibilityLabel="Ajouter aux favoris">
            <Ionicons name={isFavorite ? 'star' : 'star-outline'} size={21} color={isFavorite ? '#6366f1' : '#767586'} />
          </TouchableOpacity>
          <TouchableOpacity className="rounded-full p-2" onPress={deleteNote} accessibilityLabel="Supprimer la note">
            <Ionicons name="trash-outline" size={21} color="#ba1a1a" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1 px-5" contentContainerStyle={{ paddingTop: 34, paddingBottom: 40 }} keyboardShouldPersistTaps="handled">
        <View className="mb-6">
          {editing ? (
            <TextInput
              className="rounded-2xl border border-primary bg-surface-lowest px-4 py-3 text-3xl font-bold text-on-background dark:bg-[#1b2034] dark:text-[#f7f7ff]"
              value={title}
              onChangeText={setTitle}
              placeholder="Titre de la note"
              placeholderTextColor="#767586"
            />
          ) : (
            <Text className="text-4xl font-bold leading-tight text-on-background dark:text-[#f7f7ff]">{note.title}</Text>
          )}
          <View className="mt-4 flex-row flex-wrap">
            <View className="flex-row items-center rounded-full bg-surface-high px-3 py-2 dark:bg-[#262d45]">
              <Ionicons name="calendar-outline" size={15} color="#9fa6bc" />
              <Text className="ml-2 text-sm text-on-surface-variant dark:text-[#c7cad8]">Créé le {formatFullDate(note.created_at)}</Text>
            </View>
            {isFavorite && (
              <View className="ml-2 flex-row items-center rounded-full bg-primary-container px-3 py-2">
                <Ionicons name="star" size={14} color="#ffffff" />
                <Text className="ml-1 text-sm font-semibold text-on-primary">Favori</Text>
              </View>
            )}
          </View>
        </View>

        <View className="rounded-3xl border border-outline-variant bg-surface-lowest p-6 shadow-sm dark:border-[#3b4053] dark:bg-[#1b2034]">
          {editing ? (
            <TextInput
              className="min-h-[260px] text-lg leading-8 text-on-surface dark:text-[#f7f7ff]"
              value={content}
              onChangeText={setContent}
              placeholder="Écrivez le contenu de votre note…"
              placeholderTextColor="#8a90a6"
              multiline
              textAlignVertical="top"
            />
          ) : (
            <Text className="text-lg leading-8 text-on-surface dark:text-[#f7f7ff]">
              {note.content?.trim() || 'Aucun contenu. Appuyez sur Modifier pour écrire dans cette note.'}
            </Text>
          )}
        </View>

        <View className="mt-5 flex-row justify-end">
          {editing ? (
            <>
              <TouchableOpacity className="mr-3 rounded-2xl border border-outline-variant px-5 py-3 dark:border-[#50566d]" onPress={cancelEdition} disabled={saving}>
                <Text className="font-semibold text-on-surface dark:text-[#f7f7ff]">Annuler</Text>
              </TouchableOpacity>
              <TouchableOpacity className="flex-row items-center rounded-2xl bg-primary px-5 py-3" onPress={saveNote} disabled={saving}>
                {saving ? <ActivityIndicator color="#ffffff" /> : <Ionicons name="checkmark" size={20} color="#ffffff" />}
                <Text className="ml-2 font-bold text-on-primary">Enregistrer</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity className="flex-row items-center rounded-2xl bg-primary px-5 py-3" onPress={() => setEditing(true)}>
              <Ionicons name="create-outline" size={20} color="#ffffff" />
              <Text className="ml-2 font-bold text-on-primary">Modifier</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
