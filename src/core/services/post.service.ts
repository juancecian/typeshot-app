import {
  collection,
  getDocs,
  getFirestore,
  limit,
  query
} from 'firebase/firestore';
import app from '../../config/firebase.config';
import { PostModel } from '../../models/post.model';

const db = getFirestore(app);

export const getPosts = (userIds: string[]): Promise<PostModel[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const posts: PostModel[] = [];
      for (const userId of userIds) {
        const postCol = query(
          collection(db, `Users/${userId}/post_information`),
          limit(20)
        );
        const postSnapshot = await getDocs(postCol);
        const userCol = collection(db, `Users/${userId}/user_information`);
        const userSnapshot = await getDocs(userCol);
        postSnapshot.docs.map((doc) => {
          let docData = new PostModel();
          docData.id = doc.data().id;
          docData.text = doc.data().text;
          docData.images = doc.data().images;
          docData.author.id = userSnapshot.docs[0].data().id;
          docData.author.name = userSnapshot.docs[0].data().fullName;
          docData.author.username = userSnapshot.docs[0].data().username;
          docData.author.avatar = userSnapshot.docs[0].data().avatar;
          posts.push(docData);
        });
      }
      console.log(posts);
      resolve(posts);
    } catch (error) {
      reject(error);
    }
  });
};
