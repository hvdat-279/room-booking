# VKU Study Room Booking

Ứng dụng React Native và Expo SDK 57 giúp sinh viên VKU tìm kiếm, kiểm tra và đặt phòng học nhóm.

## Chạy dự án

```powershell
cd D:\2_baitap\FL\vku-room-booking
npm install
npx expo start --lan --clear --port 8083
```

Điện thoại và máy tính cần cùng mạng. Nếu Wi-Fi trường chặn kết nối giữa các thiết bị, hãy dùng hotspot điện thoại hoặc chạy trên web:

```powershell
npx expo start --web
```

Quét QR mới hiển thị trong Terminal bằng Expo Go. Không quét QR cũ hoặc địa chỉ `127.0.0.1` trên điện thoại.

## Kiểm tra chất lượng

```powershell
npx tsc --noEmit
npx expo-doctor
npx expo export --platform android --no-bytecode --clear
```

## Chức năng

- Hiển thị 15 phòng với ảnh, tòa nhà, sức chứa và thiết bị.
- Tìm kiếm theo tên phòng, tòa nhà hoặc thiết bị.
- Lọc theo tòa A/B/C/V, sức chứa và tiện ích.
- Lưu booking, bộ lọc và phiên sinh viên mẫu bằng Zustand + AsyncStorage.
- Chọn ngày trong 7 ngày và bốn khung giờ 2 tiếng.
- Vô hiệu hóa khung giờ đã có người đặt và kiểm tra lại trước khi lưu.
- Hiển thị trạng thái phòng, hủy booking và lưu lịch sử.
- Hiển thị đầy đủ thông tin đặt phòng kèm QR booking pass.
- FlatList tối ưu với `React.memo` và các cấu hình render phù hợp.
- Nhắc lịch local trước 15 phút trong development build.

## Lưu ý về thông báo

Android Expo Go từ SDK 53 không cung cấp native notification API. App không lấy Push Token. Trên Expo Go, luồng đặt phòng và QR vẫn hoạt động; muốn kiểm thử notification cần dùng Expo development build.

## Cấu trúc thư mục

```text
src/
  components/     RoomCard, FilterBar, QRModal
  constants/      Dữ liệu mẫu 15 phòng
  navigation/     Kiểu route Stack và Bottom Tab
  screens/        Home, RoomDetail, MyBookings
  store/          Zustand store có persist
  types/          Kiểu dữ liệu dùng chung
  utils/          Lập lịch notification
baocao/           Mẫu báo cáo, bị loại khỏi Git
```

## Nộp bài

- GitHub: https://github.com/hvdat-279/room-booking
- Demo: bổ sung link Expo Snack, APK hoặc video 2-3 phút.
- Báo cáo: hoàn thiện `baocao/REPORT_TEMPLATE.md`, thêm 3-4 ảnh thật và xuất PDF 2-4 trang. Thư mục `baocao/` được ignore và không đẩy lên Git.

## Giới hạn hiện tại

Dữ liệu booking hiện lưu cục bộ trên thiết bị, chưa đồng bộ giữa nhiều người dùng. Để có real-time thật, cần thêm Firebase hoặc Supabase, đăng nhập sinh viên và backend quản lý phòng.