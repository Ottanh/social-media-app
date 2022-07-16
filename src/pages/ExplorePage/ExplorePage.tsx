import { useState, MouseEvent } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { BsChatText } from 'react-icons/bs';
import PageHeader from '../../components/PageHeader/PageHeader';
import Search from '../../components/Forms/SearchForm/SearchForm';
import SearchResult from '../../components/SearchResult/SearchResult';
import './ExplorePage.css';
import { useStateValue } from '../../state';


const ExplorePage = () => {
  const [from, setFrom] = useState<'user' | 'post'>('user');
  const [{ searchResult }] = useStateValue();

  const onClickPost = (event: MouseEvent<SVGElement>) => {
    event.preventDefault();
    setFrom('post');
  };

  const onClickUser = (event: MouseEvent<SVGElement>) => {
    event.preventDefault();
    setFrom('user');
  };

  return (
    <section className="ExplorePage">
      <PageHeader title="Explore" />
      <div className="ExploreContainer">
        <Search from={from}/>
        <BsChatText 
          className="SearchIcons" 
          data-testid="selectPost"
          size="1.3em" 
          onClick={onClickPost} 
          style={from === 'post' ? {'backgroundColor': 'rgba(108, 123, 149, 0.5)'} : {}} 
        />
        <AiOutlineUser 
          className="SearchIcons" 
          data-testid="selectUser"
          size="1.3em" 
          onClick={onClickUser} 
          style={from === 'user' ? {'backgroundColor': 'rgba(108, 123, 149, 0.5)'} : {}} 
        />
      </div>
      <SearchResult from={from} searchResult={searchResult}/>
    </section>
  );
};


export default ExplorePage;