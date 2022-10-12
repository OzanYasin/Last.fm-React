import { render, screen } from '@testing-library/react';
import Artist from '../components/Artist';
import { AppProvider } from '../context';

describe('Async', () => {
  test('renders Artist component if request succeeds', async () => {
    render(
      <AppProvider>
        <Artist />
      </AppProvider>
    );
    const artistListElement = await screen.findByTestId('artist');
    expect(artistListElement).toBeInTheDocument();
  });
});
