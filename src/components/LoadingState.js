import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

export default function LoadingState({ message = 'Chargement des notes…' }) {
  return (
    <View className="flex-1 items-center justify-center bg-background px-6 dark:bg-[#111522]">
      <ActivityIndicator size="large" color="#4648d4" />
      <Text className="mt-4 text-base text-on-surface-variant dark:text-[#c7cad8]">{message}</Text>
    </View>
  );
}
