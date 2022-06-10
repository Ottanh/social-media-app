import { Post } from '../../../types';
import { MouseEvent } from 'react';
import './index.css';
import { gql, useMutation } from '@apollo/client';
import { FIND_POSTS } from '../PostList';
import { VscCommentDiscussion, VscHeart } from 'react-icons/vsc';


export const ADD_LIKE = gql`
  mutation addLike($id: ID!) {
    addLike(id: $id) {
      id
      likes
    }
  }
`;

interface Props {
  post: Post
}

const PostFooter = ({ post }: Props) => {
  const [addLike,] = useMutation(ADD_LIKE, {
    refetchQueries: [  {query: FIND_POSTS, variables: { username: post.user.username }} ],
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });


  const like = (e: MouseEvent<SVGElement>) => {
    e.stopPropagation();
    addLike({
      variables: {
        id: post.id
      }
    });
  };

  const reply = () => {
    console.log('reply');
  };

  return (
    <div className="PostFooter">
      <div className="Replies">
        <VscCommentDiscussion className="PostIcons" size="1.5em" onClick={reply}/> 69
      </div>
      <div className="Likes">
        <VscHeart className="PostIcons" size="1.5em" onClick={like}/> {post.likes}
      </div>
    </div>
  );
};

export default PostFooter;