import { gql, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { setSearchPost, setSearchUser, useStateValue } from '../state';

const SEARCH_USER = gql`
  query searchUser($searchword: String!) {
    searchUser(searchword: $searchword) { 
      id
      name
      username
      date
      image
    }
  }
`;

const SEARCH_POST = gql`
  query searchPost($searchword: String!) {
    searchPost(searchword: $searchword) { 
      id
        user {
          id
          name
          username
        }
        date
        content
        likes
        replies
    }
  }
`;

const useSearch = (def: string, from: string): [string, React.Dispatch<React.SetStateAction<string>>] => {
  const [value, setValue] = useState<string>(def);
  const [, dispatch] = useStateValue();

  const userQuery = useQuery(SEARCH_USER, {
    variables: { searchword: value },
    skip: from !== 'user'
  });

  const postQuery = useQuery(SEARCH_POST, {
    variables: { searchword: value },
    skip: from !== 'post'
  });

  useEffect(() => {
    if(userQuery.data){
      dispatch(setSearchUser(userQuery.data.searchUser));
    }
    if(postQuery.data){
      dispatch(setSearchPost(postQuery.data.searchPost));
    }

  },[userQuery.data, postQuery.data, value]);

  return [value, setValue];
};

export default useSearch;