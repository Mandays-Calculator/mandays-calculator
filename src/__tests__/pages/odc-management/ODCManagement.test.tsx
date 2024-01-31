import { cleanup, render, screen } from "@testing-library/react";
import { ReactElement } from "react";
import UserEvent from "@testing-library/user-event";
import { ODCManagement } from "~/pages/odc-management";
import * as query from '~/queries/odc/ODC';
import * as mutate from '~/mutations/odc/ODC';
import { data, holidayList } from './utils';
// import { data } from './utils'
import ProviderWrapper from "~/__tests__/utils/ProviderWrapper";

jest.mock('react-i18next', () => ({
	...jest.requireActual('react-i18next'),
	useTranslation: () => ({ t: (key: any) => key }),
}));

const renderElement = (element: ReactElement) => {
	render(
		<ProviderWrapper>
			{element}
		</ProviderWrapper>
	);
	return UserEvent.setup();
}

afterEach(() => {
	cleanup();
})

describe('ODC Management', () => {
	test('Page loader', async () => {
		jest.spyOn(query, 'useODCList').mockImplementation(
			jest.fn().mockReturnValue({
				isLoading: true
			})
		)
		renderElement(<ODCManagement />);

		const pageLoader = screen.getByRole('progressbar');
		expect(pageLoader).toBeInTheDocument();
	})

	test('add odc', async () => {
		jest.spyOn(query, 'useODCList').mockImplementation(
			jest.fn().mockReturnValue({
				data: data,
			})
		)
		const user = renderElement(
			<ODCManagement />
		)
		const label = screen.getByText('odc.management.label')
		expect(label).toBeInTheDocument();

		const textField = screen.getByRole('textbox')
		await user.type(textField, 'Philippines')

		const addButton = screen.getByRole('button', { name: 'odc.btnlabel.addOdc' })
		await user.click(addButton);

		const [name, location, abbreviation] = screen.getAllByRole('textbox')
		expect(name).toBeInTheDocument();
		expect(location).toBeInTheDocument();

		await user.type(name, 'Philippines');
		await user.type(location, 'location');
		await user.type(abbreviation, 'PHODC');

		await user.click(screen.getByRole('button', { name: 'odc.btnlabel.addOdc' }));

		await user.type(name, 'name')

		await user.click(screen.getByRole('button', { name: 'odc.btnlabel.addOdc' }));

		await user.type(abbreviation, 'abbreviation');

		await user.click(screen.getByRole('button', { name: 'odc.btnlabel.addHoliday' }))

		await user.click(screen.getByRole('button', { name: 'odc.btnlabel.addOdc' }));

		expect(label).toBeInTheDocument();
	})

	test('odc edit', async () => {
		jest.spyOn(query, 'useODCList').mockImplementation(
			jest.fn().mockReturnValue({
				data: data,
			})
		)
		jest.spyOn(query, 'useHolidayList').mockImplementation(
			jest.fn().mockReturnValue({
				data: holidayList,
			})
		)
		jest.spyOn(mutate, 'useUpdateHoliday').mockImplementation(
			jest.fn().mockReturnValue({
				data: {
					status: 200,
				},
				mutate: jest.fn()
			})
		)
		jest.spyOn(mutate, 'useDeleteHoliday').mockImplementation(
			jest.fn().mockReturnValue({
				data: {
					status: 200,
				},
				mutate: jest.fn()
			})
		)

		const user = renderElement(
			<ODCManagement />
		);
		expect(screen.getByText('Philippines')).toBeInTheDocument();

		await user.click(screen.getByRole('button', { name: /edit/i }));

		const cancelButton = screen.getByRole('button', { name: 'odc.btnlabel.cancel' });
		await user.click(cancelButton);

		await user.click(screen.getByRole('button', { name: /edit/i }));

		await user.click(screen.getByRole('button', { name: 'odc.btnlabel.addHoliday' }))

		await user.click(screen.getByRole('button', { name: 'odc.btnlabel.save' }));

	})
	test('delete odc', async () => {
		jest.spyOn(query, 'useODCList').mockImplementation(
			jest.fn().mockReturnValue({
				data: data,
			})
		)
		const user = renderElement(
			<ODCManagement />
		);

		await user.click(screen.getByRole('button', { name: 'delete-0' }));
		const yes = screen.getAllByRole('button');
		await user.click(yes[1]);
		expect(yes[1]).not.toBeInTheDocument();
		expect(screen.getByText('Philippines')).toBeInTheDocument();
		await user.click(screen.getByRole('button', { name: 'delete-0', hidden: true }));
		const [no] = screen.getAllByRole('button');
		await user.click(no),
			expect(no).not.toBeInTheDocument();
	})

	test('api errors', async () => {
		jest.spyOn(mutate, 'useUpdateHoliday').mockImplementation(
			jest.fn().mockReturnValue({
				mutate: jest.fn((_variables, options) => {
					options.onSuccess();
				})
			})
		);
		jest.spyOn(query, 'useHolidayList').mockImplementation(
			jest.fn().mockReturnValue({
				mutate: {

				}
			})
		);
		jest.spyOn(mutate, 'useDeleteHoliday').mockImplementation(
			jest.fn().mockReturnValue({
				mutate: (_variables: any, options: { onSuccess: any; }) => {
					options.onSuccess
				},
				isLoading: false,
				isError: false,
			})
		);
		const user = renderElement(
			<ODCManagement />
		);

		await user.click(screen.getByRole('button', { name: /edit/i }));
		// await user.click(screen.getByRole('button', { name: /delete-0/i }))

		expect(screen.getByText('odc.management.label')).toBeInTheDocument();
	})
})