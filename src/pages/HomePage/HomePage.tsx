import PostList from '../../components/PostList/PostList';
import PostForm from '../../components/Forms/PostForm/PostForm';
import PageHeader from '../../components/PageHeader/PageHeader';
import { gql, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useStateValue } from '../../state';
import './HomePage.css';

export const FIND_POSTS = gql`
  query findPosts($userIds: [String]) {
    findPosts (userIds: $userIds) { 
      id
      user {
        id
        name
        username
      }
      date
      content
      likes
      replyTo
      replies
    }
  }
`;

const GET_USERS_FOLLOWED = gql`
  query UsersFollowed {
    me {
      id
      followed
    }
  }
`;

const HomePage = () => {
  const [{ loggedInUser }] = useStateValue();
  const [followed, setFollowed] = useState();

  const followQuery = useQuery(GET_USERS_FOLLOWED);
  const postQuery = useQuery(FIND_POSTS, {
    variables: { userIds: followed }
  });

  useEffect(() => {
    if(followQuery.data) {
      setFollowed(followQuery.data.me.followed);
    }
  }, [followQuery.data]);

  if(postQuery.loading || followQuery.loading ) {
    return <div className="UserPage">Loading...</div>;
  } 

  if(!postQuery.data || !followQuery.data ) {
    return <div className="UserPage">Error</div>;
  } 

  return (
      <section className="HomePage">
        <PageHeader title={'Home'} />
        <PostForm username={loggedInUser?.username} />
        <PostList  posts={postQuery.data? postQuery.data.findPosts : []}/>
      </section>
  );
};


export default HomePage;