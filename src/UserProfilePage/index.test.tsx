import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import { FIND_USER } from './index';
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
          posts: [
            {
              id: 'postid1',
              content: 'Eka postaus',
              date: '13/05/2022',
              likes: 6,
              username: 'olli111',
              user: 'Olli'
            }
          ]
        }
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

  await new Promise(resolve => setTimeout(resolve, 1000)); 

  expect(screen.getByText('testaus'));
  expect(screen.getAllByText('Olli')).toHaveLength(2);
  expect(screen.getAllByRole('button')).toHaveLength(2);
  expect(screen.getAllByText('13/05/2022', { exact: false })).toHaveLength(2);
  expect(screen.getByText('Eka postaus'));
  expect(screen.getByText('Likes: 6'));
});

