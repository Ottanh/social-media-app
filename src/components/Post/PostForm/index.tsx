import { gql, useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import Textarea from 'react-expanding-textarea';
import { useStateValue } from '../../../state';
import { FIND_POSTS } from '../PostList';
import './index.css';

export const CREATE_POST = gql`
  mutation createPost($content: String!, $likes: Int!) {
    createPost(content: $content, likes: $likes) {
      id
    }
  }
`;

interface Props {
  username: string | undefined
}

const PostForm = ({ username }: Props) => {
  const [{ loggedInUser }] = useStateValue();
  const [error, setError] = useState<string | null>(null);
  const [content, setContent] = useState<string>('');

  const [{loggedInUser: { user }}] = useStateValue();

  const [createPost, result] = useMutation(CREATE_POST, {
    refetchQueries: [  {query: FIND_POSTS, variables: { username: user?.username }} ],
    onError: (error) => {
      setError(error.graphQLErrors[0].message);
    },
  });


  useEffect(() => {
    if(result.data){
      console.log(result.data);
    }
  }, [result.data]);

  const onSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); 
    if(content.length < 3) {
      setError('Post must be at least 3 charecters');
      return;
    }
    createPost({ 
      variables: { 
        content: content,
        likes: 0
      } 
    });
    setContent('');
  };

  const handleChange = (event: { target: { value: string; }; }) => {
    setContent(event.target.value);
    setError(null);
  };
  
  if(!loggedInUser.user) {
    return null;
  }

  if(username !== loggedInUser.user.username){ 
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