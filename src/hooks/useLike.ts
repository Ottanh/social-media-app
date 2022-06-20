import { ApolloError, gql, useMutation } from '@apollo/client';
import { useStateValue } from '../state';

const ADD_LIKE = gql`
  mutation addLike($id: ID!) {
    addLike(id: $id) {
      post {
        id
        likes
      }
      user {
        id
        likes
      }
    }
  }
`;

const DELETE_LIKE = gql`
  mutation deleteLike($id: ID!) {
    deleteLike(id: $id) {
      post {
        id
        likes
      }
      user {
        id
        likes
      }
    }
  }
`;

const useLike = () => {
  const [{ loggedInUser }] = useStateValue();
  if(!loggedInUser) {
    return [() => null, () => null];
  }

  const handleError = (error: ApolloError) => {
    if(error.networkError) {
      console.log(error.networkError.message);
    } 
    if (error.graphQLErrors[0]) {
      console.log(error.graphQLErrors[0].message);
    }
  };
  
  const [addLike,] = useMutation(ADD_LIKE, {
    onError: handleError,
  });

  const [deleteLike,] = useMutation(DELETE_LIKE, {
    onError: handleError,
  });

  return [addLike, deleteLike];
};

export default useLike;