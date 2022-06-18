import { useState, MouseEvent } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { BsChatText } from 'react-icons/bs';
import PageHeader from '../../components/PageHeader/PageHeader';
import Search from '../../components/Forms/SearchForm/SearchForm';
import SearchResult from '../../components/SearchResult/SearchResult';
import './ExplorePage.css';
import { useStateValue } from '../../state';


const ExplorePage = () => {
  const [type, setType] = useState<'users' | 'posts'>('users');
  const [{ searchResult }] = useStateValue();

  const onClickPost = (event: MouseEvent<SVGElement>) => {
    event.preventDefault();
    setType('posts');
  };

  const onClickUser = (event: MouseEvent<SVGElement>) => {
    event.preventDefault();
    setType('users');
  };

  return (
    <section className="ExplorePage">
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
      <SearchResult type={type} searchResult={searchResult}/>
    </section>
  );
};


export default ExplorePage;