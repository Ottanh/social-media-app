import { gql, useMutation } from '@apollo/client';
import { FIND_REPLIES } from '../pages/PostPage/PostPage';
import { FIND_POSTS } from '../pages/UserPage/UserPage';

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


const useCreatePost = (replyTo: string | undefined = undefined, username: string | undefined = undefined) => {
  const [createPost,] = useMutation(CREATE_POST, {
    refetchQueries: [ 
      { 
        query: FIND_REPLIES, variables: { replyTo }
      },
      { 
        query: FIND_POSTS, variables: { username }
      },
     ]
  });

  return createPost;
};

export default useCreatePost;