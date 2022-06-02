import Search from '../../components/Forms/SearchForm/search';
import SearchResult from '../../components/SearchResult/SearchResult';
import './index.css';


const ExplorePage = () => {
    return (
      <div className="ExplorePage">
        <div className="ExploreContainer">
          <Search/>
        </div>
        <SearchResult type="users"/>
      </div>
    );
};


export default ExplorePage;