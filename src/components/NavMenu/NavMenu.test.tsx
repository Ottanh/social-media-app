import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NavMenu from './NavMenu';
import { reducer, State, StateProvider } from '../../state';
import { MockedProvider } from '@apollo/client/testing';


describe('NavMenu when logged in', () => {
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

  test('renders all links', async () => {
    render(
      <BrowserRouter >
        <MockedProvider >
          <StateProvider mockState={state} reducer={reducer}>
            <NavMenu />
          </StateProvider>
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
});

describe('NavMenu when not logged in', () => {
  const state: State = {
    loggedInUser: null,
    searchResult: { user: [], post: [] },
    newPosts: []
  };

  test('renders all links except "Sign out"', async () => {
    render(
      <BrowserRouter >
        <MockedProvider >
          <StateProvider mockState={state} reducer={reducer}>
            <NavMenu />
          </StateProvider>
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
});
