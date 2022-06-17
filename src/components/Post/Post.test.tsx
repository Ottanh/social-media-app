import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Post from './Post';
import { Post as PostType } from '../../types';
import { MockedProvider } from '@apollo/client/testing';


test('renders correctly', async () => {
  const post: PostType = {
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
};

  render(
    <MockedProvider>
      <BrowserRouter>
        <Post post={post}/>
      </BrowserRouter>
    </MockedProvider>
  );

  const user = screen.getByText('testUser');
  const date = screen.getByText('17/6');
  const content = screen.getByText('test');
  const replyCount = screen.getByText('1');
  const likes = screen.getByText('6');

  expect(user).toBeInTheDocument();
  expect(date).toBeInTheDocument();
  expect(content).toBeInTheDocument();
  expect(replyCount).toBeInTheDocument();
  expect(likes).toBeInTheDocument();
});