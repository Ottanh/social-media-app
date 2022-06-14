import { Post } from '../../../../types';
import { MouseEvent } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { FIND_POSTS } from '../../PostList/PostList';
import { VscCommentDiscussion, VscHeart } from 'react-icons/vsc';
import './PostFooter.css';

export const ADD_LIKE = gql`
  mutation addLike($id: ID!) {
    addLike(id: $id) {
      id
      likes
    }
  }
`;

const GET_REPLIES = gql`
  query countPostReplies($id: String!) {
    countPostReplies(id: $id)
  }
`;

interface Props {
  post: Post
}

const PostFooter = ({ post }: Props) => {
  const [addLike,] = useMutation(ADD_LIKE, {
    refetchQueries: [  {query: FIND_POSTS, variables: { 
      username: post.replyTo ? undefined : post.user.username, 
      replyTo: post.replyTo 
    }} ],
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  const countQuery = useQuery(GET_REPLIES, {
    variables: { id: post.id }
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
        <VscCommentDiscussion className="PostIcons" size="1.5em" onClick={reply}/> {countQuery.data && countQuery.data.countPostReplies}
      </div>
      <div className="Likes">
        <VscHeart className="PostIcons" size="1.5em" onClick={like}/> {post.likes}
      </div>
    </div>
  );
};

export default PostFooter;