import { SearchResult as ResultType } from '../../types';
import PostView from '../Post/Post';
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
    return (
      <div className="SearchResult">
        {
          searchResult.post.map((post) => {
            if(!post) return null;
            return <PostView key={post.id} post={post} />;
          })
        }
      </div>
    );
  }

  return null;
};


export default SearchResult;