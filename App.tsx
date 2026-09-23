import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React, { useEffect } from 'react';
import HomeScreen from './src/screens/HomeScreen';
import MyBookingsScreen from './src/screens/MyBookingsScreen';
import RoomDetailScreen from './src/screens/RoomDetailScreen';
import LoginScreen from './src/screens/LoginScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import { MainTabParamList, RootStackParamList } from './src/navigation/types';
import { useBookingStore } from './src/store/useBookingStore';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tabs = createBottomTabNavigator<MainTabParamList>();

function MainTabs() {
  return <Tabs.Navigator screenOptions={{ headerShown: false, tabBarActiveTintColor: '#d66a3d', tabBarInactiveTintColor: '#8c938e', tabBarStyle: { backgroundColor: '#fff', borderTopColor: '#e5e4dd', height: 68, paddingBottom: 10, paddingTop: 8 }, tabBarLabelStyle: { fontSize: 11, fontWeight: '700' } }}>
    <Tabs.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: 'Khám phá', tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>⌂</Text> }} />
    <Tabs.Screen name="My Bookings" component={MyBookingsScreen} options={{ tabBarLabel: 'Đã đặt', tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>▣</Text> }} />
    <Tabs.Screen name="Profile" component={ProfileScreen} options={{ tabBarLabel: 'Hồ sơ', tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>👤</Text> }} />
  </Tabs.Navigator>;
}

export default function App() {
  const { initialize, userSession } = useBookingStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="dark" />
        <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
          {!userSession ? (
            <Stack.Screen name="Login" component={LoginScreen} />
          ) : (
            <>
              <Stack.Screen name="MainTabs" component={MainTabs} />
              <Stack.Screen name="RoomDetail" component={RoomDetailScreen} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
