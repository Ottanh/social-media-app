import { gql, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import Textarea from 'react-expanding-textarea';

import './index.css';


export const FIND_POSTS = gql`
  query findPosts($username: String!) {
    findPosts (username: $username) { 
      id
      user {
        name
      }
      date
      content
      likes
    }
  }
`;

const Search = () => {

  const [content, setContent] = useState<string>('');

  const postQuery = useQuery(FIND_POSTS, {
    variables: { username: content }
  });


  useEffect(() => {
    if(postQuery.data){
      console.log(postQuery);
    }
  }, [postQuery.data]);


  const handleChange = (event: { target: { value: string; }; }) => {
    setContent(event.target.value);
  };
  

  return (
    <div className="SearchAreaContainer">
      <Textarea
        className="SearchArea" 
        placeholder="Search..."
        onChange={handleChange}
        value={content}
      />
    </div>
  );
};


export default Search;