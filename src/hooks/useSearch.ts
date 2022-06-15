import { gql, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { setSearchResult, useStateValue } from '../state';

const SEARCH = gql`
  query search($searchword: String!) {
    search (searchword: $searchword) { 
      users {
        id
        name
        username
      }
      posts {
        id
        user {
          name
          username
        }
        date
        content
        likes
        replies
      }
    }
  }
`;

const useSearch = (def: string): [string, React.Dispatch<React.SetStateAction<string>>] => {
  const [value, setValue] = useState<string>(def);
  const [, dispatch] = useStateValue();

  const searchQuery = useQuery(SEARCH, {
    variables: { searchword: value }
  });

  useEffect(() => {
    if(searchQuery.data && searchQuery.data.search && value.length >= 3){
      dispatch(setSearchResult(searchQuery.data.search));
    }
    if(value.length < 3) {
      dispatch(setSearchResult({users: [], posts: []}));
    }
  },[searchQuery.data, value]);

  return [value, setValue];
};

export default useSearch;