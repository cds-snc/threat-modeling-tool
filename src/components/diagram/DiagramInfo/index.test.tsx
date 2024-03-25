import { render, waitFor } from '@testing-library/react';
import DiagramInfo from './index';

describe('DiagramInfo', () => {
  it('renders without error', () => {
    waitFor(() => {
        render(<DiagramInfo />);
    }, { timeout: 1000});
  });
});