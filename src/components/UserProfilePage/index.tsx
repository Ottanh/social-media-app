import { useParams } from 'react-router-dom';
import PostList from '../Post/PostList';
import UserDetails from './UserDetails';
import { gql, useQuery } from '@apollo/client';
import PostForm from '../Post/PostForm';
import { useStateValue } from '../state';

export const FIND_USER = gql`
  query findUser($username: String!) {
    findUser (username: $username) { 
      username
      name
      joined
      description
    }
  }
`;

export const FIND_POSTS = gql`
  query findPosts($username: String!) {
    findPosts (username: $username) { 
      id
      user {
        name
      }
      date
      content
      likes
    }
  }
`;


const UserProfilePage = () => {
  const { userName } = useParams<{ userName: string }>();
  const user = useQuery(FIND_USER, {
    variables: { username: userName }
  });
  const posts = useQuery(FIND_POSTS, {
    variables: { username: userName }
  });

  const [{ loggedInUser }] = useStateValue();

  const userRender = () => {
    if(user.loading ) {
      return <div style={{'display': 'flex', 'flex': '1', 'flexDirection': 'column'}}>Loading...</div>;
    } else if(!user.data){
      return <div style={{'display': 'flex', 'flex': '1', 'flexDirection': 'column'}}>No user found</div>;
    } else {
      return <UserDetails user={user.data.findUser} />;
    }
  };

  const postsRender = () => {
    if(posts.loading ) {
      return <div style={{'display': 'flex', 'flex': '1', 'flexDirection': 'column'}}>Loading...</div>;
    } else if(!posts.data){
      return <div style={{'display': 'flex', 'flex': '1', 'flexDirection': 'column'}}>No user found</div>;
    } else {
      return <PostList posts={posts.data.findPosts} />;
    }
  };


  return (
    <div style={{'display': 'flex', 'flex': '1', 'flexDirection': 'column'}}>
      {userRender()}
      {loggedInUser.user 
        && userName === loggedInUser.user.username 
        && <PostForm />}
      {postsRender()}
    </div>
  );
};

export default UserProfilePage;