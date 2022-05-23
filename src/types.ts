export interface User {
  username: string;
  name: string;
  joined: string;
  description: string;
}

export interface Post {
    id: string;
    user: {
      id: string;
      name: string;
      username: string;
    };
    date: string;
    content?: string;
    likes: number;
}
