import { render, screen } from '@testing-library/react'
import UserEvent from '@testing-library/user-event';
import ProviderWrapper from '~/__tests__/utils/ProviderWrapper';

import { Complexity } from '~/pages/complexity/';
import * as query from '~/queries/complexity/Complexities';
import * as mutate from '~/mutations/complexity';
// import { complexityById, tableData } from './utils/utils';
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

		const title = screen.getByText('complexity.title');
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

		jest.spyOn(mutate, 'usePostComplexities').mockImplementation(
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

		const addButton = screen.getByRole('button', { name: 'complexity.btnLabel.addComplexity' });
		await user.click(addButton);
		const cancelButton = screen.getByRole('button', { name: 'complexity.btnLabel.cancel' });
		await user.click(cancelButton);
		await user.click(addButton);
		const formTitle = screen.getByRole('heading');
		expect(formTitle).toHaveTextContent('complexity.label.addComplexity');

		const textbox = screen.getAllByRole('textbox');
		const [complexityName] = textbox;

		await user.type(complexityName, 'Easy');

		const submitButton = screen.getByRole('button', { name: 'complexity.btnLabel.save' });
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

		jest.spyOn(mutate, 'usePutComplexities').mockImplementation(
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
		expect(formTitle).toHaveTextContent('complexity.label.editComplexity');


		const textbox = screen.getAllByRole('textbox');
		const [complexityName] = textbox;

		await user.type(complexityName, 'Easy');

		const submitButton = screen.getByRole('button', { name: 'complexity.btnLabel.save' });
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

		const deleteFn = jest.spyOn(mutate, 'useDeleteComplexities').mockImplementation(
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

		jest.spyOn(mutate, 'usePostComplexities').mockImplementation(
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

		const addButton = screen.getByRole('button', { name: 'complexity.btnLabel.addComplexity' });
		await user.click(addButton);
		const formTitle = screen.getByRole('heading');
		expect(formTitle).toHaveTextContent('complexity.label.addComplexity');

		const textbox = screen.getAllByRole('textbox');
		const [complexityName] = textbox;

		await user.type(complexityName, 'Easy');

		const submitButton = screen.getByRole('button', { name: 'complexity.btnLabel.save' });
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

		const addButton = screen.getByRole('button', { name: 'complexity.btnLabel.addComplexity' });
		await user.click(addButton);
		const svg = screen.getByRole('progressbar')
		expect(svg).toBeInTheDocument();
	})
})