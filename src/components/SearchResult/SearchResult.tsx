import { useStateValue } from '../../state';
import { Post, User } from '../../types';

interface Props {
  type: string
}

const SearchResult = ({ type }: Props) => {

  const [state,] = useStateValue();

  return (
    <div >
      {type === 'users' && state.searchResult.users.map((user: User | undefined) => (
        <>
          {user &&
          <p key={user.username}>@{user.username}</p>}
        </>
      ))}
      {type === 'posts' && state.searchResult.posts.map((post: Post | undefined) => (
        <>
          {post &&
          <p key={post.id}>{post.content}</p>}
        </>
      ))}
    </div>
  );
};

export default SearchResult;