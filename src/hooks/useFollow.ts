import { ApolloError, gql, useMutation } from '@apollo/client';
import { useStateValue } from '../state';


const FOLLOW = gql`
  mutation follow($id: ID!) {
    follow(id: $id) {
      id
      followed
    }
  }
`;

const useFollow = () => {
  const [{ loggedInUser }] = useStateValue();
  if(!loggedInUser) {
    return () => null;
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
    update: (cache, response) => {  
      cache.modify({
        id: `User:${loggedInUser.id}`,
        fields: {
          likes(cachedFollow) {
            return cachedFollow.concat(response.data.addLike.id);
          },
        }
      }); 
    },
  });

  return follow;
  
};

export default useFollow;

