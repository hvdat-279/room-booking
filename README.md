# VKU Study Room Booking (Real-time)

Ứng dụng React Native (Expo SDK 57) hỗ trợ sinh viên ĐH Công nghệ Thông tin và Truyền thông Việt - Hàn (VKU) tìm kiếm, đặt phòng học nhóm và check-in bằng mã QR. 

Dự án đã được nâng cấp với **Firebase Firestore** để đồng bộ dữ liệu thời gian thực.

## 🚀 Live Demo
- **Web Demo (Cloudflare Pages):** [Chèn link https://...pages.dev của bạn vào đây]
- **Video Demo:** [Chèn link YouTube của bạn vào đây]

## 🛠 Cài đặt & Chạy dự án

```bash
# Clone dự án
git clone https://github.com/hvdat-279/room-booking.git
cd room-booking

# Cài đặt thư viện
npm install

# Khởi chạy trên Web (Khuyên dùng để test nhanh)
npx expo start --web

# Khởi chạy trên điện thoại (Cần tải app Expo Go)
npx expo start
```
*Lưu ý: Nếu chạy trên điện thoại, máy tính và điện thoại phải kết nối cùng 1 mạng Wi-Fi.*

## ✨ Tính năng nổi bật

1. **Đăng nhập & Quản lý Hồ sơ:**
   - Màn hình đăng nhập toàn màn hình yêu cầu Tên & Mã sinh viên.
   - Tab "Hồ sơ" riêng biệt để xem thông tin và đổi tài khoản.
2. **Khám phá & Bộ lọc:**
   - Hiển thị 15 phòng học quen thuộc tại VKU (Tòa A, B, C, V).
   - Tối ưu hiệu năng hiển thị danh sách với `FlatList`.
   - Lọc tức thì theo Tòa nhà, Sức chứa và Tiện ích.
3. **Đặt lịch & Chống trùng (Real-time):**
   - Lưu trữ toàn bộ dữ liệu qua **Firebase Firestore**.
   - Khung giờ đã được người khác đặt sẽ bị khóa (màu xám) ngay lập tức trên mọi thiết bị.
   - Nhập "Mục đích sử dụng" trước khi đặt phòng.
4. **Mã QR Check-in:**
   - Tự động sinh mã QR chứa dữ liệu (JSON) cho từng lượt đặt.
   - Dùng để xuất trình cùng Thẻ sinh viên thật trước khi vào phòng (Giải pháp chống Fake Identity).
5. **Phân quyền người dùng:**
   - Người dùng chỉ có quyền Hủy phòng do chính mình tạo ra.
   - Chặn quyền thao tác trên lịch sử phòng của người khác.

## 📁 Cấu trúc thư mục

```text
src/
  components/     Chứa các UI Components (RoomCard, FilterBar, QRModal...)
  config/         Cấu hình kết nối Firebase
  constants/      Dữ liệu mẫu (15 phòng học)
  navigation/     Cấu hình Stack & Bottom Tabs
  screens/        Giao diện chính (Login, Home, RoomDetail, MyBookings, Profile)
  store/          Quản lý State toàn cục bằng Zustand
  types/          Định nghĩa Interface Typescript
```

## 🧑‍💻 Tác giả
- [Tên của bạn] - [MSSV] - VKU