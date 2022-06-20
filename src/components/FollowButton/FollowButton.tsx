import { gql, useQuery } from '@apollo/client';
import useFollow from '../../hooks/useFollow';
import { useStateValue } from '../../state';
import { User } from '../../types';

const GET_USERS_FOLLOWED = gql`
  query UsersFollowed {
    me {
      id
      followed
    }
  }
`;

interface Props {
  user: User;
}

const FollowButton = ({ user }: Props) => {
  const [{ loggedInUser },] = useStateValue();
  const followedQuery = useQuery(GET_USERS_FOLLOWED);
  const follow = useFollow();

  const clickFollow = () => {
    follow({
      variables: {
        id: user.id
      }
    });
  };

  const unFollow = () => {
    return null;
  };

  if(loggedInUser?.id === user.id) {
    return null;
  } else if (followedQuery.data?.me.followed.includes(user.id)) {
    return <button className="FollowedButton" onClick={unFollow}>Followed</button>;
  } else {
    return <button className="FollowButton" onClick={clickFollow}>Follow</button>;
  }
};

export default FollowButton;