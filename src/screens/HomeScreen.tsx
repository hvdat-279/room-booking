import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import FilterBar from '../components/FilterBar';
import RoomCard from '../components/RoomCard';
import { rooms } from '../constants/mockData';
import { MainTabParamList, RootStackParamList } from '../navigation/types';
import { Amenity, Building } from '../types';
import { useBookingStore } from '../store/useBookingStore';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

type HomeNavigation = CompositeNavigationProp<BottomTabNavigationProp<MainTabParamList, 'Home'>, NativeStackNavigationProp<RootStackParamList>>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeNavigation>();
  const { activeBookings, filters, setFilters, isInitialized, userSession } = useBookingStore();
  const [clock, setClock] = useState(() => new Date());
  useEffect(() => { const timer = setInterval(() => setClock(new Date()), 30000); return () => clearInterval(timer); }, []);
  const { query = '', building = 'All', capacity = null, amenities = [] } = filters || {};
  const filteredRooms = useMemo(() => rooms.filter(room =>
    (query.trim() === '' || `${room.name} ${room.building} ${room.amenities.join(' ')}`.toLowerCase().includes(query.trim().toLowerCase())) &&
    (building === 'All' || room.building === building) &&
    (capacity === null || room.capacity >= capacity) &&
    (amenities.length === 0 || amenities.every(a => room.amenities.includes(a))),
  ), [amenities, building, capacity, query]);
  const currentDate = clock.toISOString().slice(0, 10);
  const currentTime = clock.getHours() * 60 + clock.getMinutes();
  const currentSlot = [['07:30-09:30', 450, 570], ['09:30-11:30', 570, 690], ['13:00-15:00', 780, 900], ['15:00-17:00', 900, 1020]].find(([, start, end]) => currentTime >= Number(start) && currentTime < Number(end))?.[0];
  const getStatus = (roomId: string) => currentSlot && activeBookings.some(booking => booking.roomId === roomId && booking.date === currentDate && booking.timeSlot === currentSlot && booking.status === 'active') ? 'Đang sử dụng' as const : 'Đang trống' as const;

  return <SafeAreaView edges={['top', 'left', 'right']} style={styles.container}>
    {!isInitialized ? (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#d66a3d" />
        <Text style={styles.loadingText}>Đang đồng bộ dữ liệu...</Text>
      </View>
    ) : (
      <FlatList
        data={filteredRooms}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <RoomCard room={item} status={getStatus(item.id)} onPress={() => navigation.navigate('RoomDetail', { roomId: item.id })} />}
        contentContainerStyle={styles.content}
        ListHeaderComponent={<View style={styles.header}><Text style={styles.kicker}>KHÔNG GIAN HỌC TẬP VKU</Text><Text style={styles.title}>Đặt phòng cho buổi học tập trung.</Text><Text style={styles.subtitle}>{filteredRooms.length} phòng sẵn sàng cho buổi học tiếp theo</Text><FilterBar query={query} building={building} capacity={capacity} amenities={amenities} onQueryChange={value => setFilters({ query: value })} onBuildingChange={value => setFilters({ building: value })} onCapacityChange={value => setFilters({ capacity: value })} onAmenitiesChange={value => setFilters({ amenities: value })} /></View>}
        stickyHeaderIndices={[0]}
        initialNumToRender={8}
        maxToRenderPerBatch={5}
        windowSize={5}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<Text style={styles.empty}>Không có phòng phù hợp với bộ lọc.</Text>}
      />
    )}
  </SafeAreaView>;
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#f6f5f0', flex: 1 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 12, color: '#718078', fontWeight: '600', fontSize: 14 },
  content: { paddingBottom: 24, paddingHorizontal: 18 },
  header: { backgroundColor: '#f6f5f0', paddingTop: 18 },
  kicker: { color: '#d66a3d', fontSize: 11, fontWeight: '800', letterSpacing: 1.4 },
  title: { color: '#17231f', fontSize: 30, fontWeight: '800', lineHeight: 35, marginTop: 7, maxWidth: 320 },
  subtitle: { color: '#718078', fontSize: 14, marginBottom: 21, marginTop: 8 },
  empty: { color: '#718078', paddingTop: 30, textAlign: 'center' },
});