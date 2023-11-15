import { render, screen } from '@testing-library/react'
import UserEvent from '@testing-library/user-event';
import ProviderWrapper from '~/__tests__/utils/ProviderWrapper';

import { Complexity } from '~/pages/complexity/';

jest.mock('react-i18next', () => ({
	...jest.requireActual('react-i18next'),
	useTranslation: () => ({ t: (key: any) => key }),
}));

describe('View complexity', () => {

	test('Render complexity', async () => {
		const user = UserEvent.setup();

		render(
			<ProviderWrapper>
				<Complexity />
			</ProviderWrapper>
		);

		const title = screen.getByText(/complexity/i);
		expect(title).toBeInTheDocument();

		const editButton = screen.getByRole('button', { name: /edit/i });
		await user.click(editButton);
		expect(editButton).toBeInTheDocument();

		const hoursDay = screen.getByRole('checkbox');
		await user.click(hoursDay);
		expect(hoursDay).toBeInTheDocument();

	})
})