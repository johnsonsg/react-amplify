import { render, screen } from '@testing-library/react';
import { App } from './App';

test('renders app heading', () => {
  render(<App signOut={() => {}} disableAutoFetch={true} />);
  const heading = screen.getByText(/my notes app/i);
  expect(heading).toBeInTheDocument();
});
