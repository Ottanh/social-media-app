import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import UserPage, { FIND_POSTS, FIND_USER } from './UserPage';

describe('PostPage', () => {
  const mocks = [
    {
      request: {
        query: FIND_USER,
        variables: {
          username: 'olli111',
        },
      },
      result: {
        data: {
          findUser: {
            id: 'userId',
            username: 'olli111',
            name: 'Olli',
            date: 1658178000000,
            description: 'testaus',
            image: 'defaultUserPic.png',
            followed: []
          }
        }
      }
    },
    {
      request: {
        query: FIND_POSTS,
        variables: {
          username: 'olli111',
        },
      },
      result: {
        data: {
          findPosts: [
            {
              id: 'postid1',
              content: 'testPost',
              date: 1658178000000,
              likes: 6,
              user: {
                id: 'userId',
                name: 'Olli',
                username: 'olli1111'
              },
              replies: [],
              image: null,
              replyTo: null
            }
          ]
        }
      }
    }
  ];

  const mocksError = [
    {
      request: {
        query: FIND_USER,
        variables: {
          username: 'olli111',
        },
      },
      error: new Error('An error occurred'),
    },
    {
      request: {
        query: FIND_POSTS,
        variables: {
          username: 'olli111',
        },
      },
      error: new Error('An error occurred'),
    }
  ];


  test('renders correctly', async () => {
    render(
      <MemoryRouter initialEntries={['/olli111']}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <Routes>
            <Route path="/:username" element={<UserPage />}>
            </Route>
          </Routes>
        </MockedProvider>
      </MemoryRouter>
    );

    const loading = screen.getByText('Loading...');
    expect(loading).toBeInTheDocument();

    const userProfile = await screen.findByText('testaus');
    const pageheader = await screen.findByTestId('page-header');
    const postContent = await screen.findByText('testPost');

    expect(userProfile).toBeInTheDocument();
    expect(pageheader).toBeInTheDocument();
    expect(postContent).toBeInTheDocument();
  });

  test('renders error no user found', async () => {
    render(
      <MemoryRouter initialEntries={['/olli111']}>
        <MockedProvider mocks={mocksError} addTypename={false}>
          <Routes>
            <Route path="/:username" element={<UserPage />}>
            </Route>
          </Routes>
        </MockedProvider>
      </MemoryRouter>
    );

    const postContent = await screen.findByText('No user found');
    expect(postContent).toBeInTheDocument();
  });
});


