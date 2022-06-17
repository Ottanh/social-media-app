import { useState } from 'react';
import Textarea from 'react-expanding-textarea';
import useCreatePost from '../../../hooks/useCreatePost';
import { useStateValue } from '../../../state';
import './PostForm.css';


interface Props {
  username?: string,
  replyTo?: string
}

const PostForm = ({ username, replyTo }: Props) => {
  const [error, setError] = useState<string | null>(null);
  const [content, setContent] = useState<string>('');
  const [{loggedInUser: { user }}] = useStateValue();
  const createPost = useCreatePost(replyTo, setError);

  const onSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); 
    if(content.length < 3) {
      setError('Post must be at least 3 charecters');
      return;
    }
    createPost({ 
      variables: { 
        content: content,
        replyTo: replyTo
      } 
    });
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
          Send
        </button>
        {error && <div className="divErrPost">{error}</div>}
    </div>
  );
};

export default PostForm;