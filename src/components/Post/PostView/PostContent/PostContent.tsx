import { Post } from '../../../../types';

interface Props {
  post: Post
}

const PostContent = ({ post }: Props) => {
  return (
    <div>
      {post.content}
    </div>
  );
};

export default PostContent;