import { render, screen } from '@testing-library/react'

import Complexity from '~/pages/complexity/Complexity';

describe('View complexity', () => {

	test('Render complexity', () => {
		render(<Complexity />);

		const title = screen.getByText(/complexity/i);
		expect(title).toBeInTheDocument();

		const editButton = screen.getByRole('button', { name: /edit/i });
		expect(editButton).toBeInTheDocument();

		const hoursDay = screen.getByRole('checkbox');
		expect(hoursDay).toBeInTheDocument();

	})
})