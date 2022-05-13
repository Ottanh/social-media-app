import { User } from "../types";
import Post from "./Post";

interface Props {
  user: User
}

const style = {
  "margin": "auto",
  "width": "30%",
}

const PostList = ({ user }: Props) => {
  return (
    <div style={style}>
      {user.posts.map(post => (
        <Post key={post.id} post={post} user={user}/>
      ))}
    </div>
  )
}

export default PostList;