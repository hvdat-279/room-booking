import { Room } from '../types';

const image = (seed: string) => `https://images.unsplash.com/photo-${seed}?auto=format&fit=crop&w=900&q=80`;

export const rooms: Room[] = [
  { id: 'a-101', name: 'Phòng thực hành mạng A101', building: 'A', capacity: 30, imageUrl: image('1517048676732-5acca8af50e5'), amenities: ['Whiteboard', 'AC', 'High-spec PC', 'Projector'] },
  { id: 'a-204', name: 'Phòng Lab Trí tuệ Nhân tạo', building: 'A', capacity: 20, imageUrl: image('1497366811353-6870744d04b2'), amenities: ['Projector', 'Whiteboard', 'AC', 'High-spec PC'] },
  { id: 'a-305', name: 'Không gian tự học Tầng 3', building: 'A', capacity: 10, imageUrl: image('1516321318423-f06f85e504b3'), amenities: ['AC'] },
  { id: 'b-110', name: 'Studio Khởi nghiệp B110', building: 'B', capacity: 15, imageUrl: image('1497366754035-f200968a6e72'), amenities: ['Projector', 'AC'] },
  { id: 'b-208', name: 'Phòng học lý thuyết B208', building: 'B', capacity: 40, imageUrl: image('1517245386807-bb43f82c33c4'), amenities: ['Projector', 'Whiteboard', 'AC'] },
  { id: 'b-402', name: 'Phòng họp nhóm nhỏ 402', building: 'B', capacity: 6, imageUrl: image('1497366216548-37526070297c'), amenities: ['Whiteboard', 'AC'] },
  { id: 'c-105', name: 'Phòng iMac Thiết kế Đồ họa', building: 'C', capacity: 30, imageUrl: image('1524758631624-e2822e304c36'), amenities: ['Projector', 'High-spec PC', 'AC'] },
  { id: 'c-212', name: 'Thư viện số C212', building: 'C', capacity: 50, imageUrl: image('1497366412874-3415097a27e7'), amenities: ['Projector', 'Whiteboard', 'AC'] },
  { id: 'c-306', name: 'Phòng bảo vệ Đồ án C306', building: 'C', capacity: 25, imageUrl: image('1497366754035-f200968a6e72'), amenities: ['High-spec PC', 'AC', 'Projector'] },
  { id: 'c-410', name: 'Khu tự học C410', building: 'C', capacity: 5, imageUrl: image('1503428593586-e225b39bddfe'), amenities: ['AC'] },
  { id: 'v-102', name: 'Hội trường Mini V102', building: 'V', capacity: 100, imageUrl: image('1556761175-b413da4baf72'), amenities: ['Projector', 'Whiteboard', 'AC'] },
  { id: 'v-203', name: 'Phòng máy Hàn Quốc V203', building: 'V', capacity: 45, imageUrl: image('1515879218367-8466d910aaa4'), amenities: ['High-spec PC', 'Whiteboard', 'AC'] },
  { id: 'v-307', name: 'Phòng học CLB V307', building: 'V', capacity: 20, imageUrl: image('1494438639946-1ebd1d20bf85'), amenities: ['AC', 'Whiteboard'] },
  { id: 'v-401', name: 'Giảng đường đa năng V401', building: 'V', capacity: 80, imageUrl: image('1517502884422-41eaead166d4'), amenities: ['Projector', 'Whiteboard', 'AC'] },
  { id: 'v-502', name: 'Khu vực Seminar V502', building: 'V', capacity: 15, imageUrl: image('1524178232363-1fb2b075b655'), amenities: ['Whiteboard', 'AC'] },
];