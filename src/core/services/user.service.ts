import { UserModel } from '../../models/user.model';
import { addDoc, collection, getDocs, getFirestore } from 'firebase/firestore';
import { app } from '../../config/firebase.config';
import {
  ref,
  getBytes,
  getStorage,
  getBlob,
  getDownloadURL
} from 'firebase/storage';
import * as FileSystem from 'expo-file-system';

const db = getFirestore(app);

export const getUserById = (userid: string): Promise<UserModel> => {
  return new Promise(async (resolve, reject) => {
    try {
      const userCol = collection(db, `Users/${userid}/user_information`);
      const gsReference = ref(
        getStorage(),
        `gs://socialmedia-2d504.appspot.com/images/${userid}/avatar.jpg`
      );
      const uriImage = await getDownloadURL(gsReference);
      const { uri } = await FileSystem.downloadAsync(
        uriImage,
        FileSystem.documentDirectory + 'imagen.jpg'
      );
      const userSnapshot = await getDocs(userCol);
      userSnapshot.docs.map((doc) => {
        let user = doc.data() as UserModel;
        user.avatar = uri;
        resolve(user);
      });
    } catch (error) {
      reject(error);
    }
  });
};

export const createAccount = (data: UserModel): Promise<boolean> => {
  return new Promise(async (resolve, reject) => {
    try {
      const userCol = collection(db, `Users/${data.id}/user_information`);
      const userSnapshot = await addDoc(userCol, {
        id: data.id,
        name: data.name,
        username: data.username,
        email: data.email,
        emailVerified: false,
        birthday: { day: 0, month: 0, year: 0 },
        isNewbie: true,
        isOnline: false,
        loginStatus: { status: false, token: '' },
        followers: 0,
        following: 0,
        currentStep: 1,
        biographyInfo: ''
      });
      if (userSnapshot.id) {
        resolve(true);
      }
    } catch (error) {
      reject(error);
    }
  });
};

const convertBlobToBase64 = (blob: Blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};
