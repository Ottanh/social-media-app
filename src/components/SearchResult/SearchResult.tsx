import { useStateValue } from '../../state';
import { Post, User } from '../../types';
import PostView from '../Post/Post';
import UserDetails from '../UserDetails/UserDetails';


interface Props {
  type: string
}

const SearchResult = ({ type }: Props) => {
  const [{ searchResult }] = useStateValue();

  return (
    <div className="SearchResult">
      {type === 'users' && searchResult.users.map((user: User | undefined) => {
        if(!user) return null;
        return <UserDetails key={user?.username} user={user} />;
      })}
      {type === 'posts' && searchResult.posts.map((post: Post | undefined) => {
        if(!post) return null;
        return <PostView key={post.id} post={post} />;
      })}
    </div>
  );
};


export default SearchResult;