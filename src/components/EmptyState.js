import React from 'react';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function EmptyState() {
  return (
    <View className="items-center px-8 py-20">
      <View className="mb-5 h-16 w-16 items-center justify-center rounded-full border border-outline-variant/30 bg-surface-high">
        <Ionicons name="document-text-outline" size={32} color="#4648d4" />
      </View>
      <Text className="text-center text-xl font-semibold text-on-background dark:text-[#f7f7ff]">Aucune note pour le moment</Text>
      <Text className="mt-2 text-center text-base leading-6 text-on-surface-variant dark:text-[#c7cad8]">
        Ajoutez votre première idée avec le champ ci-dessus.
      </Text>
    </View>
  );
}
