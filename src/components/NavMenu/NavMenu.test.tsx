import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NavMenu from './NavMenu';
import { MockState, reducer, State } from '../../state';
import { MockedProvider } from '@apollo/client/testing';


test('renders NavMenu correctly when logged in', async () => {
  const state: State = {
    loggedInUser: {
      user: {
        id: 'id',
        username: 'testUser',
        name: 'name',
        date: 'date',
        description: '',
        likes: []
      },
      token: null
    },
    searchResult: { users: [], posts: [] }
  };

  render(
    <BrowserRouter >
      <MockedProvider >
        <MockState mockState={state} reducer={reducer}>
          <NavMenu />
        </MockState>
      </MockedProvider>
    </BrowserRouter>
  );

  const profileLink = screen.getByText('Profile');
  const exploreLink = screen.getByText('Explore');
  const signOutLink = screen.getByText('Sign out').closest('a');

  expect(profileLink).toBeInTheDocument();
  expect(exploreLink).toBeInTheDocument();
  expect(signOutLink).not.toHaveStyle('display: none');
});

test('renders NavMenu correctly when not logged in', async () => {
  const state: State = {
    loggedInUser: {
      user: null,
      token: null
    },
    searchResult: { users: [], posts: [] }
  };

  render(
    <BrowserRouter >
      <MockedProvider >
        <MockState mockState={state} reducer={reducer}>
          <NavMenu />
        </MockState>
      </MockedProvider>
    </BrowserRouter>
  );

  const profileLink = screen.getByText('Profile');
  const exploreLink = screen.getByText('Explore');
  const signOutLink = screen.getByText('Sign out').closest('a');

  expect(profileLink).toBeInTheDocument();
  expect(exploreLink).toBeInTheDocument();
  expect(signOutLink).toHaveStyle('display: none');
});

