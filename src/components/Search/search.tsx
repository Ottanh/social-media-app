import { gql, useQuery } from '@apollo/client';
import { useState } from 'react';
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

  console.log('render search');

  const searchQuery = useQuery(SEARCH, {
    variables: { searchword: content }
  });

  const handleChange = (event: { target: { value: string; }; }) => {
    setContent(event.target.value);
  };
  

  return (
    <div className="ExploreContainer">
      <div className="SearchAreaContainer">
        <Textarea
          className="SearchArea" 
          placeholder="Search..."
          onChange={handleChange}
          value={content}
        />
      </div>
      {searchQuery.data && content.length > 0 &&
      <div >
        {searchQuery.data.search.users.map((user: { username: string }) => (<p key={user.username}>@{user.username}</p>))}
      </div>
      }
    </div>
  );
};


export default Search;