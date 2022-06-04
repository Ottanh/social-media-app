import { Post } from '../../../types';
import { MouseEvent } from 'react';
import './index.css';
import { gql, useMutation } from '@apollo/client';
import { FIND_POSTS } from '../PostList';


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


  const like = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    addLike({
      variables: {
        id: post.id
      }
    });
  };

  const reply = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    console.log('reply');
  };

  return (
    <div className="PostFooter">
      <button className="PostButton" onClick={reply}>Reply</button>
      <button className="PostButton" onClick={like}>Like</button>
      <div className="Likes">Likes: {post.likes}</div>
    </div>
  );
};

export default PostFooter;