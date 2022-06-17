import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PostList from './PostList';
import { Post as PostType } from '../../types';
import { MockedProvider } from '@apollo/client/testing';


test('renders correctly', async () => {
  const posts: PostType[] = [{
    id: 'postId',
    user: {
      id: 'userID',
      name: 'testUser',
      username: 'testUserName'
    },
    date: '17/6',
    content: 'test',
    likes: 6,
    replies: ['1']
  },
  {
    id: 'postId2',
    user: {
      id: 'userID2',
      name: 'testUser2',
      username: 'testUserName2'
    },
    date: '17/6/2',
    content: 'test2',
    likes: 62,
    replies: ['1','2']
  }];

  render(
    <MockedProvider>
      <BrowserRouter>
        <PostList posts={posts}/>
      </BrowserRouter>
    </MockedProvider>
  );

  const post1 = screen.getByText('test');
  const post2 = screen.getByText('test');

  expect(post1).toBeInTheDocument();
  expect(post2).toBeInTheDocument();

});