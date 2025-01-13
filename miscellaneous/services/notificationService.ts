import axios from 'axios';
import { Notification, NotificationType, NotificationChannel } from './notificationTypes';

class NotificationService {
  private baseUrl = '/api/notifications';

  // Fetch user notifications
  async getUserNotifications(userId: string): Promise<Notification[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch notifications', error);
      return [];
    }
  }

  // Mark notification as read
  async markAsRead(notificationId: string): Promise<boolean> {
    try {
      await axios.patch(`${this.baseUrl}/${notificationId}/read`);
      return true;
    } catch (error) {
      console.error('Failed to mark notification as read', error);
      return false;
    }
  }

  // Create a new notification
  async createNotification(
    notification: Omit<Notification, 'id' | 'timestamp' | 'isRead'>
  ): Promise<Notification | null> {
    try {
      const response = await axios.post(this.baseUrl, {
        ...notification,
        timestamp: new Date(),
        isRead: false
      });
      return response.data;
    } catch (error) {
      console.error('Failed to create notification', error);
      return null;
    }
  }

  // Subscribe to real-time notifications
  subscribeToNotifications(userId: string, callback: (notification: Notification) => void) {
    // Implement WebSocket or Server-Sent Events connection
    const eventSource = new EventSource(`${this.baseUrl}/stream/${userId}`);

    eventSource.onmessage = (event) => {
      const notification: Notification = JSON.parse(event.data);
      callback(notification);
    };

    eventSource.onerror = (error) => {
      console.error('Notification stream error', error);
      eventSource.close();
    };

    return () => eventSource.close();
  }

  // Send multi-channel notification
  async sendMultiChannelNotification(
    userId: string,
    type: NotificationType,
    message: string,
    channels: NotificationChannel[] = [NotificationChannel.IN_APP]
  ): Promise<boolean> {
    try {
      await axios.post(`${this.baseUrl}/multi-channel`, {
        userId,
        type,
        message,
        channels
      });
      return true;
    } catch (error) {
      console.error('Failed to send multi-channel notification', error);
      return false;
    }
  }
}

export default new NotificationService();
