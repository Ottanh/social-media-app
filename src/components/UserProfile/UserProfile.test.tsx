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
        date: '18/6',
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

    const name = screen.getByText('olli');
    const username = screen.getByText('@olli111');
    const description = screen.getByText('moi');
    const joinedDate = screen.getByText('Joined: 18/6');


    expect(name).toBeInTheDocument();
    expect(username).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(joinedDate).toBeInTheDocument();
  });
});