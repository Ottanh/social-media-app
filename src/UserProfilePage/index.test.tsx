import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import { FIND_POSTS, FIND_USER } from './index';
import UserProfilePage from './index';

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
          username: 'olli111',
          name: 'Olli',
          joined: '13/05/2022',
          description: 'testaus',
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
            content: 'Eka postaus',
            date: '13/05/2022',
            likes: 6,
            user: {
              name: 'Olli'
            }
          }
        ]
      }
    }
  }
];

test('renders correctly', async () => {
  render(
    <MemoryRouter initialEntries={['/olli111']}>
      <MockedProvider mocks={mocks} addTypename={false}>
        <Routes>
          <Route path="/:userName" element={<UserProfilePage />}>
          </Route>
        </Routes>
      </MockedProvider>
    </MemoryRouter>
  );

  expect(await screen.findByText('testaus'));
  expect(await screen.findAllByText('Olli')).toHaveLength(2);
  expect(await screen.findAllByRole('button')).toHaveLength(2);
  expect(await screen.findAllByText('13/05/2022', { exact: false })).toHaveLength(2);
  expect(await screen.findByText('Eka postaus'));
  expect(await screen.findByText('Likes: 6'));
});

