import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

function formatDate(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const time = date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });

  if (isToday) return `Aujourd’hui, ${time}`;
  if (date.toDateString() === yesterday.toDateString()) return `Hier, ${time}`;
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function NoteCard({ note, onPress }) {
  return (
    <TouchableOpacity
      className="mb-3 flex-row items-center rounded-3xl border border-outline-variant/50 bg-surface-lowest px-5 py-6 shadow-sm dark:border-[#3b4053] dark:bg-[#1b2034]"
      activeOpacity={0.75}
      onPress={() => onPress(note)}
    >
      <View className="min-w-0 flex-1 pr-4">
        <Text className="mb-1 text-2xl font-semibold text-on-background dark:text-[#f7f7ff]" numberOfLines={1}>
          {note.title}
        </Text>
        <Text className="text-base text-on-surface-variant dark:text-[#c7cad8]">{formatDate(note.created_at)}</Text>
      </View>
      <Ionicons name="chevron-forward" size={28} color="#464554" />
    </TouchableOpacity>
  );
}
