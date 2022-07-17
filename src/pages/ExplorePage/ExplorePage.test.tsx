import { MockedProvider } from '@apollo/client/testing';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { SEARCH_POST, SEARCH_USER } from '../../components/Forms/SearchForm/SearchForm';
import { State, reducer, StateProvider } from '../../state';
import ExplorePage from './ExplorePage';

describe('ExplorePage', () => {

  const state: State = {
    loggedInUser: null,
    searchResult: { user: [], post: [] },
    newPosts: []
  };

  const mocks = [
    {
      request: {
        query: SEARCH_POST,
        variables: {
          searchword: 'test',
        },
      },
      result: {
        data: {
          searchPost: [
            { 
              id: 'post1', 
              user: {
                id: 'user1',
                name: 'testName',
                username: 'testUser'
              }, 
              date: '14124124124',
              content: 'testPost',
              image: null,
              likes: 1,
              replies: [] 
            }
          ],
        },
      },
    },
    {
      request: {
        query: SEARCH_USER,
        variables: {
          searchword: 'testUser',
        },
      },
      result: {
        data: {
          searchUser: [
            {
              id: 'user1',
              name: 'testName',
              username: 'testUser',
              date: '42134214124',
              image: null
            }
          ],
        },
      },
    }
  ];

  test('renders correctly', async () => {
    render(
      <MemoryRouter >
        <MockedProvider mocks={mocks} addTypename={false}>
          <StateProvider mockState={state} reducer={reducer}>
              <ExplorePage />
          </StateProvider>
        </MockedProvider>
      </MemoryRouter>
    );

    const textarea = screen.getByRole('textbox');
    const userButton = screen.getByTestId('selectUser');
    const postButton = screen.getByTestId('selectPost');
    const pageheader = await screen.findByTestId('page-header');

    expect(pageheader).toBeInTheDocument();
    expect(textarea).toBeInTheDocument();
    expect(userButton).toBeInTheDocument();
    expect(postButton).toBeInTheDocument();
  });

  test('search for users', async () => {
    render(
      <MemoryRouter >
        <MockedProvider mocks={mocks} addTypename={false}>
          <StateProvider mockState={state} reducer={reducer}>
              <ExplorePage />
          </StateProvider>
        </MockedProvider>
      </MemoryRouter>
    );

    const textarea = screen.getByRole('textbox');

    const user = userEvent.setup();
    await user.click(textarea);
    await user.keyboard('testUser');
    const result = await screen.findByText('testName');
    expect(result).toBeInTheDocument();
  });

  test('search for posts', async () => {
    render(
      <MemoryRouter >
        <MockedProvider mocks={mocks} addTypename={false}>
          <StateProvider mockState={state} reducer={reducer}>
              <ExplorePage />
          </StateProvider>
        </MockedProvider>
      </MemoryRouter>
    );

    const textarea = screen.getByRole('textbox');
    const postButton = screen.getByTestId('selectPost');

    const user = userEvent.setup();
    await user.click(postButton);
    await user.click(textarea);
    await user.keyboard('test');
    const result = await screen.findByText('testPost');
    expect(result).toBeInTheDocument();
  });


});