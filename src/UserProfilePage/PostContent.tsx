import { Post } from "../types";

interface Props {
  post: Post
}

const PostContent = ({ post }: Props) => {
  return (
    <>
      <p>{post.content}</p>
      <p>{post.date}</p>
    </>
  );
}

export default PostContent;