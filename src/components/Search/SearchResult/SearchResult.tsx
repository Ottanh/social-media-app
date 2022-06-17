import { useStateValue } from '../../../state';
import { Post, User } from '../../../types';
import PostView from '../../Post/PostView/PostView';
import UserDetails from '../../User/UserDetails/UserDetails';


interface Props {
  type: string
}

const SearchResult = ({ type }: Props) => {
  const [state,] = useStateValue();

  return (
    <div className="SearchResult">
      {type === 'users' && state.searchResult.users.map((user: User | undefined) => {
        if(!user) return null;
        return <UserDetails key={user?.username} user={user} />;
      })}
      {type === 'posts' && state.searchResult.posts.map((post: Post | undefined) => {
        if(!post) return null;
        return <PostView key={post.id} post={post} />;
      })}
    </div>
  );
};


export default SearchResult;