import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import HomePage, { FIND_POSTS, GET_USERS_FOLLOWED } from './HomePage';
import { MockState, reducer, State } from '../../state';

describe('HomePage success state', () => {

  const state: State = {
    loggedInUser: {
        id: 'id',
        username: 'testUser',
        name: 'name',
        date: 'date',
        description: '',
        image: 'defaultUserPic.jpg',
        likes: []
      },
    searchResult: { user: [], post: [] },
    newPosts: []
  };


  const mocks = [
    {
      request: {
        query: FIND_POSTS,
        variables: {
          userIds: ['user2'],
        },
      },
      result: {
        data: {
          findPosts: [
              { 
              id: 'post1', 
              user: {
                id: 'user2',
                name: 'Olli',
                username: 'olli111'
              }, 
              date: '18/6',
              content: 'Post from followed user',
              image: null,
              likes: 1,
              replyTo: null,
              replies: ['post2'] 
            }
          ],
        },
      },
    },
    {
      request: {
        query: GET_USERS_FOLLOWED,
      },
      result: {
        data: {
          me: {
            id: 'user1',
            followed: [
              'user2'
            ]
          },
        },
      },
    }
  ];

  test('renders post from followed user', async () => {
    render(
      <MemoryRouter >
        <MockedProvider mocks={mocks} addTypename={false}>
          <MockState mockState={state} reducer={reducer}>
              <HomePage />
          </MockState>
        </MockedProvider>
      </MemoryRouter>
    );

    const content = await screen.findByText('Post from followed user');
    expect(content).toBeInTheDocument();
  });
});


describe('HomePage loading state', () => {
  test('renders Loading...', async () => {
    render(
      <MemoryRouter >
        <MockedProvider>
          <HomePage />
        </MockedProvider>
      </MemoryRouter>
    );

    const content = screen.getByText('Loading...');
    expect(content).toBeInTheDocument();
  });
});




