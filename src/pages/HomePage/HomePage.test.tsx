import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import HomePage, { FIND_POSTS, GET_USERS_FOLLOWED } from './HomePage';
import { reducer, State, StateProvider } from '../../state';
import { CREATE_POST } from '../../hooks/useCreatePost';
import userEvent from '@testing-library/user-event';

describe('HomePage', () => {
  const state: State = {
    loggedInUser: {
        id: 'id',
        username: 'testUser',
        name: 'name',
        date: 1658178000000,
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
              date: 1658178000000,
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
            id: 'id',
            followed: [
              'user2'
            ]
          },
        },
      },
    },
    {
      request: {
        query: CREATE_POST,
        variables: {
          content: 'newPost'
        }
      },
      result: {
        data: {
          createPost: {
            id: 'postId',
            date: 1658178000000,
            content: 'newPost',
            image: null,
            likes: 0,
            replyTo: null,
            replies: [],
            user: {
              id: 'id',
              name: 'name',
              username: 'testUserName'
            }
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

  test('renders correctly', async () => {
    render(
      <MemoryRouter >
        <MockedProvider mocks={mocks} addTypename={false}>
          <StateProvider mockState={state} reducer={reducer}>
              <HomePage />
          </StateProvider>
        </MockedProvider>
      </MemoryRouter>
    );

    const loading = screen.getByText('Loading...');
    expect(loading).toBeInTheDocument();

    const textarea = await screen.findByRole('textbox');
    const sendButton = await screen.findByText('Send');
    const content = await screen.findByText('Post from followed user');
    const pageheader = await screen.findByTestId('page-header');

    expect(pageheader).toBeInTheDocument();
    expect(content).toBeInTheDocument();
    expect(textarea).toBeInTheDocument();
    expect(sendButton).toBeInTheDocument();
  });

  test('renders Error', async () => {
    render(
      <MemoryRouter >
        <MockedProvider mocks={mocksError} addTypename={false}>
          <StateProvider mockState={state} reducer={reducer}>
              <HomePage />
          </StateProvider>
        </MockedProvider>
      </MemoryRouter>
    );

    const error = await screen.findByText('Error');
    expect(error).toBeInTheDocument();
  });

  test('create new post and render it', async () => {
    render(
      <MemoryRouter >
        <MockedProvider mocks={mocks} addTypename={false}>
          <StateProvider mockState={state} reducer={reducer}>
              <HomePage />
          </StateProvider>
        </MockedProvider>
      </MemoryRouter>
    );

    const textarea = await screen.findByRole('textbox');
    const sendButton = await screen.findByText('Send');

    const user = userEvent.setup();
    await user.click(textarea);
    await user.keyboard('newPost');
    await user.click(sendButton);

    const newPost = await screen.findByText('newPost');
    expect(newPost).toBeInTheDocument();
  });
});





