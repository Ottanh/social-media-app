import { gql, useQuery } from '@apollo/client';
import Post from '../../components/Post/PostView/PostView';
import PageHeader from '../../components/PageHeader/PageHeader';
import { useParams } from 'react-router-dom';
import PostList from '../../components/Post/PostList/PostList';
import PostForm from '../../components/Post/PostForm/PostForm';
import './PostPage.css';

export const FIND_POST = gql`
  query findPost($id: String!) {
    findPost(id: $id) { 
      id
      user {
        name
        username
      }
      date
      content
      likes
      replies
    }
  }
`;

const PostPage = () => {
  const { id } = useParams<{ id: string }>();

  const postQuery = useQuery(FIND_POST, {
    variables: { id }
  });

  if(postQuery.loading){
    return <div className="Msg">Loading...</div>;
  }

  if(!postQuery.data || !postQuery.data.findPost){
    return <div className="Msg">Not found</div>;
  }

  return (
    <section className="PostPage">
      <PageHeader title="Post"/>
      <Post post={postQuery.data.findPost}/>
      <PostForm username={undefined} replyTo={id}  />
      <PostList username={undefined} replyTo={id} />
    </section>
  );
};


export default PostPage;