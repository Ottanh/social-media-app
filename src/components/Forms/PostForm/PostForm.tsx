import { ChangeEvent, useState } from 'react';
import Textarea from 'react-expanding-textarea';
import useCreatePost from '../../../hooks/useCreatePost';
import './PostForm.css';
import useS3 from '../../../hooks/useS3';
import { addPost, useStateValue } from '../../../state';
import { Post } from '../../../types';
import { ApolloError } from '@apollo/client';


interface Props {
  username?: string,
  replyTo?: string
}

const PostForm = ({ replyTo }: Props) => {
  const [{ loggedInUser }] = useStateValue();
  const [error, setError] = useState<string>();
  const [content, setContent] = useState<string>('');
  const createPost = useCreatePost(replyTo, loggedInUser?.username);
  const [image, setImage] = useState<File | null>();
  const [uploadImage, deleteImage] = useS3();
  const [, dispatch] = useStateValue();

  const onSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); 
    if(content.length < 3 && !image) {
      setError('Post must be at least 3 charecters');
      return;
    }

    if(image){
      try {
        await uploadImage(image);
      } catch (e) {
        if(e instanceof Error) {
          setError(e.message);
        }
      }
    }

    createPost({ 
      variables: { 
        content,
        image: image?.name,
        replyTo: replyTo
      },
      // add new post to state
      onCompleted: (data: { createPost: Post; }) => {
        dispatch(addPost(data.createPost));
      },
      // delete image from s3 if createPost returns error
      onError: (e: ApolloError) => {
        setError(e.message);
        if(image){
          try {
            deleteImage(image);
          } catch (e) {
            if(e instanceof Error) {
              setError(e.message);
            }
          }
        }
      }
    });

    setContent('');
    setImage(null);
  };


  const handleChange = (event: { target: { value: string; }; }) => {
    setContent(event.target.value);
    setError(undefined);
  };

  const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if(event.target.files) {
      setImage(event.target.files[0]);
      setError(undefined);
    }
  };
  
  return (
    <form className="post-form">
        <div className="input-container">
          <Textarea
            className="text-area" 
            placeholder="..."
            onChange={handleChange}
            value={content}
          />
          <button 
            className="post-form-button" 
            type="submit" 
            value="Post"
            onClick={onSubmit}
          >
            Send
          </button>
        </div>
        <input type="file" accept="image/*" onChange={onImageChange} />
        {error && <div className="div-err-post">{error}</div>}
    </form>
  );
};

export default PostForm;