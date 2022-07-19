export interface User {
  id: string;
  username: string;
  name: string;
  date: number;
  description: string;
  image: string;
  likes: string[];
  followed: string[];
}

export interface Post {
    id: string;
    user: {
      id: string;
      name: string;
      username: string;
    };
    date: number;
    content?: string;
    image?: string;
    likes: number;
    replyTo?: string;
    replies: string[];
}

export interface SearchResult {
  user: User[];
  post: Post[];
}
