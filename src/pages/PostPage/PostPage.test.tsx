import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import PostPage, { FIND_POST, FIND_REPLIES } from './PostPage';

describe('PostPage success state', () => {
  const mocks = [
    {
      request: {
        query: FIND_POST,
        variables: {
          id: 'post1',
        },
      },
      result: {
        data: {
          findPost: { 
            id: 'post1', 
            user: {
              name: 'Olli',
              username: 'olli111'
            }, 
            date: '18/6',
            content: 'Original post',
            likes: 1,
            replies: ['post2'] 
          },
        },
      },
    },
    {
      request: {
        query: FIND_REPLIES,
        variables: {
          replyTo: 'post1',
        },
      },
      result: {
        data: {
          findPosts: [
            { 
              id: 'post2', 
              user: {
                id: 'userId2',
                name: 'Tuomas',
                username: 'tume'
              }, 
              date: '18/6',
              content: 'Reply post',
              likes: 2,
              replies: ['post2'],
              replyTo: 'post1'
            },
          ],
        },
      },
    }
  ];

  test('renders original post', async () => {
    render(
      <MemoryRouter initialEntries={['/post/post1']}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <Routes>
            <Route path="post/:id" element={<PostPage />} />
          </Routes>
        </MockedProvider>
      </MemoryRouter>
    );

    const content = await screen.findByText('Original post');
    expect(content).toBeInTheDocument();
  });

  test('renders reply', async () => {
    render(
      <MemoryRouter initialEntries={['/post/post1']}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <Routes>
            <Route path="post/:id" element={<PostPage />} />
          </Routes>
        </MockedProvider>
      </MemoryRouter>
    );

    const content = await screen.findByText('Reply post');
    expect(content).toBeInTheDocument();
  });

});

describe('PostPage loading state', () => {
  const mocks = [
    {
      request: {
        query: FIND_POST,
        variables: {
          id: 'post1',
        },
      },
    }, 
    {
      request: {
        query: FIND_REPLIES,
        variables: {
          replyTo: 'post1',
        },
      },
    }
  ];

  test('renders Loading...', async () => {
    render(
      <MemoryRouter initialEntries={['/post/post1']}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <Routes>
            <Route path="post/:id" element={<PostPage />} />
          </Routes>
        </MockedProvider>
      </MemoryRouter>
    );

    const content = screen.getByText('Loading...');
    expect(content).toBeInTheDocument();
  });

});


describe('PostPage error state', () => {
  const mocks = [
    {
      request: {
        query: FIND_POST,
        variables: {
          id: 'post1',
        },
      },
      error: new Error('An error occurred'),
    }, 
    {
      request: {
        query: FIND_REPLIES,
        variables: {
          replyTo: 'post1',
        },
      },
      error: new Error('An error occurred'),
    }
  ];

  test('renders not found', async () => {
    render(
      <MemoryRouter initialEntries={['/post/post1']}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <Routes>
            <Route path="post/:id" element={<PostPage />} />
          </Routes>
        </MockedProvider>
      </MemoryRouter>
    );

    const content = await screen.findByText('Not found');
    expect(content).toBeInTheDocument();
  });

});



