import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import CourtBookingScreen from './src/screens/CourtBookingScreen';

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <CourtBookingScreen />
    </SafeAreaProvider>
  );
}