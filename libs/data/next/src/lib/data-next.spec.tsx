import { render } from '@testing-library/react';

import DataNext from './data-next';

describe('DataNext', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DataNext />);
    expect(baseElement).toBeTruthy();
  });
});
