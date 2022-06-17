import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NavigationMenu from './NavMenu';
import { MockedProvider } from '@apollo/client/testing';

test('renders navigation bar', async () => {
  render(
    <BrowserRouter >
      <MockedProvider>
          <NavigationMenu />
        </MockedProvider>
    </BrowserRouter>
  );

  const profileLink = screen.getByText('Profile');
  const exploreLink = screen.getByText('Explore');
  const signOutLink = screen.getByText('Sign out');

  expect(profileLink).toBeInTheDocument();
  expect(exploreLink).toBeInTheDocument();
  expect(signOutLink).toBeInTheDocument();
});

