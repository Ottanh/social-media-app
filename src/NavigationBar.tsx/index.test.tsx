import { render, screen } from '@testing-library/react';
import { BrowserRouter, Router } from 'react-router-dom';
import NavigationBar from './index';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';

test('renders navigation bar', async () => {
  render(
    <BrowserRouter >
      <NavigationBar />
    </BrowserRouter>
  );

  const profileLink = screen.getByText('Profile');
  const exploreLink = screen.getByText('Explore');
  const settingsLink = screen.getByText('Settings');

  expect(profileLink).toBeInTheDocument();
  expect(exploreLink).toBeInTheDocument();
  expect(settingsLink).toBeInTheDocument();
});

test('navigates to correct URL when clicked', async () => {
  const history = createMemoryHistory();
  render(
    <Router location={history.location} navigator={history}>
      <NavigationBar />
    </Router>
  );

  const user = userEvent.setup();

  await user.click(screen.getByText('Profile'));
  expect(history.location.pathname).toBe('/olli111');

  await user.click(screen.getByText('Explore'));
  expect(history.location.pathname).toBe('/explore');

  await user.click(screen.getByText('Settings'));
  expect(history.location.pathname).toBe('/settings');

});