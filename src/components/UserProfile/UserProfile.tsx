import { useNavigate } from 'react-router-dom';
import { User } from '../../types';
import FollowButton from '../FollowButton/FollowButton';
import './UserProfile.css';
import cat from '../../images/cat.jpg';
import { useStateValue } from '../../state';
import { useState } from 'react';
import Textarea from 'react-expanding-textarea';
import useEditUserDes from '../../hooks/useEditUserDes';



interface Props {
  user: User;
  id?: string;
}

const UserProfile = ({ user, id }: Props) => {
  const [{ loggedInUser },] = useStateValue();
  const [edit, setEdit] = useState<boolean>(false);
  const [value, setValue] = useState<string>(user.description);
  const editDescription = useEditUserDes();
  const navigate = useNavigate();

  
  const onClick = () => {
    navigate(`/${user.username}`);
  };

  const handleChange = (event: { target: { value: string; }; }) => {
    setValue(event.target.value);
  };

  const onEdit = () => {
    setEdit(true);
  };

  const onSave = () => {
    setEdit(false);
    editDescription( {
      variables: {
        newDes: value
      }
    });
  };

  console.log(edit);

  return (
    <div className="UserProfile" id={id} onClick={onClick}>
      <div className="UserProfileHeader">
        <img className="userPic" src={cat} alt="profilePic"/>
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
          <div className="Name">
            {user.name} 
          </div>
          <div className="UserName">
            @{user.username}
          </div>
        </div>
      <div className="UserDetails">
        <p>
          <Textarea
            readOnly={!edit}
            className="SearchArea" 
            onChange={handleChange}
            value={value}
          />
        </p>
        
        <div>
          Joined: {user.date}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;