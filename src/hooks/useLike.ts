
import { useEffect, useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useStateValue } from '../state';
import { FIND_POSTS } from '../components/Post/PostList/PostList';
import { Post } from '../types';

const ADD_LIKE = gql`
  mutation addLike($id: ID!) {
    addLike(id: $id) {
      id
      likes
    }
  }
`;

const DELETE_LIKE = gql`
  mutation deleteLike($id: ID!) {
    deleteLike(id: $id) {
      id
      likes
    }
  }
`;

const GET_USER_LIKES = gql`
  query findUser($username: String!) {
    findUser(username: $username) {
      id
      likes
    }
  }
`;

const useLike = (post: Post): [() => void, boolean] => {
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
  
  const like = () => {
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
  return [like, likedPost];
};

export default useLike;