export interface User {
  username: string;
  name: string;
  joined: string;
  description: string;
  posts: Post[]
}

export interface Post {
    id: string;
    user: {
      name: string;
    };
    date: string;
    content: string;
    likes: number;
}
