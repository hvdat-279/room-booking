import React, { useState } from 'react';
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useBookingStore } from '../store/useBookingStore';
import { Booking } from '../types';
import { rooms } from '../constants/mockData';

export default function MyBookingsScreen() {
  const [activeTab, setActiveTab] = useState<'active' | 'deleted'>('active');
  const activeBookings = useBookingStore(state => state.activeBookings);
  const cancelBooking = useBookingStore(state => state.cancelBooking);
  const restoreBooking = useBookingStore(state => state.restoreBooking);
  const deleteBooking = useBookingStore(state => state.deleteBooking);

  const bookings = activeBookings.filter(b => b.status === (activeTab === 'active' ? 'active' : 'cancelled')).sort((a, b) => b.timestamp - a.timestamp);

  const renderBooking = ({ item }: { item: Booking }) => {
    const room = rooms.find(r => r.id === item.roomId);
    if (!room) return null;

    const isExpired = item.cancelledAt ? (Date.now() - item.cancelledAt > 30 * 24 * 60 * 60 * 1000) : false;

    const handleRestore = () => {
      const success = restoreBooking(item.id);
      if (!success) {
        Alert.alert('Không thể khôi phục', 'Phòng trong khoảng thời gian này đã được đặt hoặc đã quá hạn khôi phục.');
      } else {
        Alert.alert('Thành công', 'Đã khôi phục phòng đặt.');
      }
    };

    const handleCancel = () => {
      Alert.alert('Xác nhận hủy', 'Bạn có chắc chắn muốn hủy phòng này?', [
        { text: 'Đóng', style: 'cancel' },
        { text: 'Hủy phòng', style: 'destructive', onPress: () => cancelBooking(item.id) },
      ]);
    };

    const handleDelete = () => {
      Alert.alert('Xóa vĩnh viễn', 'Lịch sử này sẽ bị xóa vĩnh viễn khỏi thiết bị.', [
        { text: 'Đóng', style: 'cancel' },
        { text: 'Xóa', style: 'destructive', onPress: () => deleteBooking(item.id) },
      ]);
    };

    const isOwner = item.studentId === useBookingStore.getState().userSession?.studentId;

    return (
      <View style={styles.card}>
        <Text style={styles.roomName}>{room.name} - Tòa {room.building}</Text>
        <Text style={styles.bookingTime}>Ngày: {item.date} | Giờ: {item.timeSlot}</Text>
        <Text style={styles.bookingTime}>Mục đích: {item.purpose || 'Học tập'}</Text>
        <Text style={styles.bookingTime}>Người đặt: {item.studentName} ({item.studentId})</Text>
        
        {activeTab === 'active' ? (
          isOwner ? (
            <Pressable style={styles.btnCancel} onPress={handleCancel}>
              <Text style={styles.btnTextCancel}>Hủy phòng</Text>
            </Pressable>
          ) : (
            <Text style={styles.ownerHint}>Bạn không thể hủy phòng của người khác</Text>
          )
        ) : (
          isOwner ? (
            <View style={styles.actionsRow}>
              <Pressable style={[styles.btnRestore, isExpired && styles.btnDisabled]} onPress={handleRestore} disabled={isExpired}>
                <Text style={[styles.btnTextRestore, isExpired && styles.btnTextDisabled]}>{isExpired ? 'Quá hạn khôi phục' : 'Khôi phục'}</Text>
              </Pressable>
              <Pressable style={styles.btnDelete} onPress={handleDelete}>
                <Text style={styles.btnTextDelete}>Xóa vĩnh viễn</Text>
              </Pressable>
            </View>
          ) : (
            <Text style={styles.ownerHint}>Lịch sử của người khác</Text>
          )
        )}
      </View>
    );
  };

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>Quản lý phòng đặt</Text>
      </View>
      <View style={styles.tabContainer}>
        <Pressable style={[styles.tab, activeTab === 'active' && styles.activeTab]} onPress={() => setActiveTab('active')}>
          <Text style={[styles.tabText, activeTab === 'active' && styles.activeTabText]}>Đã đặt</Text>
        </Pressable>
        <Pressable style={[styles.tab, activeTab === 'deleted' && styles.activeTab]} onPress={() => setActiveTab('deleted')}>
          <Text style={[styles.tabText, activeTab === 'deleted' && styles.activeTabText]}>Đã xóa</Text>
        </Pressable>
      </View>
      <FlatList
        data={bookings}
        keyExtractor={item => item.id}
        renderItem={renderBooking}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<Text style={styles.empty}>Không có phòng nào.</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f6f5f0' },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 18, paddingTop: 18, paddingBottom: 10 },
  headerTitle: { fontSize: 26, fontWeight: '800', color: '#17231f' },
  logoutText: { fontSize: 13, color: '#d66a3d', fontWeight: '700', textDecorationLine: 'underline' },
  tabContainer: { flexDirection: 'row', paddingHorizontal: 18, marginBottom: 16 },
  tab: { flex: 1, paddingVertical: 10, alignItems: 'center', borderBottomWidth: 2, borderBottomColor: '#e5e4dd' },
  activeTab: { borderBottomColor: '#d66a3d' },
  tabText: { fontSize: 14, fontWeight: '700', color: '#718078' },
  activeTabText: { color: '#d66a3d' },
  list: { paddingHorizontal: 18, paddingBottom: 24 },
  card: { backgroundColor: '#fff', padding: 16, borderRadius: 12, marginBottom: 12, borderWidth: 1, borderColor: '#e5e4dd' },
  roomName: { fontSize: 16, fontWeight: '800', color: '#17231f', marginBottom: 4 },
  bookingTime: { fontSize: 13, color: '#718078', marginBottom: 12 },
  actionsRow: { flexDirection: 'row', gap: 10 },
  btnCancel: { backgroundColor: '#ffe5e5', paddingVertical: 10, borderRadius: 8, alignItems: 'center' },
  btnTextCancel: { color: '#d93025', fontWeight: '700', fontSize: 13 },
  btnRestore: { flex: 1, backgroundColor: '#e5f3ec', paddingVertical: 10, borderRadius: 8, alignItems: 'center' },
  btnTextRestore: { color: '#2e7b51', fontWeight: '700', fontSize: 13 },
  btnDisabled: { backgroundColor: '#e9e9e5' },
  btnTextDisabled: { color: '#9a9e9a' },
  btnDelete: { flex: 1, backgroundColor: '#ffe5e5', paddingVertical: 10, borderRadius: 8, alignItems: 'center' },
  btnTextDelete: { color: '#d93025', fontWeight: '700', fontSize: 13 },
  ownerHint: { fontSize: 12, color: '#9ba19c', fontStyle: 'italic', marginTop: 4 },
  empty: { textAlign: 'center', color: '#718078', marginTop: 30 }
});
