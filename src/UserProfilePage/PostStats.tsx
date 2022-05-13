import { Post } from "../types";

interface Props {
  post: Post
}

const PostStats = ({ post }: Props) => {
  return (
    <div>
      <p>{post.date} Likes: {post.likes}</p>
    </div>
  )
}

export default PostStats;