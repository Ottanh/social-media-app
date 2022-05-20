import Col from 'react-bootstrap/esm/Col';
import { useParams } from 'react-router-dom';
import PostList from '../PostList';
import UserDetails from './UserDetails';
import { User } from '../types';

import { gql, useQuery } from '@apollo/client';

export const FIND_USER = gql`
  query findUser($username: String!) {
    findUser (username: $username) { 
      username
      name
      joined
      description
      posts {
        id
        content
        date
        likes
        user
      }
  }
}`;

interface UserQueryResult {
   findUser: User 
}

const UserProfilePage = () => {
  const { userName } = useParams<{ userName: string }>();
  const { loading, data } = useQuery<UserQueryResult>(FIND_USER, {
    variables: { username: userName }
  });


  if(loading) {
    return <Col className="NoUserFound col-md-5 h-100 d-flex flex-column">Loading...</Col>;
  }

  if(!data){
    return <Col className="NoUserFound col-md-5 h-100 d-flex flex-column">No user found</Col>;
  }


  return (
    <Col className="UserProfilePage col-md-5 d-flex flex-column">
      <UserDetails user={data.findUser} />
      <PostList posts={data.findUser.posts} />
    </Col>
  );
};

export default UserProfilePage;