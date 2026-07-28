import React from 'react';
import './global.css';
import { View, StyleSheet, Platform, Text, ScrollView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { AppPreferencesProvider } from './src/context/AppPreferencesContext';
import { useAppPreferences } from './src/context/AppPreferencesContext';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>Application Error!</Text>
          <ScrollView style={styles.errorScroll}>
            <Text style={styles.errorText}>{this.state.error?.toString()}</Text>
            <Text style={styles.errorText}>{this.state.error?.stack}</Text>
          </ScrollView>
        </View>
      );
    }
    return this.props.children;
  }
}

/**
 * Composant racine de l'application KeepIt
 */
export default function App() {
  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <AppPreferencesProvider>
          <AppContent />
        </AppPreferencesProvider>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}

function AppContent() {
  const { colorScheme } = useAppPreferences();
  const backgroundColor = colorScheme === 'dark' ? '#111522' : '#faf8ff';

  return (
    <View style={[styles.container, { backgroundColor }]}> 
      <AppNavigator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: Platform.OS === 'web' ? '100vh' : '100%',
  },
  errorContainer: {
    flex: 1,
    backgroundColor: '#ffdad6',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#93000a',
    marginBottom: 10,
  },
  errorScroll: {
    flex: 1,
    width: '100%',
  },
  errorText: {
    fontSize: 14,
    color: '#93000a',
    marginBottom: 10,
  },
});
