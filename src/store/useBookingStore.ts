import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { Booking, RoomFilters, UserSession } from '../types';
import { db } from '../config/firebase';
import { collection, doc, setDoc, updateDoc, deleteDoc, onSnapshot } from 'firebase/firestore';

interface BookingState {
  activeBookings: Booking[];
  userSession: UserSession | null;
  filters: RoomFilters;
  isInitialized: boolean;
  initialize: () => void;
  updateUserSession: (session: UserSession | null) => void;
  addBooking: (booking: Booking) => Promise<void>;
  cancelBooking: (bookingId: string) => Promise<void>;
  restoreBooking: (bookingId: string) => Promise<boolean>;
  deleteBooking: (bookingId: string) => Promise<void>;
  setFilters: (filters: Partial<RoomFilters>) => void;
  checkAvailability: (roomId: string, date: string, timeSlot: string) => boolean;
}

export const useBookingStore = create<BookingState>()(
  persist(
    (set, get) => ({
      activeBookings: [],
      userSession: null,
      filters: { query: '', building: 'All', capacity: null, amenities: [] },
      isInitialized: false,

      updateUserSession: (session) => set({ userSession: session }),

      initialize: () => {
        if (get().isInitialized) return;
        
        // Listen to Firestore real-time updates
        const q = collection(db, 'bookings');
        onSnapshot(q, (snapshot) => {
          const bookings: Booking[] = [];
          snapshot.forEach((doc) => {
            bookings.push(doc.data() as Booking);
          });
          set({ activeBookings: bookings });
        }, (error) => {
          console.error("Firebase listen error:", error);
        });

        set({ isInitialized: true });
      },

      addBooking: async (booking) => {
        // Cập nhật giao diện ngay lập tức (Optimistic update)
        set(state => ({ activeBookings: [...state.activeBookings, booking] }));
        
        // Gửi lên Firestore
        await setDoc(doc(db, 'bookings', booking.id), booking);
      },
      
      cancelBooking: async (bookingId) => {
        set(state => ({
          activeBookings: state.activeBookings.map(booking =>
            booking.id === bookingId ? { ...booking, status: 'cancelled', cancelledAt: Date.now() } : booking,
          ),
        }));
        
        await updateDoc(doc(db, 'bookings', bookingId), {
          status: 'cancelled',
          cancelledAt: Date.now()
        });
      },
      
      restoreBooking: async (bookingId) => {
        const booking = get().activeBookings.find(item => item.id === bookingId);
        if (!booking || booking.status !== 'cancelled' || !booking.cancelledAt) return false;
        if (Date.now() - booking.cancelledAt > 30 * 24 * 60 * 60 * 1000) return false;
        if (!get().checkAvailability(booking.roomId, booking.date, booking.timeSlot)) return false;
        
        set(state => ({ activeBookings: state.activeBookings.map(item => item.id === bookingId ? { ...item, status: 'active', cancelledAt: undefined } : item) }));
        
        await updateDoc(doc(db, 'bookings', bookingId), {
          status: 'active',
          cancelledAt: null
        });
        
        return true;
      },
      
      deleteBooking: async (bookingId) => {
        set(state => ({ activeBookings: state.activeBookings.filter(booking => booking.id !== bookingId) }));
        await deleteDoc(doc(db, 'bookings', bookingId));
      },
      
      setFilters: filters => set(state => ({ filters: { ...state.filters, ...filters } })),
      
      checkAvailability: (roomId, date, timeSlot) => !get().activeBookings.some(
        booking => booking.roomId === roomId && booking.date === date && booking.timeSlot === timeSlot && booking.status === 'active',
      ),
    }),
    { 
      name: 'vku-bookings', 
      storage: createJSONStorage(() => AsyncStorage),
      // Vẫn lưu activeBookings vào máy để lúc mất mạng app vẫn hiện danh sách cũ
      partialize: (state) => ({ userSession: state.userSession, filters: state.filters, activeBookings: state.activeBookings })
    },
  ),
);