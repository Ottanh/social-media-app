import PostList from "./UserProfilePage/PostList";
import user from './data/user';

const App = () => {
  return (
    <div className="App">
      <PostList user={user} />
    </div>
  );
}

export default App
