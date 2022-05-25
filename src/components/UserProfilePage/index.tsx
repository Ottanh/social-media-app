import Col from 'react-bootstrap/esm/Col';
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
      return <Col className="Loading col-md-5 h-100 d-flex flex-column">Loading...</Col>;
    } else if(!user.data){
      return <Col className="NoUserFound col-md-5 h-100 d-flex flex-column">No user found</Col>;
    } else {
      return <UserDetails user={user.data.findUser} />;
    }
  };

  const postsRender = () => {
    if(posts.loading ) {
      return <Col className="Loading col-md-5 h-100 d-flex flex-column">Loading...</Col>;
    } else if(!posts.data){
      return <Col className="NoUserFound col-md-5 h-100 d-flex flex-column">No posts found</Col>;
    } else {
      return <PostList posts={posts.data.findPosts} />;
    }
  };


  return (
    <Col className="UserProfilePage col-md-5 d-flex flex-column">
      {userRender()}
      {loggedInUser.user 
        && userName === loggedInUser.user.username 
        && <PostForm />}
      {postsRender()}
    </Col>
  );
};

export default UserProfilePage;