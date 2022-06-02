import { ChangeEvent, useState } from 'react';
import Search from '../../components/Forms/SearchForm/search';
import SearchResult from '../../components/SearchResult/SearchResult';
import './index.css';


const ExplorePage = () => {
  const [type, setType] = useState<string>('users');

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    setType(event.target.value);
  };

    return (
      <div className="ExplorePage">
        <div className="ExploreContainer">
          <Search/>
          <select onChange={handleChange}> 
            <option value="users" >Users</option>
            <option value="posts" >Posts</option>
          </select>
        </div>
        <SearchResult type={type}/>
      </div>
    );
};


export default ExplorePage;