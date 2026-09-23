import React, { useMemo, useState } from 'react';
import { Alert, Image, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

// ... (skipping to the render part in next replace)
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import QRModal from '../components/QRModal';
import { rooms } from '../constants/mockData';
import { RootStackParamList } from '../navigation/types';
import { useBookingStore } from '../store/useBookingStore';
import { AMENITY_LABELS, Booking } from '../types';
import { scheduleBookingNotification } from '../utils/notifications';

type Props = NativeStackScreenProps<RootStackParamList, 'RoomDetail'>;
const timeSlots = ['07:30-09:30', '09:30-11:30', '13:00-15:00', '15:00-17:00'];

function formatDate(date: Date) { return date.toISOString().slice(0, 10); }
function makeDates() { return Array.from({ length: 7 }, (_, index) => { const date = new Date(); date.setHours(0, 0, 0, 0); date.setDate(date.getDate() + index); return date; }); }

export default function RoomDetailScreen({ route, navigation }: Props) {
  const room = rooms.find(item => item.id === route.params.roomId) ?? rooms[0];
  const dates = useMemo(makeDates, []);
  const [selectedDate, setSelectedDate] = useState(formatDate(dates[0]));
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [purpose, setPurpose] = useState('');
  const [pass, setPass] = useState<Booking | null>(null);
  const addBooking = useBookingStore(state => state.addBooking);
  const checkAvailability = useBookingStore(state => state.checkAvailability);

  const bookSelectedSlot = async () => {
    if (!selectedSlot) return;
    if (!checkAvailability(room.id, selectedDate, selectedSlot)) {
      Alert.alert('Khung giờ vừa được đặt', 'Vui lòng chọn khung giờ khác.');
      return;
    }
    const userSession = useBookingStore.getState().userSession;
    const booking: Booking = { 
      id: `booking-${Date.now()}`, 
      roomId: room.id, 
      date: selectedDate, 
      timeSlot: selectedSlot, 
      timestamp: Date.now(), 
      status: 'active',
      studentId: userSession?.studentId,
      studentName: userSession?.name,
      purpose: purpose.trim() || 'Học tập'
    };
    addBooking(booking);
    await scheduleBookingNotification(selectedDate, selectedSlot, room.name);
    setPass(booking);
  };

  return <SafeAreaView edges={['top', 'left', 'right']} style={styles.container}><KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardView}><ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
    <Pressable onPress={() => navigation.goBack()}><Text style={styles.back}>‹  Tất cả phòng</Text></Pressable>
    <Image source={{ uri: room.imageUrl }} style={styles.image} />
    <Text style={styles.kicker}>TÒA {room.building}</Text><Text style={styles.title}>{room.name}</Text>
    <Text style={styles.meta}>Tối đa {room.capacity} người  ·  {room.amenities.map(amenity => AMENITY_LABELS[amenity]).join('  ·  ')}</Text>
    <View style={styles.section}><Text style={styles.sectionTitle}>Chọn ngày</Text><ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.dateRow}>
      {dates.map(date => { const value = formatDate(date); const selected = selectedDate === value; return <Pressable key={value} onPress={() => { setSelectedDate(value); setSelectedSlot(null); }} style={[styles.date, selected && styles.selectedDate]}><Text style={[styles.day, selected && styles.selectedText]}>{date.toLocaleDateString('vi-VN', { weekday: 'short' })}</Text><Text style={[styles.dateNumber, selected && styles.selectedText]}>{date.getDate()}</Text></Pressable>; })}
    </ScrollView></View>
    <View style={styles.section}><Text style={styles.sectionTitle}>Chọn khung giờ 2 tiếng</Text>{timeSlots.map(slot => { const available = checkAvailability(room.id, selectedDate, slot); const selected = selectedSlot === slot; return <Pressable key={slot} disabled={!available} onPress={() => setSelectedSlot(slot)} style={[styles.slot, !available && styles.occupied, selected && styles.selectedSlot]}><Text style={[styles.slotText, !available && styles.occupiedText, selected && styles.selectedText]}>{slot}</Text><Text style={[styles.slotStatus, !available && styles.occupiedText, selected && styles.selectedText]}>{available ? 'Còn trống' : 'Đã có người đặt'}</Text></Pressable>; })}</View>
    <View style={styles.section}><Text style={styles.sectionTitle}>Mục đích sử dụng</Text><TextInput style={styles.input} placeholder="VD: Học nhóm, Họp câu lạc bộ..." placeholderTextColor="#9ba19c" value={purpose} onChangeText={setPurpose} /></View>
  </ScrollView></KeyboardAvoidingView><View style={styles.footer}><Pressable disabled={!selectedSlot} onPress={bookSelectedSlot} style={[styles.book, !selectedSlot && styles.disabled]}><Text style={styles.bookText}>Đặt phòng</Text></Pressable></View><QRModal visible={Boolean(pass)} booking={pass} room={room} onClose={() => { setPass(null); navigation.goBack(); }} onViewBookings={() => { setPass(null); navigation.navigate('MainTabs', { screen: 'My Bookings' }); }} /></SafeAreaView>;
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#f6f5f0', flex: 1 }, scroll: { padding: 18, paddingBottom: 110 },
  keyboardView: { flex: 1 },
  input: { backgroundColor: '#fff', borderColor: '#e2e1da', borderWidth: 1, borderRadius: 13, padding: 16, fontSize: 15, color: '#17231f', marginTop: 8 },
  back: { color: '#53645d', fontSize: 14, fontWeight: '700', marginBottom: 15 },
  image: { borderRadius: 20, height: 210, width: '100%' }, kicker: { color: '#d66a3d', fontSize: 11, fontWeight: '800', letterSpacing: 1.3, marginTop: 22 },
  title: { color: '#17231f', fontSize: 29, fontWeight: '800', marginTop: 6 }, meta: { color: '#718078', fontSize: 13, lineHeight: 20, marginTop: 7 },
  section: { marginTop: 27 }, sectionTitle: { color: '#17231f', fontSize: 17, fontWeight: '800', marginBottom: 12 }, dateRow: { gap: 9 },
  date: { alignItems: 'center', backgroundColor: '#fff', borderColor: '#e2e1da', borderRadius: 13, borderWidth: 1, minWidth: 58, paddingVertical: 10 }, selectedDate: { backgroundColor: '#17231f', borderColor: '#17231f' }, day: { color: '#718078', fontSize: 11, fontWeight: '700' }, dateNumber: { color: '#17231f', fontSize: 20, fontWeight: '800', marginTop: 4 }, selectedText: { color: '#fff' },
  slot: { alignItems: 'center', backgroundColor: '#fff', borderColor: '#e2e1da', borderRadius: 13, borderWidth: 1, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 9, padding: 16 }, selectedSlot: { backgroundColor: '#d66a3d', borderColor: '#d66a3d' }, occupied: { backgroundColor: '#e9e9e5', borderColor: '#e9e9e5' }, slotText: { color: '#17231f', fontSize: 15, fontWeight: '700' }, slotStatus: { color: '#4f8a6c', fontSize: 12, fontWeight: '700' }, occupiedText: { color: '#9a9e9a' },
  footer: { backgroundColor: '#f6f5f0', borderTopColor: '#e3e2db', borderTopWidth: 1, bottom: 0, left: 0, padding: 18, position: 'absolute', right: 0 }, book: { alignItems: 'center', backgroundColor: '#17231f', borderRadius: 14, paddingVertical: 16 }, disabled: { opacity: 0.35 }, bookText: { color: '#fff', fontSize: 16, fontWeight: '800' },
});