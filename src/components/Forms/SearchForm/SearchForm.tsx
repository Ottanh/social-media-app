import { gql, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import Textarea from 'react-expanding-textarea';
import { setSearchPost, setSearchUser, useStateValue } from '../../../state';
import './SearchForm.css';

export const SEARCH_USER = gql`
  query searchUser($searchword: String!) {
    searchUser(searchword: $searchword) { 
      id
      name
      username
      date
      image
      followed
    }
  }
`;

export const SEARCH_POST = gql`
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
       image
    }
  }
`;

interface props {
  from: 'user' | 'post';
}

const SearchForm = ({ from }: props) => {
  const [value, setValue] = useState<string>('');
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

  const handleChange = (event: { target: { value: string; }; }) => {
    setValue(event.target.value);
  };
  
  return (
      <form className="search-form">
        <Textarea
          className="search-area" 
          placeholder="Search..."
          onChange={handleChange}
          value={value}
        />
      </form>
  );
};


export default SearchForm;