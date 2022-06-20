import { SearchResult as ResultType } from '../../types';
import PostView from '../Post/Post';
import UserDetails from '../UserProfile/UserProfile';

interface Props {
  type: 'users' | 'posts';
  searchResult: ResultType
}

const SearchResult = ({ type, searchResult }: Props) => {
  if(type === 'users') {
    return (
      <div className="SearchResult">
        {
          searchResult.users.map((user) => {
            if(!user) return null;
            return <UserDetails id="userSearch" key={user.username} user={user} />;
          })
        }
      </div>
    );
  }

  if(type === 'posts') {
    return (
      <div className="SearchResult">
        {
          searchResult.posts.map((post) => {
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