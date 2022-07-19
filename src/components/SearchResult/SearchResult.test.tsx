import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { SearchResult as SearchType } from '../../types';
import { MockedProvider } from '@apollo/client/testing';
import SearchResult from './SearchResult';

describe('SearchResult', () => {
  const searchResult: SearchType = {
    user: [
      {
        id: 'userId',
        name: 'olli',
        username: 'olli111',
        date: 1658178000000,
        description: 'moi',
        image: 'defaultUserPic.jpg',
        likes: ['111'],
        followed: []
      }
    ],
    post: [
      {
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
      },
      {
        id: 'postId2',
        user: {
          id: 'userID2',
          name: 'testUser2',
          username: 'testUserName2'
        },
        date: 1658178000000,
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
          <SearchResult from="user" searchResult={searchResult} />
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
          <SearchResult from="post" searchResult={searchResult} />
        </BrowserRouter>
      </MockedProvider>
    );

    const post1 = screen.getByText('test');
    const post2 = screen.getByText('test2');

    expect(post1).toBeInTheDocument();
    expect(post2).toBeInTheDocument();
  });
});