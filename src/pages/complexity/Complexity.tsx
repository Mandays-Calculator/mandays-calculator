import type { ReactElement } from 'react';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Stack, Switch } from '@mui/material';

import LocalizationKey from "~/i18n/key";
import { useGetComplexities } from '~/queries/complexity/Complexities';
import { useDeleteComplexities } from "~/mutations/complexity";
import { CustomButton } from '~/components/form/button';
import { Table, Title, Modal, PageContainer, Alert, PageLoader } from '~/components';

import { complexityColumns, ComplexityForms, FormContext } from './utils';

const Complexity = (): ReactElement => {
	const [isDaysChecked, setIsDaysChecked] = useState<boolean>(false);
	const [complexityId, setComplexityId] = useState<string>('');
	const [formContext, setFormContext] = useState<FormContext>('');
	const [openAddEditModal, setOpenAddEditModal] = useState<boolean>(false);
	const [isEditError, setIsEditError] = useState<boolean>(false);
	const [isEditSuccess, setIsEditSuccess] = useState<boolean>(false);
	const [isEditLoading, setIsEditLoading] = useState<boolean>(false);

	const { data: apiData, isError, isLoading, refetch } = useGetComplexities();
	const {
		mutate,
		isError: isDeleteError,
		isSuccess: isDeleteSuccess,
		isLoading: isDeleteLoading,
	} = useDeleteComplexities();
	const { t } = useTranslation();
	const {
		complexity: { title, btnLabel, label, validationInfo },
		common: { errorMessage: { genericError } }
	} = LocalizationKey;

	const handleDaysOrHours = (): void => setIsDaysChecked(!isDaysChecked);
	const handleFormContext = (context: FormContext): void => setFormContext(context);
	const handleOpenAddEdit = (context: FormContext): void => {
		setFormContext(context);
		setOpenAddEditModal(true);
	};
	const handleCloseAddEdit = (): void => setOpenAddEditModal(false);

	const handleContext = (context: FormContext, id: string): void => {
		setFormContext(context);
		setComplexityId(id);
		if (context === 'Edit')
			setOpenAddEditModal(true);
		if (context === '')
			mutate(id);
	};

	useEffect(() => {
		if (isDeleteSuccess || isEditSuccess) refetch();
	}, [isDeleteLoading, isEditLoading]);

	if (isLoading)
		return <PageLoader />;

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
						columns={complexityColumns(isDaysChecked, handleContext, t)}
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
						setIsEditError={setIsEditError}
						setIsEditSuccess={setIsEditSuccess}
						setIsEditLoading={setIsEditLoading}
					/>
				}
				actions={<></>}
				maxWidth={'md'}
			/>
			{(isLoading && isError) && (
				<Alert
					open={isError}
					message={t(genericError)}
					type={"error"}
				/>
			)}
			{(isEditLoading && isEditError) && (
				<Alert
					open={isEditError}
					message={t(validationInfo.submitError)}
					type={"error"}
				/>
			)}
			{(isEditLoading && isEditSuccess) && (
				<Alert
					open={isEditSuccess}
					message={t(validationInfo.submitSuccess)}
					type={"success"}
				/>
			)}
			{(isDeleteLoading && isDeleteError) && (
				<Alert
				open={isDeleteError}
				message={t(validationInfo.deleteError)}
				type={"error"}
			/>
			)}
			{(isDeleteLoading && isDeleteSuccess) && (
				<Alert
				open={isDeleteSuccess}
				message={t(validationInfo.deleteSuccess)}
				type={"success"}
			/>
			)}
		</>
	)
}

export default Complexity;