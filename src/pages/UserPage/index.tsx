import { useParams } from 'react-router-dom';
import PostList from '../../components/Post/PostList';
import UserDetails from '../../components/User/UserDetails/UserDetails';
import PostForm from '../../components/Post/PostForm';
import './index.css';
import PageHeader from '../../components/PageHeader/PageHeader';


const UserPage = () => {
  const { username } = useParams<{ username: string }>();
  return (
      <article className="UserPage">
        <PageHeader title={username ? `@${username }` : ''} />
        <UserDetails username={username} />
        <PostForm username={username} />
        <PostList username={username} replyTo={undefined} />
      </article>
  );
};


export default UserPage;