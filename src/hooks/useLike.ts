import { ApolloError, gql, useMutation } from '@apollo/client';
import { useStateValue } from '../state';
import { arrRemove } from '../util/array';

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
    update: (cache, response) => {  
      cache.modify({
        id: cache.identify(response.data.addLike),
        fields: {
          likes() {
            return response.data.addLike.likes;
          },
        }
      });
      cache.modify({
        id: `User:${loggedInUser.id}`,
        fields: {
          likes(cachedLikes) {
            return cachedLikes.concat(response.data.addLike.id);
          },
        }
      }); 
    },
  });

  const [deleteLike,] = useMutation(DELETE_LIKE, {
    onError: handleError,
    update: (cache, response) => {    
      cache.modify({
        id: cache.identify(response.data.deleteLike),
        fields: {
          likes() {
            return response.data.deleteLike.likes;
          },
        }
      }); 
      cache.modify({
        id: `User:${loggedInUser.id}`,
        fields: {
          likes(cachedLikes) {
            return arrRemove(response.data.deleteLike.id, cachedLikes);
          },
        }
      }); 
    },
  });

  return [addLike, deleteLike];
};

export default useLike;