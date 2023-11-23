import type { ReactElement } from 'react';

import { useState } from 'react';
import { Stack, Typography, Switch } from '@mui/material';

import { CustomButton } from '~/components/form/button';
import { Card, SvgIcon, Table, Title } from '~/components';

import { complexityColumns } from './utils';
import { useGetComplexities } from '~/queries/complexity/Complexities';

const Complexity = (): ReactElement => {

	const { data } = useGetComplexities();

	const [isDaysChecked, setIsDaysChecked] = useState<boolean>(true);

	const handleDaysOrHours = (): void => {
		setIsDaysChecked(!isDaysChecked)
	}

	const handleEdit = (): void => {
		console.log('Edit button clicked!')
	}

	return (
		<>
			<Card>
				<Stack gap={2} >
					<Title title='COMPLEXITY' />
					<Stack direction='row' justifyContent='space-between'>
						<CustomButton variant='outlined' colorVariant='neutral' onClick={handleEdit}>
							<SvgIcon name='edit' $size={2} color='primary' />
							<Typography variant='overline' color='primary' fontWeight='bold'>
								EDIT
							</Typography>
						</CustomButton>
						<Stack direction='row' alignItems='center'>
							HOURS<Switch name='hours-days' checked={isDaysChecked} onClick={handleDaysOrHours} />DAYS
						</Stack>
					</Stack>
					<Table name='complexity' columns={complexityColumns(isDaysChecked)} data={data ?? []} />
				</Stack>
			</Card>
		</>
	)
}

export default Complexity;