import { gql, useQuery } from '@apollo/client';
import Post from '../../components/Post/Post';

import './index.css';
import PageHeader from '../../components/PageHeader/PageHeader';
import { useParams } from 'react-router-dom';
import PostList from '../../components/Post/PostList';
import PostForm from '../../components/Post/PostForm';

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

  if(postQuery.loading){
    return <div className="Msg">Loading...</div>;
  }

  if(!postQuery.data){
    return <div className="Msg">Not found</div>;
  }

  return (
    <div className="PostPage">
      <PageHeader title="Post"/>
      <Post post={postQuery.data.findPosts[0]}/>
      <PostForm username={undefined} replyTo={id}  />
      <PostList username={undefined} replyTo={id} />
    </div>
  );
};


export default PostPage;