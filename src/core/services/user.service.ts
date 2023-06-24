import { UserModel } from '../../models/user.model';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import app from '../../config/firebase.config';

const db = getFirestore(app);

export const getUserById = (userid: string): Promise<UserModel> => {
  return new Promise(async (resolve, reject) => {
    try {
      const userCol = await collection(db, `Users/${userid}/user_information`);
      const userSnapshot = await getDocs(userCol);
      userSnapshot.docs.map((doc) => {
        let user = doc.data() as UserModel;
        resolve(user);
      });
    } catch (error) {
      reject(error);
    }
  });
};
