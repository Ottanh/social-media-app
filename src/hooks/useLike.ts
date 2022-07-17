import { gql, useMutation } from '@apollo/client';
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

  const [addLike,] = useMutation(ADD_LIKE);
  const [deleteLike,] = useMutation(DELETE_LIKE);

  return [addLike, deleteLike];
};

export default useLike;