import type { ReactElement } from 'react';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Stack, Switch } from '@mui/material';

import LocalizationKey from "~/i18n/key";
import { useGetComplexities } from '~/queries/complexity/Complexities';
import { CustomButton } from '~/components/form/button';
import { Table, Title, Modal, PageContainer } from '~/components';

import { complexityColumns, ComplexityForms, FormContext } from './utils';

const Complexity = (): ReactElement => {
	const [isDaysChecked, setIsDaysChecked] = useState<boolean>(true);
	const [complexityId, setComplexityId] = useState<string>('');
	const [formContext, setFormContext] = useState<FormContext>('');
	const [openAddEditModal, setOpenAddEditModal] = useState<boolean>(false);

	const { data: apiData, refetch } = useGetComplexities();
	const { t } = useTranslation();
	const { complexity: { title, btnLabel, label } } = LocalizationKey;

	const handleDaysOrHours = (): void => setIsDaysChecked(!isDaysChecked);
	const handleComplexityId = (id: string): void => setComplexityId(id);
	const handleFormContext = (context: FormContext): void => setFormContext(context);
	const handleOpenAddEdit = (context: FormContext): void => {
		setFormContext(context);
		setOpenAddEditModal(true);
	};
	const handleCloseAddEdit = (): void => setOpenAddEditModal(false);

	useEffect(() => {
		setTimeout(refetch, 5000);
	}, [formContext]);

	return (
		<>
			<Title title={t(title)} />
			<PageContainer sx={{ background: "#FFFFFF" }}>
				<Stack gap={2} direction='column'>
					<Stack direction='row' justifyContent='space-between'>
						<CustomButton onClick={() => handleOpenAddEdit('Add')}>
							{t(btnLabel.addComplexity)}
						</CustomButton>
						<Stack direction='row' alignItems='center'>
							{t(label.hours)}
							<Switch name='hours-days' checked={isDaysChecked} onClick={handleDaysOrHours} />
							{t(label.days)}
						</Stack>
					</Stack>
					<Table
						name='complexity'
						columns={
							complexityColumns(
								isDaysChecked,
								handleFormContext,
								handleComplexityId,
								setOpenAddEditModal,
								t
							)
						}
						data={apiData?.data ?? []}
					/>
				</Stack>
			</PageContainer>
			<Modal
				title={formContext === "Add"
					? t(label.addComplexity)
					: t(label.editComplexity)
				}
				open={openAddEditModal}
				onClose={handleCloseAddEdit}
				children={
					<ComplexityForms
						formContext={formContext}
						setContext={handleFormContext}
						complexityId={complexityId}
						handleCloseAddEdit={handleCloseAddEdit}
						data={apiData?.data ?? []}
					/>
				}
				actions={<></>}
				maxWidth={'md'}
			/>
		</>
	)
}

export default Complexity;