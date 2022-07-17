import { gql, useMutation } from '@apollo/client';
import { useStateValue } from '../state';

const FOLLOW = gql`
  mutation follow($id: ID!) {
    follow(id: $id) {
      id
      followed
    }
  }
`;

const UNFOLLOW = gql`
  mutation unFollow($id: ID!) {
    unFollow(id: $id) {
      id
      followed
    }
  }
`;

const useFollow = () => {
  const [{ loggedInUser }] = useStateValue();
  if(!loggedInUser) {
    return [() => null, () => null];
  }

  const [follow,] = useMutation(FOLLOW);
  const [unFollow,] = useMutation(UNFOLLOW);

  return [follow, unFollow];
};

export default useFollow;

