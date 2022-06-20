import { ApolloError, gql, useMutation } from '@apollo/client';
import { useStateValue } from '../state';
import { arrRemove } from '../util/array';


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

  const handleError = (error: ApolloError) => {
    if(error.networkError) {
      console.log(error.networkError.message);
    } 
    if (error.graphQLErrors[0]) {
      console.log(error.graphQLErrors[0].message);
    }
  };
  

  const [follow,] = useMutation(FOLLOW, {
    onError: handleError,
  });

  const [unFollow,] = useMutation(UNFOLLOW, {
    onError: handleError,
  });

  return [follow, unFollow];
};

export default useFollow;

