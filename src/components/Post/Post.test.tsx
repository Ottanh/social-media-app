import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Post from './Post';
import { Post as PostType } from '../../types';
import { MockedProvider } from '@apollo/client/testing';

describe('Post', () => {
  const post: PostType = {
    id: 'postId',
    user: {
      id: 'userID',
      name: 'testUser',
      username: 'testUserName'
    },
    date: 1658178000000,
    content: 'test',
    likes: 6,
    replies: ['1']
  };

  test('renders post data', async () => {
    render(
      <MockedProvider>
        <BrowserRouter>
          <Post post={post}/>
        </BrowserRouter>
      </MockedProvider>
    );

    const dateString = new Date(1658178000000).toLocaleDateString();
    const user = screen.getByText('testUser');
    const date = screen.getByText(dateString);
    const content = screen.getByText('test');
    const replyCount = screen.getByText('1');
    const likes = screen.getByText('6');

    expect(user).toBeInTheDocument();
    expect(date).toBeInTheDocument();
    expect(content).toBeInTheDocument();
    expect(replyCount).toBeInTheDocument();
    expect(likes).toBeInTheDocument();
  });
});