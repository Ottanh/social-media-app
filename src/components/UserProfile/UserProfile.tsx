import { useNavigate } from 'react-router-dom';
import { User } from '../../types';
import FollowButton from '../FollowButton/FollowButton';
import './UserProfile.css';
import cat from '../../images/cat.jpg';
import { useStateValue } from '../../state';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import Textarea from 'react-expanding-textarea';
import useEditUserDes from '../../hooks/useEditUser';
import { BsCamera } from 'react-icons/bs';
import { gql, useQuery } from '@apollo/client';
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
  user: User;
  id?: string;
}

const UserProfile = ({ user, id }: Props) => {
  const [{ loggedInUser },] = useStateValue();
  const [edit, setEdit] = useState<boolean>(false);
  const [value, setValue] = useState<string>(user.description);
  const [editUser, editUserError] = useEditUserDes();
  const navigate = useNavigate();
  const refDescription = useRef<HTMLInputElement>(null);
  const refPicture = useRef<HTMLInputElement>(null);
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

  const onClick = () => {
    navigate(`/${user.username}`);
  };

  const handleChange = (event: { target: { value: string; }; }) => {
    setValue(event.target.value);
  };

  const onEdit = () => {
    setEdit(true);
    refDescription.current?.focus();
  };

  const onSave = async() => {

    if(signedQuery.loading ||signedDelete.loading) {
      return;
    }


    if(signedQuery.data) {
      const res = await axios.put(signedQuery.data.getPutUrl, image);
      if(res.status !== 200) {
        console.log('Error uploading image');
        return;
      }
    }

    editUser( {
      variables: {
        description: value,
        image: image?.name
      }
    });

    setEdit(false);
  };

  //delete image from s3 if editUser returns error
  useEffect(() => {
    if(editUserError && signedDelete.data){
      axios.delete(signedDelete.data.getDeleteUrl).then(res => {
        if(res.status !== 204) {
          console.log('Error deleting image');
          return;
        }  
      });
    }
  }, [editUserError, signedDelete]);

  const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if(event.target.files) {
      setImage(event.target.files[0]);
      console.log(event.target.files[0].name);
    }
  };

  const onClickPicture = () => {
    refPicture.current?.click();
  };

  console.log(user.image);

  return (
    <div className="UserProfile" id={id} onClick={onClick}>

      <div className="UserProfileHeader">
        <img className="userPic" src={image ? URL.createObjectURL(image) : user.image} alt="profilePic"/>
        <BsCamera className="camera-icon" size={35} onClick={onClickPicture} style={edit ? {} : {'display': 'none'} } />
        <input ref={refPicture} type="file" accept="image/*" onChange={onImageChange} style={ {'display': 'none'} } />

        {(loggedInUser?.id === user.id && edit === false) && 
          <button className="FollowedButton" onClick={onEdit}>Edit profile</button>
        }
        {(loggedInUser?.id === user.id && edit === true) && 
          <button className="FollowButton" onClick={onSave}>Save</button>
        }
        {loggedInUser?.id !== user.id && 
          <FollowButton user={user} />
        }
      </div>

      <div className="NameContainer">
        <span className="Name">
          {user.name} 
        </span>
        <span className="UserName">
          @{user.username}
        </span>
      </div>

      <div className="UserDetails">
        <Textarea
          ref={refDescription}
          onFocus={(e)=>e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length)}
          readOnly={!edit}
          className={edit ? 'UserDesEdit' : 'UserDes' }
          onChange={handleChange}
          value={value ? value : ''}
        />
        Joined: {user.date}
      </div>
    </div>
  );
};

export default UserProfile;