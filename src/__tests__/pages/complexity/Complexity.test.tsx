import { render, screen } from '@testing-library/react'
import UserEvent from '@testing-library/user-event';
import ProviderWrapper from '~/__tests__/utils/ProviderWrapper';

import { Complexity } from '~/pages/complexity/';
import * as query from '~/queries/complexity/Complexities';
import { complexityById, tableData } from './utils/utils';

jest.mock('react-i18next', () => ({
	...jest.requireActual('react-i18next'),
	useTranslation: () => ({ t: (key: any) => key }),
}));

describe('View complexity', () => {
	test('Render complexity', async () => {
		const user = UserEvent.setup();

		jest.spyOn(query, 'useGetComplexities').mockImplementation(
			jest.fn().mockReturnValue({
				data: tableData
			})
		)

		render(
			<ProviderWrapper>
				<Complexity />
			</ProviderWrapper>
		);

		const title = screen.getByText('COMPLEXITY');
		expect(title).toBeInTheDocument();

		const hoursDay = screen.getByRole('checkbox');
		await user.click(hoursDay);
		expect(hoursDay).toBeInTheDocument();

		const tableData1 = await screen.findByRole('cell', { name: /average/i });
		expect(tableData1).toBeInTheDocument();
		const tableData2 = await screen.findByRole('cell', { name: /hard/i });
		expect(tableData2).toBeInTheDocument();
	})

	test('Add Complexity', async () => {
		const user = UserEvent.setup();

		jest.spyOn(query, 'usePostComplexities').mockImplementation(
			jest.fn().mockReturnValue({
				mutate: jest.fn().mockImplementation((_data, options) => {
					options.onSuccess({ status: 200 });
				}),
			})
		)

		render(
			<ProviderWrapper>
				<Complexity />
			</ProviderWrapper>
		);

		const addButton = screen.getByRole('button', { name: /add complexity/i });
		await user.click(addButton);
		const cancelButton = screen.getByRole('button', { name: /cancel/i });
		await user.click(cancelButton);
		await user.click(addButton);
		const formTitle = screen.getByRole('heading');
		expect(formTitle).toHaveTextContent('Add Complexity');

		const textbox = screen.getAllByRole('textbox');
		const [
			complexityName,
			_noOfDaysFrom,
			_noOfDaysTo,
			_noOfFeatsFrom,
			_noOfFeatsTo,
			description,
			samples] = textbox;

		await user.type(complexityName, 'Easy');
		await user.type(description, 'Description')
		await user.type(samples, 'Samples')

		const submitButton = screen.getByRole('button', { name: /submit/i });
		await user.click(submitButton);

		expect(formTitle).not.toBeInTheDocument();

	})

	test('Edit Complexity', async () => {
		const user = UserEvent.setup();

		jest.spyOn(query, 'useGetComplexitiesbyId').mockImplementation(
			jest.fn().mockReturnValue({
				data: complexityById
			})
		)

		jest.spyOn(query, 'usePutComplexities').mockImplementation(
			jest.fn().mockReturnValue({
				mutate: jest.fn().mockImplementation((_data, options) => {
					options.onSuccess({ status: 200 });
				}),
			})
		)

		render(
			<ProviderWrapper>
				<Complexity />
			</ProviderWrapper>
		);

		const editButtons = await screen.findAllByRole('button', { name: /edit/i });
		await user.click(editButtons[0]);
		const formTitle = screen.getByRole('heading');
		expect(formTitle).toHaveTextContent('Edit Complexity');


		const textbox = screen.getAllByRole('textbox');
		const [
			complexityName,
			_noOfDaysFrom,
			_noOfDaysTo,
			_noOfFeatsFrom,
			_noOfFeatsTo,
			description,
			samples] = textbox;

		await user.type(complexityName, 'Easy');
		await user.type(description, 'Description')
		await user.type(samples, 'Samples')

		const submitButton = screen.getByRole('button', { name: /submit/i });
		await user.click(submitButton);

		expect(formTitle).not.toBeInTheDocument();

	})

	test('Delete Complexity', async () => {
		const user = UserEvent.setup();

		jest.spyOn(query, 'useGetComplexities').mockImplementation(
			jest.fn().mockReturnValue({
				data: tableData
			})
		)

		const deleteFn = jest.spyOn(query, 'useDeleteComplexities').mockImplementation(
			jest.fn().mockReturnValue({
				mutate: jest.fn(),
			})
		)

		render(
			<ProviderWrapper>
				<Complexity />
			</ProviderWrapper>
		);

		const deleteButtons = await screen.findAllByRole('button', { name: /delete/i });
		await user.click(deleteButtons[0]);

		expect(deleteFn).toHaveBeenCalled();
	})

	test('Error on mutation options', async () => {
		const user = UserEvent.setup();

		jest.spyOn(query, 'usePostComplexities').mockImplementation(
			jest.fn().mockReturnValue({
				mutate: jest.fn().mockImplementation((_data, options) => {
					options.onError({ status: 500 });
				}),
			})
		)

		render(
			<ProviderWrapper>
				<Complexity />
			</ProviderWrapper>
		);

		const addButton = screen.getByRole('button', { name: /add complexity/i });
		await user.click(addButton);
		const formTitle = screen.getByRole('heading');
		expect(formTitle).toHaveTextContent('Add Complexity');

		const textbox = screen.getAllByRole('textbox');
		const [
			complexityName,
			_noOfDaysFrom,
			_noOfDaysTo,
			_noOfFeatsFrom,
			_noOfFeatsTo,
			description,
			samples] = textbox;

		await user.type(complexityName, 'Easy');
		await user.type(description, 'Description')
		await user.type(samples, 'Samples')

		const submitButton = screen.getByRole('button', { name: /submit/i });
		await user.click(submitButton);

		expect(formTitle).toBeInTheDocument();
	})

	test('Loading circular progress', async () => {
		const user = UserEvent.setup();

		jest.spyOn(query, 'useGetComplexitiesbyId').mockImplementation(
			jest.fn().mockReturnValue({
				isLoading: true,
			})
		)

		render(
			<ProviderWrapper>
				<Complexity />
			</ProviderWrapper>
		);

		const addButton = screen.getByRole('button', { name: /add complexity/i });
		await user.click(addButton);
		const svg = screen.getByRole('progressbar')
		expect(svg).toBeInTheDocument();
	})
})