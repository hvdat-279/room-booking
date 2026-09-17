# VKU Study Room Booking

React Native and Expo SDK 57 app for discovering VKU study rooms, checking current availability, and creating local booking passes.

## Run locally

```bash
npm install
npx expo start
```

Use Expo Go for local UI testing. Local notifications are supported in Expo Go; Android remote push notifications require a development build.

## Features

- 15 rooms with building, capacity, images, and amenity metadata
- Search by room name, building, or equipment
- Building, capacity, and amenity filters persisted with Zustand
- Seven-day date picker and four discrete two-hour slots
- Conflict prevention against active local bookings
- Current `Available now` / `Occupied` status on room cards
- Booking cancellation and persisted booking history
- QR booking pass generated from booking JSON
- Local reminder notification scheduled 15 minutes before the slot
- FlatList tuning and memoized room cards for smooth scrolling

## Architecture

```text
src/
  components/     RoomCard, FilterBar, QRModal
  constants/      Mock room data
  navigation/     Typed stack and tab route params
  screens/        Home, RoomDetail, MyBookings
  store/          Persisted Zustand booking/session/filter state
  types/          Shared TypeScript models
  utils/          Notification scheduling
```

Booking writes go through `useBookingStore`. The detail screen re-checks the selected room/date/slot immediately before adding a booking. Cancelled records remain in the persisted list as booking history and no longer block availability.

## Submission checklist

- Live demo: add an Expo Snack, APK, or video link before submission.
- GitHub: publish this repository and keep the commit history focused.
- Report: complete [REPORT_TEMPLATE.md](REPORT_TEMPLATE.md), add emulator screenshots, export it as a 2-4 page PDF, and replace the placeholder student and demo links.

## Validation

```bash
npx tsc --noEmit
npx expo-doctor
```