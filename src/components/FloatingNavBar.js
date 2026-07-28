import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppPreferences } from '../context/AppPreferencesContext';

const tabs = [
  { route: 'Home', label: 'Notes', icon: 'document-text-outline', activeIcon: 'document-text' },
  { route: 'Favorites', label: 'Favoris', icon: 'star-outline', activeIcon: 'star' },
  { route: 'Settings', label: 'Réglages', icon: 'settings-outline', activeIcon: 'settings' },
];

export default function FloatingNavBar({ navigation, activeRoute }) {
  const { colorScheme } = useAppPreferences();
  const inactiveIconColor = colorScheme === 'dark' ? '#c7cad8' : '#464554';

  return (
    <View className="absolute bottom-5 left-5 right-5 flex-row items-center justify-around rounded-full border border-outline-variant/30 bg-[#fffffff2] px-2 py-2 shadow-lg dark:border-[#3b4053] dark:bg-[#1b2034ef]">
      {tabs.map((tab) => {
        const active = activeRoute === tab.route;
        return (
          <TouchableOpacity
            key={tab.route}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
            className={`min-w-[86px] items-center rounded-full px-4 py-2 ${active ? 'bg-primary-container' : ''}`}
            onPress={() => navigation.navigate(tab.route)}
          >
            <Ionicons
              name={active ? tab.activeIcon : tab.icon}
              size={21}
              color={active ? '#ffffff' : inactiveIconColor}
            />
            <Text className={`mt-1 text-xs font-semibold ${active ? 'text-on-primary' : 'text-on-surface-variant dark:text-[#c7cad8]'}`}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
