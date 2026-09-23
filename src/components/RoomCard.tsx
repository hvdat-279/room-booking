import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { AMENITY_LABELS, Room } from '../types';

interface RoomCardProps { room: Room; status: 'Đang trống' | 'Đang sử dụng'; onPress: () => void; }

function RoomCard({ room, status, onPress }: RoomCardProps) {
  return (
    <Pressable style={({ pressed }) => [styles.card, pressed && styles.pressed]} onPress={onPress}>
      <Image source={{ uri: room.imageUrl }} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text style={styles.name}>{room.name}</Text>
          <Text style={styles.arrow}>›</Text>
        </View>
        <Text style={styles.meta}>Tòa {room.building}  ·  Tối đa {room.capacity} chỗ</Text>
        <Text style={[styles.status, status === 'Đang sử dụng' && styles.occupied]}>{status}</Text>
        <View style={styles.badges}>
          {room.amenities.map(amenity => <Text key={amenity} style={styles.badge}>{AMENITY_LABELS[amenity]}</Text>)}
        </View>
      </View>
    </Pressable>
  );
}

export default React.memo(RoomCard);

const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', borderRadius: 18, marginBottom: 14, overflow: 'hidden', borderWidth: 1, borderColor: '#e7e5e0' },
  pressed: { opacity: 0.8 },
  image: { width: '100%', height: 150, backgroundColor: '#e8e5dc' },
  content: { padding: 16 },
  titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  name: { color: '#17231f', fontSize: 18, fontWeight: '700' },
  arrow: { color: '#d66a3d', fontSize: 28, lineHeight: 24 },
  meta: { color: '#718078', fontSize: 13, marginTop: 5 },
  status: { color: '#4f8a6c', fontSize: 12, fontWeight: '800', marginTop: 10 },
  occupied: { color: '#c85c37' },
  badges: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 13 },
  badge: { backgroundColor: '#f2f3ee', borderRadius: 6, color: '#53645d', fontSize: 11, paddingHorizontal: 8, paddingVertical: 5 },
});