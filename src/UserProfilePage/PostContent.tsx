import { Post } from "../types";

interface Props {
  post: Post
}

const PostContent = ({ post }: Props) => {
  return (
    <>
      <p>{post.content}</p>
    </>
  );
}

export default PostContent;