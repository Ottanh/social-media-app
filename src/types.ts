export interface User {
  id: string;
  username: string;
  name: string;
  date: string;
  description: string;
  likes: string[];
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
    replyTo?: string;
    replies: [string?]
}

export interface SearchResult {
  users: [User?];
  posts: [Post?];
}
