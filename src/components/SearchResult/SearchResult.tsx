import { SearchResult as ResultType } from '../../types';
import PostList from '../PostList/PostList';
import UserList from '../UserList/UserList';

interface Props {
  from: 'user' | 'post';
  searchResult: ResultType
}

const SearchResult = ({ from, searchResult }: Props) => {
  if(from === 'user') {
    return <UserList users={searchResult.user} cssId="userSearch" />;
  }

  if(from === 'post') {
    return <PostList posts={searchResult.post} />;
  }

  return null;
};


export default SearchResult;