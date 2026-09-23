import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useBookingStore } from '../store/useBookingStore';

export default function ProfileScreen() {
  const userSession = useBookingStore(state => state.userSession);
  const updateUserSession = useBookingStore(state => state.updateUserSession);

  if (!userSession) return null;

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Hồ sơ của bạn</Text>
      </View>
      
      <View style={styles.content}>
        <View style={styles.card}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{userSession.name.charAt(0).toUpperCase()}</Text>
          </View>
          <Text style={styles.name}>{userSession.name}</Text>
          <Text style={styles.studentId}>{userSession.studentId}</Text>
          
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Sinh viên VKU</Text>
          </View>
        </View>

        <Pressable style={styles.logoutBtn} onPress={() => updateUserSession(null)}>
          <Text style={styles.logoutBtnText}>Đăng xuất / Đổi tài khoản</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f6f5f0' },
  header: { paddingHorizontal: 18, paddingTop: 18, paddingBottom: 10 },
  headerTitle: { fontSize: 26, fontWeight: '800', color: '#17231f' },
  content: { padding: 18 },
  card: { backgroundColor: '#fff', borderRadius: 20, padding: 30, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 2 },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#d66a3d', justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  avatarText: { fontSize: 36, fontWeight: '800', color: '#fff' },
  name: { fontSize: 22, fontWeight: '800', color: '#17231f', marginBottom: 4 },
  studentId: { fontSize: 15, color: '#718078', fontWeight: '600', marginBottom: 16 },
  badge: { backgroundColor: '#e5f3ec', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 },
  badgeText: { color: '#2e7b51', fontSize: 12, fontWeight: '700' },
  logoutBtn: { marginTop: 24, backgroundColor: '#ffe5e5', borderRadius: 16, paddingVertical: 16, alignItems: 'center' },
  logoutBtnText: { color: '#d93025', fontSize: 15, fontWeight: '800' }
});
