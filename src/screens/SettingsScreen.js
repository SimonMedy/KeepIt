import React from 'react';
import { Alert, StatusBar, Switch, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import FloatingNavBar from '../components/FloatingNavBar';
import { useAppPreferences } from '../context/AppPreferencesContext';

export default function SettingsScreen({ navigation }) {
  const { colorScheme, setTheme, favoriteIds, clearFavorites } = useAppPreferences();
  const isDark = colorScheme === 'dark';

  const confirmClearFavorites = () => {
    if (!favoriteIds.length) return;
    Alert.alert('Effacer les favoris', 'Les notes ne seront pas supprimées.', [
      { text: 'Annuler', style: 'cancel' },
      { text: 'Effacer', style: 'destructive', onPress: clearFavorites },
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-background dark:bg-[#111522]" edges={['top']}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={isDark ? '#111522' : '#faf8ff'} />
      <View className="px-5 pt-6">
        <Text className="text-3xl font-bold text-on-background dark:text-[#f7f7ff]">Réglages</Text>
        <Text className="mt-1 text-sm text-on-surface-variant dark:text-[#c7cad8]">Personnalisez KeepIt</Text>

        <Text className="mb-3 mt-9 text-xs font-bold uppercase tracking-wider text-on-surface-variant dark:text-[#aeb2ff]">Apparence</Text>
        <View className="rounded-3xl border border-outline-variant/50 bg-surface-lowest p-5 dark:border-[#3b4053] dark:bg-[#1b2034]">
          <View className="flex-row items-center justify-between">
            <View className="mr-5 flex-row items-center">
              <View className="mr-3 h-11 w-11 items-center justify-center rounded-full bg-surface-high dark:bg-[#262d45]">
                <Ionicons name={isDark ? 'moon' : 'sunny'} size={22} color="#6366f1" />
              </View>
              <View>
                <Text className="text-base font-semibold text-on-background dark:text-[#f7f7ff]">Mode sombre</Text>
                <Text className="mt-1 text-sm text-on-surface-variant dark:text-[#c7cad8]">{isDark ? 'Activé' : 'Désactivé'}</Text>
              </View>
            </View>
            <Switch value={isDark} onValueChange={(value) => setTheme(value ? 'dark' : 'light')} trackColor={{ false: '#c7c4d7', true: '#6063ee' }} thumbColor="#ffffff" />
          </View>
        </View>

        <Text className="mb-3 mt-8 text-xs font-bold uppercase tracking-wider text-on-surface-variant dark:text-[#aeb2ff]">Favoris</Text>
        <TouchableOpacity className="flex-row items-center justify-between rounded-3xl border border-outline-variant/50 bg-surface-lowest p-5 dark:border-[#3b4053] dark:bg-[#1b2034]" onPress={confirmClearFavorites} disabled={!favoriteIds.length}>
          <View className="flex-row items-center">
            <View className="mr-3 h-11 w-11 items-center justify-center rounded-full bg-surface-high dark:bg-[#262d45]">
              <Ionicons name="star-outline" size={22} color="#6366f1" />
            </View>
            <View>
              <Text className="text-base font-semibold text-on-background dark:text-[#f7f7ff]">Effacer les favoris</Text>
              <Text className="mt-1 text-sm text-on-surface-variant dark:text-[#c7cad8]">{favoriteIds.length} note{favoriteIds.length > 1 ? 's' : ''} enregistrée{favoriteIds.length > 1 ? 's' : ''}</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={22} color={favoriteIds.length ? '#464554' : '#a9acb9'} />
        </TouchableOpacity>

        <Text className="mt-8 text-center text-sm leading-6 text-on-surface-variant dark:text-[#c7cad8]">KeepIt conserve vos réglages sur cet appareil.</Text>
      </View>
      <FloatingNavBar navigation={navigation} activeRoute="Settings" />
    </SafeAreaView>
  );
}
