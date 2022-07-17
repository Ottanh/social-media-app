import { useNavigate } from 'react-router-dom';
import { User } from '../../types';
import FollowButton from '../FollowButton/FollowButton';
import './UserProfile.css';
import { useStateValue } from '../../state';
import { ChangeEvent, useRef, useState } from 'react';
import Textarea from 'react-expanding-textarea';
import useEditUser from '../../hooks/useEditUser';
import { BsCamera } from 'react-icons/bs';
import useS3 from '../../hooks/useS3';
import { ApolloError } from '@apollo/client';


interface Props {
  user: User;
  id?: string;
}

const UserProfile = ({ user, id }: Props) => {
  const [{ loggedInUser },] = useStateValue();
  const [edit, setEdit] = useState<boolean>(false);
  const [value, setValue] = useState<string>(user.description);
  const editUser = useEditUser();
  const navigate = useNavigate();
  const refDescription = useRef<HTMLInputElement>(null);
  const refPicture = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<File | null>();
  const [uploadImage, deleteImage, getImage] = useS3();


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
    if(image){
      try {
        await uploadImage(image);
      } catch (e) {
        if(e instanceof Error) {
          console.log(e.message);
        }
      }
    }

    await editUser( {
      variables: {
        description: value,
        image: image?.name
      },
      // delete old image from s3
      onCompleted: async () => {
        const oldImage = await getImage(user.image);
        if(oldImage) {
          try {
            await deleteImage(oldImage.data);
          } catch (e) {
            if(e instanceof Error) {
              console.log(e.message);
            }
          }
        }
      },
      // delete image from s3 if editUser returns error
      onError: (e: ApolloError) => {
        console.log(e.message);
        if(image) {
          try {
            deleteImage(image);
          } catch (e) {
            if(e instanceof Error) {
              console.log(e.message);
            }
          }
        }
      }
    });

    setEdit(false);
    setImage(null);
  };

  const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if(event.target.files) {
      setImage(event.target.files[0]);
    }
  };

  const onClickPicture = () => {
    refPicture.current?.click();
  };

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