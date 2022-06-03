import { gql, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import Textarea from 'react-expanding-textarea';
import { setSearchResult, useStateValue } from '../../../state';
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

const SearchForm = () => {
  const [content, setContent] = useState<string>('');
  const [, dispatch] = useStateValue();

  const searchQuery = useQuery(SEARCH, {
    variables: { searchword: content }
  });

  useEffect(() => {
    if(searchQuery.data && searchQuery.data.search && content.length >= 3){
      dispatch(setSearchResult(searchQuery.data.search));
    }
    if(content.length < 3) {
      dispatch(setSearchResult({users: [], posts: []}));
    }
  },[searchQuery.data, content]);

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


export default SearchForm;