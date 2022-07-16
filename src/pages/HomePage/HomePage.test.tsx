import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import HomePage, { FIND_POSTS, GET_USERS_FOLLOWED } from './HomePage';
import { MockState, reducer, State } from '../../state';

describe('HomePage', () => {

  const state: State = {
    loggedInUser: {
        id: 'id',
        username: 'testUser',
        name: 'name',
        date: 'date',
        description: '',
        image: 'defaultUserPic.jpg',
        likes: [],
        followed: []
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

  const mocksError = [
    {
      request: {
        query: FIND_POSTS,
        variables: {
          userIds: ['user2'],
        },
      },
      error: new Error('An error occurred'),
    }, 
    {
      request: {
        query: GET_USERS_FOLLOWED,
      },
      error: new Error('An error occurred'),
    }
  ];

  test('renders PostForm', async () => {
    render(
      <MemoryRouter >
        <MockedProvider mocks={mocks} addTypename={false}>
          <MockState mockState={state} reducer={reducer}>
              <HomePage />
          </MockState>
        </MockedProvider>
      </MemoryRouter>
    );

    const textarea = await screen.findByRole('textbox');
    const sendButton = await screen.findByText('Send');
    expect(textarea).toBeInTheDocument();
    expect(sendButton).toBeInTheDocument();
  });

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

  test('renders Loading...', async () => {
    render(
      <MemoryRouter >
        <MockedProvider>
          <HomePage />
        </MockedProvider>
      </MemoryRouter>
    );

    const loading = screen.getByText('Loading...');
    expect(loading).toBeInTheDocument();
  });

  test('renders Error', async () => {
    render(
      <MemoryRouter >
        <MockedProvider mocks={mocksError} addTypename={false}>
          <MockState mockState={state} reducer={reducer}>
              <HomePage />
          </MockState>
        </MockedProvider>
      </MemoryRouter>
    );

    const error = await screen.findByText('Error');
    expect(error).toBeInTheDocument();
  });
});





