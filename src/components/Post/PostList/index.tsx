import { gql, useQuery } from '@apollo/client';
import { Post } from '../../../types';
import PostView from '../Post';

export const FIND_POSTS = gql`
  query findPosts($username: String!) {
    findPosts (username: $username) { 
      id
      user {
        name
      }
      date
      content
      likes
    }
  }
`;

interface Props {
  username: string | undefined
}

const PostList = ({ username }: Props) => {

  const postQuery = useQuery(FIND_POSTS, {
    variables: { username: username }
  });

  if(postQuery.loading ) {
    return <div className="UserProfilePage">Loading...</div>;
  } 
  if(!postQuery.data){
    return <div className="UserProfilePage">No user found</div>;
  }

  const posts = postQuery.data.findPosts;
  return (
    <div className="PostList">
      {posts.map((post: Post) => (
        <PostView key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostList;