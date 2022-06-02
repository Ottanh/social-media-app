import { gql, useQuery } from '@apollo/client';
import { useNavigate, useParams } from 'react-router-dom';
import Post from '../../components/Post/Post';
import { VscArrowLeft } from 'react-icons/vsc';

import './index.css';

export const FIND_POSTS = gql`
  query findPosts($id: String!) {
    findPosts (id: $id) { 
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

const PostPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const postQuery = useQuery(FIND_POSTS, {
    variables: { id }
  });

  const onClick = () => {
    navigate(-1);
  };

  return (
    <div className="PostPage">
      <div className="PostPageHeader">
        <VscArrowLeft className="arrow" size="1.5rem" onClick={onClick}/>
        <p className="PostTitle">Post</p>
      </div>
      {postQuery.loading && <div className="Msg">Loading...</div>}
      {!postQuery.data && <div className="Msg">Not found</div>}
      {postQuery.data && <Post post={postQuery.data.findPosts[0]}/>}
    </div>
  );
};


export default PostPage;