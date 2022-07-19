import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import PostPage, { FIND_POST, FIND_REPLIES } from './PostPage';
import userEvent from '@testing-library/user-event';
import { CREATE_POST } from '../../hooks/useCreatePost';

describe('PostPage', () => {
  let findRepliesCalled = false;
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
            date: 1658178000000,
            content: 'Original post',
            image: null,
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
      result: () => {
        if (findRepliesCalled) return replies[1];
        else {
          findRepliesCalled = true;
          return replies[0];
        }
      },
    },
    {
      request: {
        query: CREATE_POST,
        variables: {
          content: 'newReply',
          replyTo: 'post1'
        }
      },
      result: {
        data: {
          createPost: {
            id: 'postId',
            date: 1658178000000,
            content: 'newReply',
            image: null,
            likes: 0,
            replyTo: 'post1',
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

  // 1. Original reponse, 2. Refetch response
  const replies = [
    {
      data: {
        findPosts: [
          { 
            id: 'post2', 
            user: {
              id: 'userId2',
              name: 'Tuomas',
              username: 'tume'
            }, 
            date: 1658178000000,
            content: 'Reply post',
            image: null,
            likes: 2,
            replies: [],
            replyTo: 'post1'
          },
        ],
      },
    },
    {
      data: {
        findPosts: [
          { 
            id: 'post2', 
            user: {
              id: 'userId2',
              name: 'Tuomas',
              username: 'tume'
            }, 
            date: 1658178000000,
            content: 'Reply post',
            image: null,
            likes: 2,
            replies: [],
            replyTo: 'post1'
          },
          {
            id: 'post3',
            date: 1658178000000,
            content: 'newReply',
            image: null,
            likes: 0,
            replyTo: 'post1',
            replies: [],
            user: {
              id: 'id',
              name: 'name',
              username: 'testUserName'
            }
          }
        ],
      },
    }
  ];

  const mocksError = [
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
    },
    {
      request: {
        query: CREATE_POST,
        variables: {
          content: 'newReply',
          replyTo: 'post1'
        },
      },
      error: new Error('An error occurred'),
    },
  ];

  
  test('renders correctly', async () => {
    render(
      <MemoryRouter initialEntries={['/post/post1']}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <Routes>
            <Route path="post/:id" element={<PostPage />} />
          </Routes>
        </MockedProvider>
      </MemoryRouter>
    );

    const loading = screen.getByText('Loading...');
    expect(loading).toBeInTheDocument();
    
    const original = await screen.findByText('Original post');
    const reply = await screen.findByText('Reply post');
    const pageheader = await screen.findByTestId('page-header');

    expect(original).toBeInTheDocument();
    expect(reply).toBeInTheDocument();
    expect(pageheader).toBeInTheDocument();
  });

  test('renders error not found', async () => {
    render(
      <MemoryRouter initialEntries={['/post/post1']}>
        <MockedProvider mocks={mocksError} addTypename={false}>
          <Routes>
            <Route path="post/:id" element={<PostPage />} />
          </Routes>
        </MockedProvider>
      </MemoryRouter>
    );

    const content = await screen.findByText('Not found');
    expect(content).toBeInTheDocument();
  });

  test('create new reply and render it', async () => {
    render(
      <MemoryRouter initialEntries={['/post/post1']}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <Routes>
            <Route path="post/:id" element={<PostPage />} />
          </Routes>
        </MockedProvider>
      </MemoryRouter>
    );

    const textarea = await screen.findByRole('textbox');
    const sendButton = await screen.findByText('Send');

    const user = userEvent.setup();
    await user.click(textarea);
    await user.keyboard('newReply');
    await user.click(sendButton);

    const newPost = await screen.findByText('newReply');
    expect(newPost).toBeInTheDocument();
  });
});





