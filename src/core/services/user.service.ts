import { UserModel } from '../../models/user.model';
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  query,
  where
} from 'firebase/firestore';
import { app } from '../../config/firebase.config';
import {
  ref,
  getBytes,
  getStorage,
  getBlob,
  getDownloadURL,
  getMetadata
} from 'firebase/storage';
import * as FileSystem from 'expo-file-system';

const db = getFirestore(app);

export const getUserById = (userid: string): Promise<UserModel> => {
  return new Promise(async (resolve, reject) => {
    try {
      let uriImage =
        'https://firebasestorage.googleapis.com/v0/b/socialmedia-2d504.appspot.com/o/images%2Fnophoto.png?alt=media&token=9bb43f04-f332-4198-a6af-fb2f4e3f35cc';

      const userCol = collection(db, `Users/${userid}/user_information`);
      const sref = getStorage(app, 'gs://socialmedia-2d504.appspot.com');

      getDownloadURL(ref(sref, `/images/${userid}/avatar.jpg`))
        .then((imgUri) => {
          uriImage = imgUri;
        })
        .catch((error) => {});

      const fileSystem = await FileSystem.downloadAsync(
        uriImage,
        `${FileSystem.documentDirectory}`
      );

      const userSnapshot = await getDocs(userCol);
      userSnapshot.docs.map((doc) => {
        let user = doc.data() as UserModel;
        user.avatar = fileSystem.uri;
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

export const getUsersFollowers = async (userid: string): Promise<string[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      let followersId: string[] = [];
      const userCol = query(
        collection(db, 'Relationship'),
        where('follower', '==', userid)
      );
      const userSnapshot = await getDocs(userCol);
      userSnapshot.docs.forEach((usr) => {
        followersId.push(usr.data().following);
      });
      followersId.push(userid);
      resolve(followersId);
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
