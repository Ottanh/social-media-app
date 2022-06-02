import { gql, useQuery } from '@apollo/client';
import './index.css';

export const FIND_USER = gql`
  query findUser($username: String!) {
    findUser (username: $username) { 
      username
      name
      date
      description
    }
  }
`;

interface Props {
  username: string | undefined
}

const UserDetails = ({ username }: Props) => {

  const userQuery = useQuery(FIND_USER, {
    variables: { username: username }
  });

  if(userQuery.loading ) {
    return <div className="UserProfilePage">Loading...</div>;
  } 
  if(!userQuery.data){
    return <div className="UserProfilePage">No user found</div>;
  }

  const user = userQuery.data.findUser;
  return (
    <div className="UserDetails">
      <div>
        <div className="Name">
          {user.name} 
        </div>
        <div className="UserName">
          @{user.username}
        </div>
      </div>
      <div>
        <p>
          {user.description}
        </p>
        <p>
          Joined: {user.date}
        </p>
      </div>
    </div>
  );
};

export default UserDetails;