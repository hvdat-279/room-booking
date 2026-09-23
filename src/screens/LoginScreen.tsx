import React, { useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useBookingStore } from '../store/useBookingStore';

export default function LoginScreen() {
  const [name, setName] = useState('');
  const [studentId, setStudentId] = useState('');
  const updateUserSession = useBookingStore(state => state.updateUserSession);

  const handleLogin = () => {
    if (name.trim() && studentId.trim()) {
      updateUserSession({ name: name.trim(), studentId: studentId.trim().toUpperCase() });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardView}>
        <View style={styles.content}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=400&q=80' }} 
            style={styles.heroImage} 
          />
          <View style={styles.header}>
            <Text style={styles.kicker}>VKU ROOM BOOKING</Text>
            <Text style={styles.title}>Đăng nhập hệ thống</Text>
            <Text style={styles.subtitle}>Điền thông tin của bạn để bắt đầu đặt phòng tự động.</Text>
          </View>
          
          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Họ và tên</Text>
              <TextInput
                style={styles.input}
                placeholder="VD: Nguyễn Văn A"
                placeholderTextColor="#9ba19c"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Mã sinh viên</Text>
              <TextInput
                style={styles.input}
                placeholder="VD: 22IT000"
                placeholderTextColor="#9ba19c"
                value={studentId}
                onChangeText={setStudentId}
                autoCapitalize="characters"
              />
            </View>
          </View>

          <Pressable 
            style={({ pressed }) => [styles.btn, (!name.trim() || !studentId.trim()) && styles.disabled, pressed && styles.pressed]} 
            onPress={handleLogin}
            disabled={!name.trim() || !studentId.trim()}
          >
            <Text style={styles.btnText}>Vào ứng dụng ➔</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f6f5f0' },
  keyboardView: { flex: 1 },
  content: { flex: 1, padding: 24, justifyContent: 'center' },
  heroImage: { width: 100, height: 100, borderRadius: 24, marginBottom: 32 },
  header: { marginBottom: 32 },
  kicker: { color: '#d66a3d', fontSize: 12, fontWeight: '800', letterSpacing: 1.5, marginBottom: 8 },
  title: { color: '#17231f', fontSize: 32, fontWeight: '900', marginBottom: 12 },
  subtitle: { color: '#718078', fontSize: 15, lineHeight: 22 },
  form: { gap: 20, marginBottom: 40 },
  inputGroup: { gap: 8 },
  label: { color: '#17231f', fontSize: 14, fontWeight: '700' },
  input: { backgroundColor: '#fff', borderColor: '#e3e2db', borderWidth: 1, borderRadius: 16, padding: 18, fontSize: 16, color: '#17231f' },
  btn: { alignItems: 'center', backgroundColor: '#17231f', borderRadius: 16, paddingVertical: 18, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 12, elevation: 2 },
  disabled: { opacity: 0.4 },
  pressed: { transform: [{ scale: 0.98 }] },
  btnText: { color: '#fff', fontSize: 16, fontWeight: '800' },
});
