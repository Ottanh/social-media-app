import { gql, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import Textarea from 'react-expanding-textarea';

import './index.css';


const SEARCH = gql`
  query search($searchword: String!) {
    search (searchword: $searchword) { 
      users {
        name
        username
      }
      posts {
        user {
          name
        }
        content
      }
    }
  }
`;

const Search = () => {
  const [content, setContent] = useState<string>('');

  const searchQuery = useQuery(SEARCH, {
    variables: { searchword: content }
  });

  useEffect(() => {
    if(searchQuery.data){
      console.log(searchQuery);
    }
  }, [searchQuery.data]);


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