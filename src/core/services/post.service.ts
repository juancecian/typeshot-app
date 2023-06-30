import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query
} from 'firebase/firestore';
import { app } from '../../config/firebase.config';
import { PostModel } from '../../models/post.model';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';

const db = getFirestore(app);

export const getPosts = (userIds: string[]): Promise<PostModel[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const posts: PostModel[] = [];
      for (const userId of userIds) {
        let uriImage =
          'https://firebasestorage.googleapis.com/v0/b/socialmedia-2d504.appspot.com/o/images%2Fnophoto.png?alt=media&token=9bb43f04-f332-4198-a6af-fb2f4e3f35cc';

        const sref = getStorage(app, 'gs://socialmedia-2d504.appspot.com');

        getDownloadURL(ref(sref, `/images/${userId}/avatar.jpg`))
          .then((imgUri) => {
            uriImage = imgUri;
          })
          .catch((error) => {});

        const postCol = query(
          collection(db, `Users/${userId}/post_information`),
          limit(20),
          orderBy('createdAt', 'desc')
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
          docData.author.avatar = uriImage;
          posts.push(docData);
        });
      }
      resolve(posts);
    } catch (error) {
      reject(error);
    }
  });
};

export const createPost = (post: PostModel): Promise<boolean> => {
  return new Promise(async (resolve, reject) => {
    try {
      const addedDoc = await addDoc(
        collection(db, `Users/${post.author.id}/post_information`),
        {
          text: post.text,
          images: [],
          createdAt: post.createdAt
        }
      );
      if (addedDoc.id) {
        resolve(true);
      }
    } catch (error) {
      reject(error);
    }
  });
};
