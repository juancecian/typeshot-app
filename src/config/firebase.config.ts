import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { initializeAuth } from 'firebase/auth';
import { getReactNativePersistence } from 'firebase/auth/react-native';

const firebaseConfig = {
  apiKey: 'AIzaSyDSbrs0YjDrbvv_uBja53dvGwhwjPiixZo',
  authDomain: 'socialmedia-2d504.firebaseapp.com',
  databaseURL: 'https://socialmedia-2d504-default-rtdb.firebaseio.com',
  projectId: 'socialmedia-2d504',
  storageBucket: 'socialmedia-2d504.appspot.com',
  messagingSenderId: '442194636377',
  appId: '1:442194636377:web:a324d3e7ed49e7e1ebcb48',
  measurementId: 'G-7EZ42PP9HB'
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
export { app, auth };
