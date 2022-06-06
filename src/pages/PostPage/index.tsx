import { gql, useQuery } from '@apollo/client';
import Post from '../../components/Post/Post';

import './index.css';
import PageHeader from '../../components/PageHeader/PageHeader';
import { useParams } from 'react-router-dom';

export const FIND_POSTS = gql`
  query findPosts($id: String!) {
    findPosts (id: $id) { 
      id
      user {
        name
        username
      }
      date
      content
      likes
    }
  }
`;

const PostPage = () => {
  const { id } = useParams<{ id: string }>();

  const postQuery = useQuery(FIND_POSTS, {
    variables: { id }
  });

  return (
    <div className="PostPage">
      <PageHeader title="Post"/>
      {postQuery.loading && <div className="Msg">Loading...</div>}
      {!postQuery.data && <div className="Msg">Not found</div>}
      {postQuery.data && <Post post={postQuery.data.findPosts[0]}/>}
    </div>
  );
};


export default PostPage;