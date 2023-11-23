import { render, screen } from '@testing-library/react'
import UserEvent from '@testing-library/user-event';
import ProviderWrapper from '~/__tests__/utils/ProviderWrapper';
import { useQuery } from 'react-query';

import { Complexity } from '~/pages/complexity/';

jest.mock('react-i18next', () => ({
	...jest.requireActual('react-i18next'),
	useTranslation: () => ({ t: (key: any) => key }),
}));

jest.mock('react-query', () => ({
	...jest.requireActual('react-query'),
	useQuery: jest.fn(),
}))

describe('View complexity', () => {

	test('Render complexity', async () => {
		const user = UserEvent.setup();

		(useQuery as jest.Mock).mockReturnValue({
			data: [
				{
					"id": "e94d9393-0554-4df5-9ea6-9945bac489f6",
					"name": "Soft",
					"numberOfDays": "1-10",
					"numberOfFeatures": "2-20",
					"description": "Sample",
					"sample": "Sample",
					"active": true
				},
				{
					"id": "ed4dd5d2-ea1c-496a-ba34-b90fe549d245",
					"name": "Hard",
					"numberOfDays": "1-10",
					"numberOfFeatures": "2-20",
					"description": "Sample",
					"sample": "Sample",
					"active": true
				}
			],
			error: null,
			isLoading: false,
		});

		render(
			<ProviderWrapper>
				<Complexity />
			</ProviderWrapper>
		);

		const title = screen.getByText('COMPLEXITY');
		expect(title).toBeInTheDocument();

		const editButton = screen.getByRole('button', { name: /edit/i });
		await user.click(editButton);
		expect(editButton).toBeInTheDocument();

		const hoursDay = screen.getByRole('checkbox');
		await user.click(hoursDay);
		expect(hoursDay).toBeInTheDocument();

	})
})