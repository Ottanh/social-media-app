import { gql, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import PageHeader from '../../components/PageHeader/PageHeader';
import UserList from '../../components/UserList/UserList';
import './FollowedUsersPage.css';

export const FIND_USER = gql`
  query findUser($username: String!) {
    findUser (username: $username) { 
      id
      username
      name
      date
      description
      image
      followed
    }
  }
`;

export const FIND_USERS = gql`
  query findUsers($userIds: [String]!) {
    findUsers (userIds: $userIds) { 
      id
      username
      name
      date
      description
      image
      followed
    }
  }
`;


const FollowedUsersPage = () => {
  const { username } = useParams<{ username: string }>();

  const userQuery = useQuery(FIND_USER, {
    variables: { username }
  });

  const followedQuery = useQuery(FIND_USERS, {
    skip: !userQuery.data,
    variables: { userIds: userQuery.data?.findUser.followed }
  });

  if(userQuery.loading || followedQuery.loading  ) {
    return <div className="UserPage">Loading...</div>;
  } 
  if(!userQuery.data || !followedQuery.data){
    return <div className="UserPage">Not found</div>;
  }

  return (
    <section className="FollowedUsersPage">
      <PageHeader title="Followed users" />
      <UserList users={followedQuery.data.findUsers} cssId="userSearch" />
    </section>
  );
};

export default FollowedUsersPage;