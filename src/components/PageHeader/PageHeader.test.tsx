import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PageHeader from './PageHeader';


test('renders correctly', async () => {
  const { container }  = render(
    <BrowserRouter>
      <PageHeader title="testi420"/>
    </BrowserRouter>
  );

  const backArrow = container.querySelector('[class="BackArrow"]');
  const title = screen.getByText('testi420');
  
  expect(backArrow).toBeInTheDocument();
  expect(title).toBeInTheDocument();
});