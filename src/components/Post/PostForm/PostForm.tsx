import { ApolloError, gql, useMutation } from '@apollo/client';
import { useState } from 'react';
import Textarea from 'react-expanding-textarea';
import { useStateValue } from '../../../state';
import { FIND_POSTS } from '../PostList/PostList';
import './PostForm.css';

const CREATE_POST = gql`
  mutation createPost($content: String!) {
    createPost(content: $content) {
      id
    }
  }
`;

const CREATE_REPLY = gql`
  mutation createReply($content: String!, $replyTo: String!) {
    createReply(content: $content, replyTo: $replyTo) {
      id
    }
  }
`;

interface Props {
  username: string | undefined,
  replyTo: string | undefined
}

const PostForm = ({ username, replyTo }: Props) => {
  const [error, setError] = useState<string | null>(null);
  const [content, setContent] = useState<string>('');
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
    refetchQueries: [ {query: FIND_POSTS, variables: { 
      username: user?.username 
    }} ],
    onError: handleError,
  });

  const [createReply,] = useMutation(CREATE_REPLY, {
    refetchQueries: [ {query: FIND_POSTS, variables: { 
      replyTo: replyTo
    }} ],
    onError: handleError,
  });


  const onSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); 
    if(content.length < 3) {
      setError('Post must be at least 3 charecters');
      return;
    }

    if(replyTo !== undefined) {
      createReply({ 
        variables: { 
          content: content,
          replyTo: replyTo
        } 
      });
    } else {
      createPost({ 
        variables: { 
          content: content
        } 
      });
    }
    setContent('');
  };

  const handleChange = (event: { target: { value: string; }; }) => {
    setContent(event.target.value);
    setError(null);
  };
  
  if(!user) {
    return null;
  }

  if(username !== user.username && !replyTo) {
    return null;
  }

  return (
    <div className="PostForm">
        <div className="TextAreaContainer">
          <Textarea
            className="TextArea" 
            placeholder="..."
            onChange={handleChange}
            value={content}
          />
        </div>
        <button 
          className="PostFormButton" 
          type="submit" 
          value="Post"
          onClick={onSubmit}
        >
          Post
        </button>
        {error && <div className="divErrPost">{error}</div>}
    </div>
  );
};

export default PostForm;