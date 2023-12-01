import type { ReactElement, ReactNode } from 'react';

import { useState, useEffect } from 'react';
import { Stack, Switch } from '@mui/material';

import { CustomButton } from '~/components/form/button';
import { Card, Table, Title } from '~/components';

import { complexityColumns, ComplexityForms, FormContext } from './utils';
import { useGetComplexities } from '~/queries/complexity/Complexities';



const Complexity = (): ReactElement => {
	const [isDaysChecked, setIsDaysChecked] = useState<boolean>(true);
	const [complexityId, setComplexityId] = useState<string>('');
	const [formContext, setFormContext] = useState<FormContext>('');
	const { data: apiData, refetch } = useGetComplexities();

	const handleAdd = (): void =>
		setFormContext('Add')

	const handleDaysOrHours = (): void =>
		setIsDaysChecked(!isDaysChecked)

	const handleComplexityId = (id: string): void => setComplexityId(id)

	const handleFormContext = (context: FormContext): void =>
		setFormContext(context)

	const renderComplexityForm = (): ReactNode =>
		formContext &&
		<ComplexityForms
			formContext={formContext}
			setContext={handleFormContext}
			complexityId={complexityId}
		/>

	useEffect(() => {
		setTimeout(refetch, 5000)
	}, [formContext])

	return (
		<>
			<Card>
				<Stack gap={2} direction='column'>
					<Title title='COMPLEXITY' />
					<Stack direction='row' justifyContent='space-between'>
						<CustomButton onClick={handleAdd}>
							Add Complexity
						</CustomButton>
						<Stack direction='row' alignItems='center'>
							HOURS<Switch name='hours-days' checked={isDaysChecked} onClick={handleDaysOrHours} />DAYS
						</Stack>
					</Stack>
					<Table
						name='complexity'
						columns={
							complexityColumns(
								isDaysChecked,
								handleFormContext,
								handleComplexityId,
							)
						}
						data={apiData?.data ?? []} />
					{renderComplexityForm()}
				</Stack>
			</Card>
		</>
	)
}

export default Complexity;