import { MockedProvider } from '@apollo/client/testing';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import EntryPage from './EntryPage';


describe('ExplorePage', () => {
  test('renders LoginForm', async () => {
    render(
      <MockedProvider>
        <MemoryRouter>
          <EntryPage />
        </MemoryRouter>
      </MockedProvider>
    );

    const loginForm =screen.getByText('Log in').closest('form');
    expect(loginForm).toBeInTheDocument();
  });

  test('renders RegisterForm', async () => {
    render(
      <MockedProvider>
        <MemoryRouter>
          <EntryPage />
        </MemoryRouter>
      </MockedProvider>
    );

    const user = userEvent.setup();
    const singUpButton = screen.getByText('Sign up');
    await user.click(singUpButton);

    const registerForm = screen.getByText('Register').closest('form');
    expect(registerForm).toBeInTheDocument();
  });

});