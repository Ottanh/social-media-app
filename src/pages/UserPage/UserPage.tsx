import { useParams } from 'react-router-dom';
import PostList from '../../components/PostList/PostList';
import UserDetails from '../../components/UserProfile/UserProfile';
import PageHeader from '../../components/PageHeader/PageHeader';
import './UserPage.css';
import { gql, useQuery } from '@apollo/client';

export const FIND_POSTS = gql`
  query findPosts($username: String) {
    findPosts (username: $username) { 
      id
      user {
        id
        name
        username
      }
      date
      content
      image
      likes
      replyTo
      replies
    }
  }
`;

export const FIND_USER = gql`
  query findUser($username: String!) {
    findUser (username: $username) { 
      id
      username
      name
      date
      description
    }
  }
`;

const UserPage = () => {
  const { username } = useParams<{ username: string }>();

  const postQuery = useQuery(FIND_POSTS, {
    variables: { username }
  });

  const userQuery = useQuery(FIND_USER, {
    variables: { username }
  });

  if(userQuery.loading || postQuery.loading  ) {
    return <div className="UserPage">Loading...</div>;
  } 
  if(!userQuery.data){
    return <div className="UserPage">No user found</div>;
  }

  return (
      <section className="UserPage">
        <PageHeader title={username ? `@${username }` : ''} />
        <UserDetails user={userQuery.data.findUser} />
        <PostList  posts={postQuery.data? postQuery.data.findPosts : []}/>
      </section>
  );
};


export default UserPage;