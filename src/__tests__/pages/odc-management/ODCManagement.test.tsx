import { render, screen } from "@testing-library/react";
import UserEvent from "@testing-library/user-event";
import { ODCManagement } from "~/pages/odc-management";
import { useQuery } from 'react-query';

jest.mock('react-i18next', () => ({
	...jest.requireActual('react-i18next'),
	useTranslation: () => ({ t: (key: any) => key }),
}));

jest.mock('react-query', () => ({
	...jest.requireActual('react-query'),
	useQuery: jest.fn(),
}))

describe('ODC Management', () => {
	test('odc management happy path', async () => {

		const user = UserEvent.setup();

		(useQuery as jest.Mock).mockReturnValue({
			data: [
				{
					"id": "7fc01977-6e35-11ee-8624-a0291936d1c2",
					"name": "Philippines",
					"abbreviation": "PHODC",
					"location": "Pasig City, Metro Manila, Philippines",
					"holidays": null,
					"active": true
				}
			],
			error: null,
			isLoading: false,
		});

		render(
			<ODCManagement />
		);
		const addODC1 = screen.getByRole('button', { name: 'odc.button.add' });
		await user.click(addODC1);

		const inputFields = screen.queryAllByRole('textbox');
		await user.type(inputFields[0], 'Philippines2');
		await user.type(inputFields[1], 'PHODC');
		await user.type(inputFields[2], 'Pasig City, Metro Manila, Philippines');

		const addODC2 = screen.getByRole('button', { name: 'odc.button.add' });
		await user.click(addODC2)

		const odcNameGridCell = screen.getByRole('cell', { name: 'Philippines2' })
		expect(odcNameGridCell).toBeInTheDocument();

		const editButton = screen.getByRole('button', { name: 'edit-1' })
		await user.click(editButton);

		const holidayTable = screen.getByRole('table', { name: 'HolidayTable' })
		expect(holidayTable).toBeInTheDocument();

		const cancelButton = screen.getByRole('button', { name: 'odc.button.cancel' })
		await user.click(cancelButton);

		const title = screen.getByText(/odc management/i);
		expect(title).toBeInTheDocument();
	})
})