import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PageContainer } from '~/components';

test('renders PageContainer component', () => {
  const { container } = render(<PageContainer>Page Content</PageContainer>);
  expect(container.firstChild).toBeInTheDocument();
});