import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import EntryButtons from './EntryButtons';

describe('EntryButtons', () => {
  test('Contains both Login and Register buttons', async () => {
    render(
      <BrowserRouter>
        <EntryButtons/>
      </BrowserRouter>
    );
  
    const buttons = screen.getAllByRole('button');
    expect(buttons[0]).toHaveTextContent('Login');
    expect(buttons[1]).toHaveTextContent('Register');
  });
});