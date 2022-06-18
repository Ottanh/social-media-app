import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { SearchResult as SearchType } from '../../types';
import { MockedProvider } from '@apollo/client/testing';
import SearchResult from './SearchResult';

const searchResult: SearchType = {
  users: [
    {
      id: 'userId',
      name: 'olli',
      username: 'olli111',
      date: '18/6',
      description: 'moi',
      likes: ['111']
    }
  ],
  posts: [
    {
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
    }
  ]
};


test('renders users correctly', async () => {
  render(
    <MockedProvider>
      <BrowserRouter>
        <SearchResult type="users" searchResult={searchResult} />
      </BrowserRouter>
    </MockedProvider>
  );

  const name = screen.getByText('olli');
  const description = screen.getByText('moi');

  expect(name).toBeInTheDocument();
  expect(description).toBeInTheDocument();
});

test('renders posts correctly', async () => {
  render(
    <MockedProvider>
      <BrowserRouter>
        <SearchResult type="posts" searchResult={searchResult} />
      </BrowserRouter>
    </MockedProvider>
  );

  const post1 = screen.getByText('test');
  const post2 = screen.getByText('test2');

  expect(post1).toBeInTheDocument();
  expect(post2).toBeInTheDocument();
});