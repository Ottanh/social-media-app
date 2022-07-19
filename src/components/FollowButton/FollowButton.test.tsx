import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import FollowButton, { GET_USERS_FOLLOWED } from './FollowButton';

describe('FollowButton', () => {

  const userData = {
    id: 'id',
    username: 'testUser',
    name: 'name',
    date: 1658178000000,
    description: '',
    image: 'defaultUserPic.jpg',
    likes: [],
    followed: ['user2']
  };


  const mocks = [
    [{
      request: {
        query: GET_USERS_FOLLOWED,
      },
      result: {
        data: {
          me: {
            id: 'user1',
            followed: []
          },
        },
      },
    }],
    [{
      request: {
        query: GET_USERS_FOLLOWED,
      },
      result: {
        data: {
          me: {
            id: 'user1',
            followed: [
              'id'
            ]
          },
        },
      },
    }]
  ];



  test('renders Follow button', async () => {
    render(
      <MemoryRouter >
        <MockedProvider mocks={mocks[0]} addTypename={false}>
          <FollowButton user={userData} />
        </MockedProvider>
      </MemoryRouter>
    );

    const follow = await screen.findByText('Follow');
    expect(follow).toBeInTheDocument();
  });

  test('renders Unfollow button', async () => {
    render(
      <MemoryRouter >
        <MockedProvider mocks={mocks[1]} addTypename={false}>
          <FollowButton user={userData} />
        </MockedProvider>
      </MemoryRouter>
    );


    const Unfollow = await screen.findByText('Unfollow');
    expect(Unfollow).toBeInTheDocument();
  });
});



  

