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
      {type === 'users' && state.searchResult.users.map((user: User | undefined) => (
        <UserDetails key={user?.username} username={user?.username} />
      ))}
      {type === 'posts' && state.searchResult.posts.map((post: Post | undefined) => {
        if(!post) return null;
        return <PostView key={post.id} post={post} />;
      })}
    </div>
  );
};


/*
<>
          {user &&
          <p key={user.username}>@{user.username}</p>}
        </>

        <>
          {post &&
          <p key={post.id}>{post.content}</p>}
        </>

        */

export default SearchResult;