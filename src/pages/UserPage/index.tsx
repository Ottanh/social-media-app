import { useParams } from 'react-router-dom';
import PostList from '../../components/Post/PostList';
import UserDetails from '../../components/UserDetails/UserDetails';
import PostForm from '../../components/Forms/PostForm';
import './index.css';


const UserPage = () => {
  const { username } = useParams<{ username: string }>();
  return (
      <article className="UserPage">
        <UserDetails username={username} />
        <PostForm username={username} />
        <PostList username={username} />
      </article>
  );
};



export default UserPage;