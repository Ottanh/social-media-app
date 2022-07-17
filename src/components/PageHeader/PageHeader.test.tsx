import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PageHeader from './PageHeader';


describe('PageHeader', () => {
  test('renders back arrow and title', async () => {
    const { container }  = render(
      <BrowserRouter>
        <PageHeader title="testi420"/>
      </BrowserRouter>
    );

    const backArrow = container.querySelector('[class="BackArrow"]');
    const title = screen.getByText('testi420');
    const testid = screen.getByTestId('page-header');
    
    expect(backArrow).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(testid).toBeInTheDocument();
  });
});