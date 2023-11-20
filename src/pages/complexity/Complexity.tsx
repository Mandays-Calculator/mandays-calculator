import type { ReactElement } from 'react';

import { useState } from 'react';
import { Stack, Switch } from '@mui/material';

import { Card, SvgIcon, Table, Title } from '~/components';
import { CustomButton } from '~/components/form/button';

import { complexityData, complexityColumns } from './utils';

const Complexity = (): ReactElement => {
	const [isDaysChecked, setIsDaysChecked] = useState<boolean>(true);

	const handleDaysOrHours = (): void => {
		setIsDaysChecked(!isDaysChecked)
	}

	const handleEdit = (): void => {
		console.log('Edit button clicked!')
	}

	return <>
		<Card title=''>
			<Stack gap={2} >
				<Title title='COMPLEXITY' />
				<Stack direction='row' justifyContent='space-between'>
					<CustomButton colorVariant='neutral' onClick={handleEdit}>
						<SvgIcon name='edit' $size={2} color='primary' />
						EDIT
					</CustomButton>
					<div>
						HOURS<Switch name='hours-days' checked={isDaysChecked} onClick={handleDaysOrHours} />DAYS
					</div>
				</Stack>
				<Table name='complexity' columns={complexityColumns(isDaysChecked)} data={complexityData} />
			</Stack>
		</Card>
	</>
}

export default Complexity;