import { ChangeEvent, useState } from 'react';
import PageHeader from '../../components/PageHeader/PageHeader';
import Search from '../../components/Search/SearchForm/SearchForm';
import SearchResult from '../../components/Search/SearchResult/SearchResult';
import './ExplorePage.css';


const ExplorePage = () => {
  const [type, setType] = useState<string>('users');

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    setType(event.target.value);
  };

    return (
      <div className="ExplorePage">
        <PageHeader title="Explore" />
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