import { gql, useQuery } from '@apollo/client';
import { ChangeEvent, useState } from 'react';
import Textarea from 'react-expanding-textarea';
import useCreatePost from '../../../hooks/useCreatePost';
import { useStateValue } from '../../../state';
import './PostForm.css';
import axios from 'axios';


const GET_SIGNED_PUT = gql`
  query getSignedPostUrl($fileName: String!) {
    getSignedPostUrl(fileName: $fileName)
  }
`;

interface Props {
  username?: string,
  replyTo?: string
}

const PostForm = ({ username, replyTo }: Props) => {
  const [error, setError] = useState<string>();
  const [content, setContent] = useState<string>('');
  const [{ loggedInUser }] = useStateValue();
  const [createPost, createPostError] = useCreatePost(replyTo);
  const [image, setImage] = useState<File | null>();

  const signePutQuery = useQuery(GET_SIGNED_PUT, {
    skip: !image,
    variables: {
      fileName: image?.name
    }
  });

  const onSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); 
    if(content.length < 3) {
      setError('Post must be at least 3 charecters');
      return;
    }

    if(signePutQuery.loading) {
      return;
    }

    if(signePutQuery.data) {
      const res = await axios.put(signePutQuery.data.getSignedPostUrl, image);
      if(res.status !== 200) {
        setError('Error uploading image');
        return;
      }
    }

    createPost({ 
      variables: { 
        content: content,
        file: image?.name,
        replyTo: replyTo
      } 
    });

    setError(createPostError);
    setContent('');
  };

  const handleChange = (event: { target: { value: string; }; }) => {
    setContent(event.target.value);
    setError(undefined);
  };

  const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if(event.target.files) {
      setImage(event.target.files[0]);
      console.log(event.target.files[0].name);
    }
  };
  
  if(!loggedInUser) {
    return null;
  }

  if(username !== loggedInUser.username && !replyTo) {
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
        <input type="file" accept="image/*, video/*, .gif" onChange={onImageChange} />
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