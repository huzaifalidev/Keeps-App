import { initializeApp } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { Platform } from 'react-native';

const firebaseConfig = {
  apiKey: "AIzaSyA08RPLvADbAcAxumAX7yC3FqZVf5ly3sA",
  projectId: "taskmate-notifications",
  storageBucket: "taskmate-notifications.firebasestorage.app",
  messagingSenderId: "712773562631",
  appId: "1:712773562631:android:06ad78e6506b3d22fdd5a2"
};

const app = initializeApp(firebaseConfig);

// Custom analytics logger for React Native
const logAnalyticsEvent = async (eventName, params = {}) => {
  try {
    // Log to console in development
    if (__DEV__) {
      console.log('Analytics Event:', eventName, params);
    }
    // Here you would typically implement your mobile analytics
  } catch (error) {
    console.error('Analytics Error:', error);
  }
};

export { app, logAnalyticsEvent };
