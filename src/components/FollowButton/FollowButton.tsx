import { ApolloError, gql, useQuery } from '@apollo/client';
import useFollow from '../../hooks/useFollow';
import { User } from '../../types';
import { MouseEvent } from 'react';

export const GET_USERS_FOLLOWED = gql`
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
  const followedQuery = useQuery(GET_USERS_FOLLOWED);
  const [follow, unFollow] = useFollow();

  const clickFollow = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    follow({
      variables: {
        id: user.id
      },
      onError: (e: ApolloError) => {
        console.log(e.message);
      }
    });
  };

  const clickUnFollow = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    unFollow({
      variables: {
        id: user.id
      },
      onError: (e: ApolloError) => {
        console.log(e.message);
      }
    });
  };

  if (followedQuery.data?.me.followed.includes(user.id)) {
    return <button className="FollowedButton" onClick={clickUnFollow}>Unfollow</button>;
  } else {
    return <button className="FollowButton" onClick={clickFollow}>Follow</button>;
  }
};

export default FollowButton;