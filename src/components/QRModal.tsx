import React from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { Booking, Room } from '../types';

export default function QRModal({ visible, booking, room, onClose, onViewBookings }: { visible: boolean; booking: Booking | null; room: Room; onClose: () => void; onViewBookings: () => void }) {
  if (!booking) return null;
  return <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
    <View style={styles.overlay}><View style={styles.sheet}>
      <Text style={styles.eyebrow}>XÁC NHẬN ĐẶT PHÒNG</Text>
      <Text style={styles.title}>Đặt phòng thành công</Text>
      <View style={styles.details}>
        <View style={styles.detailRow}><Text style={styles.detailLabel}>Sinh viên</Text><Text style={styles.detailValue}>{booking.studentName} - {booking.studentId}</Text></View>
        <View style={styles.detailRow}><Text style={styles.detailLabel}>Phòng</Text><Text style={styles.detailValue}>{room.name}</Text></View>
        <View style={styles.detailRow}><Text style={styles.detailLabel}>Địa điểm</Text><Text style={styles.detailValue}>Tòa {room.building} · {room.capacity} chỗ</Text></View>
        <View style={styles.detailRow}><Text style={styles.detailLabel}>Ngày</Text><Text style={styles.detailValue}>{booking.date}</Text></View>
        <View style={styles.detailRow}><Text style={styles.detailLabel}>Khung giờ</Text><Text style={styles.detailValue}>{booking.timeSlot}</Text></View>
        <View style={styles.detailRow}><Text style={styles.detailLabel}>Mã đặt</Text><Text style={styles.detailValue}>{booking.id}</Text></View>
      </View>
      <View style={styles.qr}><QRCode value={JSON.stringify(booking)} size={190} color="#17231f" backgroundColor="#fff" /></View>
      <Text style={styles.hint}>Đưa mã này cho nhân viên khi bạn đến</Text>
      <Pressable style={styles.secondary} onPress={onViewBookings}><Text style={styles.secondaryText}>Xem phòng đã đặt</Text></Pressable>
      <Pressable style={styles.close} onPress={onClose}><Text style={styles.closeText}>Đóng</Text></Pressable>
    </View></View>
  </Modal>;
}

const styles = StyleSheet.create({
  overlay: { alignItems: 'center', backgroundColor: 'rgba(23,35,31,0.65)', flex: 1, justifyContent: 'center', padding: 24 },
  sheet: { alignItems: 'center', backgroundColor: '#fff', borderRadius: 24, padding: 26, width: '100%' },
  eyebrow: { color: '#d66a3d', fontSize: 11, fontWeight: '800', letterSpacing: 1.5 },
  title: { color: '#17231f', fontSize: 28, fontWeight: '800', marginTop: 8 },
  subtitle: { color: '#718078', fontSize: 13, marginTop: 7, textAlign: 'center' },
  details: { backgroundColor: '#f6f5f0', borderRadius: 14, marginTop: 18, padding: 13, width: '100%' },
  detailRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4 },
  detailLabel: { color: '#718078', fontSize: 12 },
  detailValue: { color: '#17231f', flex: 1, fontSize: 12, fontWeight: '700', marginLeft: 14, textAlign: 'right' },
  qr: { borderColor: '#ecebe6', borderRadius: 14, borderWidth: 1, marginTop: 22, padding: 14 },
  hint: { color: '#718078', fontSize: 12, marginTop: 14 },
  secondary: { borderColor: '#d8ddd8', borderRadius: 13, borderWidth: 1, marginTop: 16, paddingVertical: 13, width: '100%' },
  secondaryText: { color: '#17231f', fontSize: 14, fontWeight: '700', textAlign: 'center' },
  close: { alignItems: 'center', backgroundColor: '#17231f', borderRadius: 13, marginTop: 20, paddingVertical: 14, width: '100%' },
  closeText: { color: '#fff', fontSize: 15, fontWeight: '700' },
});