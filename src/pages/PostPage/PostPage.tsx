import { gql, useQuery } from '@apollo/client';
import Post from '../../components/Post/Post';
import PageHeader from '../../components/PageHeader/PageHeader';
import { useParams } from 'react-router-dom';
import PostList from '../../components/PostList/PostList';
import PostForm from '../../components/Forms/PostForm/PostForm';
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
      image
      likes
      replies
    }
  }
`;

export const FIND_REPLIES = gql`
  query findPosts($replyTo: String) {
    findPosts (replyTo: $replyTo) { 
      id
      user {
        id
        name
        username
      }
      date
      content
      likes
      image
      replyTo
      replies
    }
  }
`;

const PostPage = () => {
  const { id } = useParams<{ id: string }>();

  const postQuery = useQuery(FIND_POST, {
    variables: { id }
  });

  const replyQuery = useQuery(FIND_REPLIES, {
    variables: { replyTo: id },
  });

  if(postQuery.loading || replyQuery.loading){
    return <div className="PostPage">Loading...</div>;
  }

  if(!postQuery.data || !replyQuery.data){
    return <div className="PostPage">Not found</div>;
  }

  return (
    <section className="PostPage">
      <PageHeader title="Post"/>
      <Post post={postQuery.data.findPost}/>
      <PostForm replyTo={id}  />
      <PostList posts={replyQuery.data.findPosts} />
    </section>
  );
};


export default PostPage;