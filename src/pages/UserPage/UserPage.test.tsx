import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import UserPage, { FIND_POSTS, FIND_USER } from './UserPage';
import { act } from 'react-test-renderer';

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
            date: '13/05/2022',
            description: 'testaus',
            image: 'defaultUserPic.png'
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
              date: '14/05/2022',
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

  test('renders page header', async () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/olli111']}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <Routes>
            <Route path="/:username" element={<UserPage />}>
            </Route>
          </Routes>
        </MockedProvider>
      </MemoryRouter>
    );

    await act(async () => (
      await new Promise(resolve => setTimeout(resolve, 100))
    ));

    const title = container.querySelector('.PostTitle');
    expect(title).toHaveTextContent('@olli111');
  });

  test('renders user profile', async () => {
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

    const description = await screen.findByText('testaus');
    const joined = await screen.findByText('Joined: 13/05/2022');
    const name = await screen.findAllByText('Olli');

    expect(name).toHaveLength(2);
    expect(description).toBeInTheDocument();
    expect(joined).toBeInTheDocument();
  });

  test('renders user post', async () => {
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

    const postContent = await screen.findByText('testPost');
    expect(postContent).toBeInTheDocument();
  });


  test('renders page header', async () => {
    render(
      <MemoryRouter initialEntries={['/olli111']}>
        <MockedProvider >
          <Routes>
            <Route path="/:username" element={<UserPage />}>
            </Route>
          </Routes>
        </MockedProvider>
      </MemoryRouter>
    );

    const loading = screen.getByText('Loading...');
    expect(loading).toBeInTheDocument();
  });
});


