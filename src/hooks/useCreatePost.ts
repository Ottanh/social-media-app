import { ApolloError, gql, useMutation } from '@apollo/client';
import { FIND_POSTS } from '../pages/UserPage/UserPage';
import { FIND_REPLIES } from '../pages/PostPage/PostPage';
import { useStateValue } from '../state';
import { useState } from 'react';

const CREATE_POST = gql`
  mutation createPost($content: String!, $file: String, $replyTo: String) {
    createPost(content: $content, file: $file, replyTo: $replyTo) {
      id
    }
  }
`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useCreatePost = (replyTo: string | undefined): [any, string | undefined] => {
  const [{ loggedInUser }] = useStateValue();
  const [error, setError] = useState<string | undefined>();

  const handleError = (error: ApolloError) => {
    if(error.networkError) {
      setError(error.networkError.message);
    } 
    if (error.graphQLErrors[0]) {
      setError(error.graphQLErrors[0].message);
    }
  };

  const [createPost,] = useMutation(CREATE_POST, {
    refetchQueries: [ 
      {
        query: FIND_POSTS, variables: { username: loggedInUser?.username }
      },
      { 
        query: FIND_REPLIES, variables: { replyTo } 
      }
     ],
    onError: handleError,
  });

  return [createPost, error];
};

export default useCreatePost;