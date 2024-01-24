import type { ReactElement } from "react";
import type { SucErrType } from "./utils";

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { Stack, Switch } from "@mui/material";

import LocalizationKey from "~/i18n/key";
import { useGetComplexities } from "~/queries/complexity/Complexities";
import { useDeleteComplexities } from "~/mutations/complexity";
import { CustomButton } from "~/components/form/button";
import { Table, Title, Modal, PageContainer, Alert, PageLoader } from "~/components";

import {
	complexityColumns,
	ComplexityForms,
	FormContext,
	SucErrData,
	MutationOptions2
} from "./utils";

const Complexity = (): ReactElement => {
	const [isDaysChecked, setIsDaysChecked] = useState<boolean>(false);
	const [complexityId, setComplexityId] = useState<string>("");
	const [formContext, setFormContext] = useState<FormContext>("");
	const [openAddEditModal, setOpenAddEditModal] = useState<boolean>(false);
	const [successError, setSuccessError] = useState<SucErrType>(SucErrData);

	const { data: apiData, isError, isLoading, refetch } = useGetComplexities();
	const {
		mutate,
		isError: isDeleteError,
		isSuccess: isDeleteSuccess
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
		setSuccessError(SucErrData);
	};
	const handleCloseAddEdit = (): void => setOpenAddEditModal(false);
	const handleContext = (context: FormContext, id: string): void => {
		setFormContext(context);
		setComplexityId(id);
		if (context === "Edit")
			setOpenAddEditModal(true);
		if (context === "")
			mutate(id);
	};

	useEffect(() => {
    MutationOptions2(isError, "isError", setSuccessError);
    MutationOptions2(isDeleteSuccess, "isDeleteSuccess", setSuccessError);
    MutationOptions2(isDeleteError, "isDeleteError", setSuccessError);

		if (isDeleteSuccess) refetch();
  }, [isError, isDeleteSuccess, isDeleteError]);

	useEffect(() => {
		if (successError.isAddSuccess || successError.isUpdateSuccess) refetch();
	}, [successError.isAddSuccess, successError.isUpdateSuccess]);

	if (isLoading)
		return <PageLoader />;

	return (
		<>
			<Title title={t(title)} />
			<PageContainer sx={{ background: "#FFFFFF" }}>
				<Stack gap={2} direction="column">
					<Stack direction="row" justifyContent="space-between">
						<CustomButton onClick={() => handleOpenAddEdit("Add")}>
							{t(btnLabel.addComplexity)}
						</CustomButton>
						<Stack direction="row" alignItems="center">
							{t(label.hours)}
							<Switch name="hours-days" checked={isDaysChecked} onClick={handleDaysOrHours} />
							{t(label.days)}
						</Stack>
					</Stack>
					<Table
						name="complexity"
						columns={complexityColumns(isDaysChecked, handleContext, t, setSuccessError)}
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
						setSuccessError={setSuccessError}
					/>
				}
				actions={<></>}
				maxWidth={"md"}
			/>
			{successError.isError && (
				<Alert
					open={successError.isError}
					message={t(genericError)}
					type={"error"}
				/>
			)}
			{(successError.isAddError || successError.isUpdateError) && (
				<Alert
					open={successError.isAddError || successError.isUpdateError}
					message={t(validationInfo.submitError)}
					type={"error"}
				/>
			)}
			{(successError.isAddSuccess || successError.isUpdateSuccess) && (
				<Alert
					open={successError.isAddSuccess || successError.isUpdateSuccess}
					message={t(validationInfo.submitSuccess)}
					type={"success"}
				/>
			)}
			{successError.isDeleteError && (
				<Alert
				open={successError.isDeleteError}
				message={t(validationInfo.deleteError)}
				type={"error"}
			/>
			)}
			{successError.isDeleteSuccess && (
				<Alert
				open={successError.isDeleteSuccess}
				message={t(validationInfo.deleteSuccess)}
				type={"success"}
			/>
			)}
		</>
	)
}

export default Complexity;