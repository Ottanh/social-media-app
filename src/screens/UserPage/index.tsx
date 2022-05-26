import { useParams } from 'react-router-dom';
import PostList from '../../components/Post/PostList';
import UserDetails from '../../components/User/UserDetails/UserDetails';
import PostForm from '../../components/Post/PostForm';
import './index.css';


const UserPage = () => {
  const { username } = useParams<{ username: string }>();
  return (
    <div className="UserProfilePage">
      <UserDetails username={username} />
      <PostForm username={username} />
      <PostList username={username} />
    </div>
  );
};

export default UserPage;