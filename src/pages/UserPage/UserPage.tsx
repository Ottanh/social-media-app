import { useParams } from 'react-router-dom';
import PostList from '../../components/Post/PostList/PostList';
import UserDetails from '../../components/User/UserDetails/UserDetails';
import PostForm from '../../components/Post/PostForm/PostForm';
import PageHeader from '../../components/PageHeader/PageHeader';
import './UserPage.css';


const UserPage = () => {
  const { username } = useParams<{ username: string }>();
  return (
      <section className="UserPage">
        <PageHeader title={username ? `@${username }` : ''} />
        <UserDetails username={username} />
        <PostForm username={username} replyTo={undefined} />
        <PostList username={username} replyTo={undefined} />
      </section>
  );
};


export default UserPage;