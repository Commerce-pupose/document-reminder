import { getSupabaseClient } from '../client';
import { authService } from './authService';

export const pushService = {
  // Convert base64 VAPID key to Uint8Array
  urlBase64ToUint8Array(base64String: string) {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  },

  async isSubscribed(): Promise<boolean> {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      return false;
    }
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();
    return !!subscription;
  },

  async subscribeUser() {
    if (!('serviceWorker' in navigator)) {
      throw new Error('Service Worker is not supported by your browser.');
    }
    if (!('PushManager' in window)) {
      throw new Error('Push Notifications are not supported by your browser.');
    }

    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      throw new Error('Permission for notifications was not granted.');
    }

    const registration = await navigator.serviceWorker.ready;
    const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
    
    if (!vapidPublicKey) {
      throw new Error('VAPID public key not found in environment.');
    }

    const convertedVapidKey = this.urlBase64ToUint8Array(vapidPublicKey);

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: convertedVapidKey,
    });

    return await this.saveSubscriptionToDatabase(subscription);
  },

  async saveSubscriptionToDatabase(subscription: PushSubscription) {
    const supabase = getSupabaseClient();
    if (!supabase) throw new Error('Supabase client not initialized');

    const user = authService.getCurrentUser();
    if (!user) throw new Error('User is not authenticated');

    const subData = JSON.parse(JSON.stringify(subscription));

    const { error } = await supabase
      .from('push_subscriptions')
      .upsert({
        user_id: user.id,
        endpoint: subData.endpoint,
        auth: subData.keys.auth,
        p256dh: subData.keys.p256dh,
      }, { onConflict: 'endpoint' });

    if (error) {
      console.error('Error saving push subscription:', error);
      throw new Error('Failed to save push subscription');
    }

    return true;
  },
  
  async unsubscribeUser() {
    if (!('serviceWorker' in navigator)) return;
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();
    
    if (subscription) {
      // Remove from database
      const supabase = getSupabaseClient();
      if (supabase) {
        await supabase
          .from('push_subscriptions')
          .delete()
          .eq('endpoint', subscription.endpoint);
      }
      
      // Unsubscribe from push manager
      await subscription.unsubscribe();
    }
  }
};
