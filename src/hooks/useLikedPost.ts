import { gql, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';

const GET_USER = gql`
query Me {
  me {
    id
    username
    name
    date
    description
    likes
  }
}
`;


const useLikedPost = (id: string): boolean => {
  const userQuery = useQuery(GET_USER);
  const [likedPost, setLikedPost] = useState<boolean>(false);

  useEffect(() => {
    if(userQuery.data){
      setLikedPost(userQuery.data.me.likes.includes(id));
    }
  },[userQuery.data]);


  return likedPost;
};

export default useLikedPost;