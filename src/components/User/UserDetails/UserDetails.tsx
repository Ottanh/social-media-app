import { gql, useQuery } from '@apollo/client';
import './index.css';

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
          <div className="fw-bold">
            {user.name} 
          </div>
          <div className="fw-light">
            @{user.username}
          </div>
        </div>
        <div>
          <p>
            {user.description}
          </p>
          <p>
            Joined: {user.joined}
          </p>
        </div>
    </div>
  );
};

export default UserDetails;