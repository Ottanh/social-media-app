import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { User } from '../../types';
import { MockedProvider } from '@apollo/client/testing';
import UserDetails from './UserProfile';

describe('User details', () => {
  const user: User = {
        id: 'userId',
        name: 'olli',
        username: 'olli111',
        date: 1658178000000,
        description: 'moi',
        image: 'defaultUserPic.jpg',
        likes: ['111'],
        followed: []
  };

  test('renders correctly', async () => {
    render(
      <MockedProvider>
        <BrowserRouter>
          <UserDetails user={user} />
        </BrowserRouter>
      </MockedProvider>
    );

    const dateString = `Joined: ${new Date(1658178000000).toLocaleDateString()}`;
    const name = screen.getByText('olli');
    const username = screen.getByText('@olli111');
    const description = screen.getByText('moi');
    const joinedDate = screen.getByText(dateString);

    expect(name).toBeInTheDocument();
    expect(username).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(joinedDate).toBeInTheDocument();
  });
});