import { gql, useQuery } from '@apollo/client';
import './UserDetails.css';

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

interface Props {
  username: string | undefined
}

const UserDetails = ({ username }: Props) => {

  const userQuery = useQuery(FIND_USER, {
    variables: { username: username }
  });

  if(userQuery.loading ) {
    return <div className="UserDetails">Loading...</div>;
  } 
  if(!userQuery.data.findUser){
    return <div className="UserDetails">No user found</div>;
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