import { Post } from '../../../../types';
import { MouseEvent, useEffect, useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { FIND_POSTS } from '../../PostList/PostList';
import { BsChatText, BsHeart, BsHeartFill } from 'react-icons/bs';
import './PostFooter.css';
import { useNavigate } from 'react-router-dom';
import { useStateValue } from '../../../../state';
 
export const ADD_LIKE = gql`
  mutation addLike($id: ID!) {
    addLike(id: $id) {
      id
      likes
    }
  }
`;

export const DELETE_LIKE = gql`
  mutation deleteLike($id: ID!) {
    deleteLike(id: $id) {
      id
      likes
    }
  }
`;

export const GET_USER_LIKES = gql`
  query findUser($username: String!) {
    findUser(username: $username) {
      id
      likes
    }
  }
`;

interface Props {
  post: Post
}

const PostFooter = ({ post }: Props) => {
  const [{ loggedInUser: { user }},] = useStateValue();
  const refetchQueries = [  
    {query: FIND_POSTS, 
      variables: { 
        username: post.replyTo ? undefined : post.user.username, 
        replyTo: post.replyTo 
      }},
    {query: GET_USER_LIKES, 
      variables: { username: user?.username }},
  ];

  const [addLike,] = useMutation(ADD_LIKE, {
    refetchQueries,
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  const [deleteLike,] = useMutation(DELETE_LIKE, {
    refetchQueries,
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  const userQuery = useQuery(GET_USER_LIKES, {
    variables: { username: user?.username }
  });

  const [likedPost, setLikedPost] = useState(false);
  useEffect(() => {
    if(userQuery.data && userQuery.data.findUser.likes.includes(post.id)) {
      setLikedPost(true);
    } else {
      setLikedPost(false);
    }
  }, [userQuery.data]);
  
  const like = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    if(likedPost) {
      deleteLike({
        variables: {
          id: post.id
        }
      });
    } else {
      addLike({
        variables: {
          id: post.id
        }
      });
    }
  };

  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/post/${post.id}`);
  };

  return (
    <div className="PostFooter" onClick={onClick}>
      <div className="Replies">
        <BsChatText className="PostIcons" size="1em" /> {post.replies.length}
      </div>
      <div className="Likes" onClick={like} style={likedPost ? {'color': 'rgba(158, 31, 101, 1)'}: {}}>
        {likedPost 
          ? <><BsHeartFill className="PostIcons" size="1em" /> {post.likes}</> 
          : <><BsHeart className="PostIcons" size="1em" /> {post.likes}</>}
      </div>
    </div>
  );
};

export default PostFooter;