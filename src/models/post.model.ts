interface Author {
  id: string;
  username: string;
  name: string;
  avatar: string;
}
export class PostModel {
  id: string = '';
  author: Author = { id: '', username: '', name: '', avatar: '' };
  text: string = '';
  images: string[] = [];
  createdAt: Date = new Date();
}
