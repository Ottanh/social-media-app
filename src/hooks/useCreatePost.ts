import { ApolloError, gql, useMutation } from '@apollo/client';
import { FIND_POSTS } from '../components/Post/PostList/PostList';
import { useStateValue } from '../state';

const CREATE_POST = gql`
  mutation createPost($content: String!,$replyTo: String) {
    createPost(content: $content, replyTo: $replyTo) {
      id
    }
  }
`;

const useCreatePost = (replyTo: string | undefined, setError: (msg: string) => void) => {
  const [{loggedInUser: { user }}] = useStateValue();

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
        query: FIND_POSTS, variables: { 
          replyTo: replyTo, 
          username: replyTo ? undefined : user?.username 
        }
      },
      { query: FIND_POSTS, variables: { id: replyTo } }
     ],
    onError: handleError,
  });

  return createPost;
};

export default useCreatePost;