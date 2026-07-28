import React, { useState } from 'react';
import { ActivityIndicator, Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AddNoteForm({ onAddNote }) {
  const [title, setTitle] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim()) {
      Alert.alert('Titre requis', 'Saisissez le titre de votre note.');
      return;
    }

    try {
      setSubmitting(true);
      await onAddNote(title);
      setTitle('');
    } catch (error) {
      Alert.alert('Impossible d’ajouter la note', error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View className="mb-6 flex-row items-center rounded-3xl border border-outline-variant/60 bg-surface-lowest p-1 shadow-sm dark:border-[#3b4053] dark:bg-[#1b2034]">
      <TextInput
        className="min-w-0 flex-1 px-5 py-4 text-lg text-on-background dark:text-[#f7f7ff]"
        placeholder="Titre de la note"
        placeholderTextColor="#767586"
        value={title}
        onChangeText={setTitle}
        onSubmitEditing={handleSubmit}
        returnKeyType="done"
        editable={!submitting}
      />
      <TouchableOpacity
        className="flex-row items-center rounded-2xl bg-primary-light px-5 py-4"
        activeOpacity={0.85}
        disabled={submitting}
        onPress={handleSubmit}
      >
        {submitting ? (
          <ActivityIndicator color="#ffffff" />
        ) : (
          <>
            <Ionicons name="add" size={21} color="#ffffff" />
            <Text className="ml-2 text-base font-bold text-on-primary">Ajouter</Text>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
}
