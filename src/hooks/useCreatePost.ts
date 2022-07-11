import { ApolloError, gql, useMutation } from '@apollo/client';
import { FIND_REPLIES } from '../pages/PostPage/PostPage';
import { addPost, useStateValue } from '../state';
import { useState } from 'react';

const CREATE_POST = gql`
  mutation createPost($content: String!, $image: String, $replyTo: String) {
    createPost(content: $content, image: $image, replyTo: $replyTo) {
      id
      date
      content
      image
      likes
      replyTo
      replies
      user {
        id
        name
        username
      }
    }
  }
`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useCreatePost = (replyTo: string | undefined): [any, string | undefined] => {
  const [error, setError] = useState<string | undefined>();
  const [, dispatch] = useStateValue();

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
        query: FIND_REPLIES, variables: { replyTo } 
      }
     ],
    onCompleted: (data) => {
      console.log(data);
      dispatch(addPost(data.createPost));
    },
    onError: handleError,
  });

  return [createPost, error];
};

export default useCreatePost;