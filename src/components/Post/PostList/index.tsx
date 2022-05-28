import { gql, useQuery } from '@apollo/client';
import { Post } from '../../../types';
import PostView from '../Post';
import './index.css';

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
      <PostView key={posts[0].id} post={posts[0]} />
      <PostView key={posts[1].id} post={posts[1]} />
      <PostView key={posts[2].id} post={posts[2]} />
      <PostView key={posts[3].id} post={posts[3]} />
      <PostView key={posts[4].id} post={posts[4]} />
    </div>
  );
};


/*
{posts.map((post: Post) => (
        <PostView key={post.id} post={post} />
      ))}
            <PostView key={posts[4].id} post={posts[4]} />
      <PostView key={posts[5].id} post={posts[5]} />
      <PostView key={posts[6].id} post={posts[6]} />
*/

export default PostList;