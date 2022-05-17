import { useEffect } from 'react';
import Col from 'react-bootstrap/esm/Col';
import { useParams } from 'react-router-dom';
import PostList from '../Posts/PostList';
import { useStateValue, setUser } from '../state';
import UserDetails from './UserDetails';
import Users from '../data/users';

const UserProfilePage = () => {

  const [{ user }, dispatch] = useStateValue();
  const { userName } = useParams<{ userName: string }>();

  useEffect(() => {
    const user = Users.find(user => user.username === userName);
    console.log(userName);
    console.log(user);
    if(user) {
      dispatch(setUser(user));
    }
  }, [userName]);

  if(!user){
    return <Col className="NoUserFound col-md-5 h-100 d-flex flex-column">No user found</Col>;
  }

  return (
    <Col className="UserProfilePage col-md-5 h-100 d-flex flex-column">
      <UserDetails user={user} />
      <PostList posts={user.posts} />
    </Col>
  );
};

export default UserProfilePage;