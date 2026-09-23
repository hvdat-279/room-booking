export const AMENITIES = ['Projector', 'Whiteboard', 'High-spec PC', 'AC'] as const;
export type Amenity = (typeof AMENITIES)[number];
export const AMENITY_LABELS: Record<Amenity, string> = {
  Projector: 'Máy chiếu',
  Whiteboard: 'Bảng trắng',
  'High-spec PC': 'PC cấu hình cao',
  AC: 'Điều hòa',
};
export type Building = 'A' | 'B' | 'C' | 'V';
export type BookingStatus = 'active' | 'cancelled';

export interface UserSession {
  name: string;
  studentId: string;
}

export interface RoomFilters {
  query: string;
  building: Building | 'All';
  capacity: number | null;
  amenities: Amenity[];
}

export interface Room {
  id: string;
  name: string;
  building: Building;
  capacity: number;
  imageUrl: string;
  amenities: Amenity[];
}

export interface Booking {
  id: string;
  roomId: string;
  date: string;
  timeSlot: string;
  timestamp: number;
  status: BookingStatus;
  cancelledAt?: number;
  studentId?: string;
  studentName?: string;
  purpose?: string;
}