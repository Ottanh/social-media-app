import { ApolloError, gql, useMutation } from '@apollo/client';
import { useStateValue } from '../state';
import { Post } from '../types';
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

const useLike = (post: Post): [() => void, () => void] => {
  const [{loggedInUser: { user }}] = useStateValue();
  if(!user) {
    throw new Error('User is null');
  }

  const handleError = (error: ApolloError) => {
    if(error.networkError) {
      console.log(error.networkError.message);
    } 
    if (error.graphQLErrors[0]) {
      console.log(error.graphQLErrors[0].message);
    }
  };
  
  const [addLikeMutation,] = useMutation(ADD_LIKE, {
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
        id: `User:${user.id}`,
        fields: {
          likes(cachedLikes) {
            return cachedLikes.concat(response.data.addLike.id);
          },
        }
      }); 
    },
  });

  const [deleteLikeMutation,] = useMutation(DELETE_LIKE, {
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
        id: `User:${user.id}`,
        fields: {
          likes(cachedLikes) {
            return arrRemove(response.data.deleteLike.id, cachedLikes);
          },
        }
      }); 
    },
  });

  const deleteLike = async () => {
    deleteLikeMutation({
      variables: {
        id: post.id
      }
    });
  };

  const addLike = async () => {
    addLikeMutation({
      variables: {
        id: post.id
      }
    });
  };

  return [addLike, deleteLike];
};

export default useLike;