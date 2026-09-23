import { Platform } from 'react-native';
import Constants from 'expo-constants';

export async function scheduleBookingNotification(
  bookingDate: string,
  startTimeSlot: string,
  roomName: string,
): Promise<string | null> {
  const [hours, minutes] = startTimeSlot.split('-')[0].split(':').map(Number);
  const startDate = new Date(`${bookingDate}T00:00:00`);
  startDate.setHours(hours, minutes, 0, 0);
  const reminderDate = new Date(startDate.getTime() - 15 * 60 * 1000);

  if (reminderDate.getTime() <= Date.now()) return null;

  // Expo Go Android does not expose the notifications native API. The booking itself must still succeed.
  const appOwnership = (Constants as typeof Constants & { appOwnership?: string }).appOwnership;
  const executionEnvironment = (Constants as typeof Constants & { executionEnvironment?: string }).executionEnvironment;
  if (appOwnership === 'expo' || executionEnvironment === 'storeClient') return null;

  try {
    const Notifications = await import('expo-notifications');

    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldPlaySound: true,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true,
      }),
    });

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('booking-reminders', {
        name: 'Nhắc lịch đặt phòng',
        importance: Notifications.AndroidImportance.DEFAULT,
      });
    }

    const permission = await Notifications.requestPermissionsAsync();
    if (!permission.granted) return null;

    return await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Nhắc lịch học',
        body: `Phòng ${roomName} sẽ bắt đầu sau 15 phút.`,
        data: { bookingDate, startTimeSlot, roomName },
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DATE,
        date: reminderDate,
        channelId: Platform.OS === 'android' ? 'booking-reminders' : undefined,
      },
    });
  } catch {
    return null;
  }
}