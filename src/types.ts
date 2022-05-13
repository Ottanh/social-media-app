export interface User {
  username: string;
  name: string;
  joined: string;
  description: string;
  posts: [Post]
}

export interface Post {
    id: string;
    user: string;
    date: string;
    content: string;
}
