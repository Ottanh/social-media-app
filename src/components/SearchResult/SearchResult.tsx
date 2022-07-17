import { SearchResult as ResultType } from '../../types';
import PostList from '../PostList/PostList';
import UserDetails from '../UserProfile/UserProfile';

interface Props {
  from: 'user' | 'post';
  searchResult: ResultType
}

const SearchResult = ({ from, searchResult }: Props) => {
  if(from === 'user') {
    return (
      <div className="SearchResult">
        {
          searchResult.user.map((user) => {
            if(!user) return null;
            return <UserDetails id="userSearch" key={user.username} user={user} />;
          })
        }
      </div>
    );
  }

  if(from === 'post') {
    return <PostList posts={searchResult.post} />;
  }

  return null;
};


export default SearchResult;