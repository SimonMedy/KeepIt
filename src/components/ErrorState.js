import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ErrorState({ error, onRetry }) {
  return (
    <View className="flex-1 items-center justify-center rounded-3xl bg-error-container/40 px-8 py-12">
      <Ionicons name="alert-circle-outline" size={38} color="#ba1a1a" />
      <Text className="mt-4 text-xl font-semibold text-on-background">Erreur de chargement</Text>
      <Text className="mt-2 text-center text-base leading-6 text-on-surface-variant">{error}</Text>
      <TouchableOpacity className="mt-6 rounded-2xl bg-primary px-6 py-3" onPress={onRetry}>
        <Text className="font-bold text-on-primary">Réessayer</Text>
      </TouchableOpacity>
    </View>
  );
}
