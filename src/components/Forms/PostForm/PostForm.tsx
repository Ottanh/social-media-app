import { gql, useQuery } from '@apollo/client';
import { ChangeEvent, useEffect, useState } from 'react';
import Textarea from 'react-expanding-textarea';
import useCreatePost from '../../../hooks/useCreatePost';
import { useStateValue } from '../../../state';
import './PostForm.css';
import axios from 'axios';


const GET_SIGNED_PUT = gql`
  query getPutUrl($fileName: String!) {
    getPutUrl(fileName: $fileName)
  }
`;

const GET_SIGNED_DELETE = gql`
  query getDeleteUrl($fileName: String!) {
    getDeleteUrl(fileName: $fileName)
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

  const signedQuery = useQuery(GET_SIGNED_PUT, {
    skip: !image,
    variables: {
      fileName: image?.name
    }
  });

  const signedDelete = useQuery(GET_SIGNED_DELETE, {
    skip: !image,
    variables: {
      fileName: image?.name
    }
  });

  const onSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); 
    if(content.length < 3 && !signedQuery.data) {
      setError('Post must be at least 3 charecters');
      return;
    }

    if(signedQuery.loading ||signedDelete.loading) {
      return;
    }

    if(signedQuery.data) {
      const res = await axios.put(signedQuery.data.getPutUrl, image);
      if(res.status !== 200) {
        setError('Error uploading image');
        return;
      }
    }

    createPost({ 
      variables: { 
        content,
        image: image?.name,
        replyTo: replyTo
      } 
    });

    setError(createPostError);
    setContent('');
  };

  useEffect(() => {
    if(createPostError && signedDelete.data){
      axios.delete(signedDelete.data.getDeleteUrl).then(res => {
        if(res.status !== 204) {
          setError('Error deleting image');
          return;
        }  
      });
    }
  }, [createPostError, signedDelete]);

  const handleChange = (event: { target: { value: string; }; }) => {
    setContent(event.target.value);
    setError(undefined);
  };

  const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if(event.target.files) {
      setImage(event.target.files[0]);
      console.log(event.target.files[0].name);
      setError(undefined);
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
          <button 
            className="PostFormButton" 
            type="submit" 
            value="Post"
            onClick={onSubmit}
          >
            Send
          </button>
        </div>
        <input type="file" accept="image/*" onChange={onImageChange} />
        {error && <div className="divErrPost">{error}</div>}
    </div>
  );
};

export default PostForm;