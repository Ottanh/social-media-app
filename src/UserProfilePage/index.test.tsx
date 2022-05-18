import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { reducer, StateProvider } from '../state';
import UserProfilePage from './index';

test('renders correctly', async () => {
  render(
    <MemoryRouter initialEntries={['/olli111']}>
      <StateProvider reducer={reducer}>
        <Routes>
          <Route path="/:userName" element={<UserProfilePage />}>
          </Route>
        </Routes>
      </StateProvider>
    </MemoryRouter>
  );

  expect(screen.getAllByText('moooi oon olli ja tää on mun description ja *********')).toHaveLength(1);
  expect(screen.getAllByText('Olli')).toHaveLength(3);
  expect(screen.getAllByRole('button')).toHaveLength(4);
  expect(screen.getAllByText('13/05/2022', { exact: false })).toHaveLength(3);
  expect(screen.getByText('Eka postaus'));
  expect(screen.getByText('Likes: 6'));
  expect(screen.getByText('Toinen postaus'));
  expect(screen.getByText('Likes: 1'));
});

