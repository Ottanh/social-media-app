import { ChangeEvent, useState, MouseEvent } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { BsChatText } from 'react-icons/bs';
import PageHeader from '../../components/PageHeader/PageHeader';
import Search from '../../components/Search/SearchForm/SearchForm';
import SearchResult from '../../components/Search/SearchResult/SearchResult';
import './ExplorePage.css';


const ExplorePage = () => {
  const [type, setType] = useState<string>('users');

  const onClickPost = (event: MouseEvent<SVGElement>) => {
    event.preventDefault();
    setType('posts');
  };

  const onClickUser = (event: MouseEvent<SVGElement>) => {
    event.preventDefault();
    setType('users');
  };

    return (
      <div className="ExplorePage">
        <PageHeader title="Explore" />
        <div className="ExploreContainer">
          <Search/>
          <BsChatText 
            className="SearchIcons" 
            size="1.3em" 
            onClick={onClickPost} 
            style={type === 'posts' ? {'backgroundColor': 'rgba(108, 123, 149, 0.5)'} : {}} 
          />
          <AiOutlineUser 
            className="SearchIcons" 
            size="1.3em" 
            onClick={onClickUser} 
            style={type === 'users' ? {'backgroundColor': 'rgba(108, 123, 149, 0.5)'} : {}} 
          />
        </div>
        <SearchResult type={type}/>
      </div>
    );
};


export default ExplorePage;