import type { ReactElement, } from 'react';
import type { ForGetComplexities } from '~/api/complexity';
import type { ComplexityForm, ComplexityFormsType } from './types';

import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';

import { useFormik } from 'formik';
import { Divider, Typography, Grid } from '@mui/material';

import { usePostComplexities, usePutComplexities } from '~/mutations/complexity';
import { Form } from '~/components';
import { ControlledTextField, ControlledTextArea } from '~/components/form/controlled';
import { getFieldError } from "~/components/form/utils";
import { CustomButton } from '~/components/form/button';
import LocalizationKey from "~/i18n/key";

import {
	complexityInitialValues,
	complexityFormSchema,
	mutationOptions
} from '.';

const ComplexityForms = (props: ComplexityFormsType): ReactElement => {
	const {
		formContext,
		setContext,
		complexityId,
		handleCloseAddEdit,
		data,
		setIsEditError,
		setIsEditSuccess,
		setIsEditLoading,
	} = props;

	const { t } = useTranslation();
	const { complexity: { label, btnLabel } } = LocalizationKey;

	const { mutate: mutateAddComplexities, isLoading: isAddLoading } = usePostComplexities();
	const { mutate: mutateEditComplexities, isLoading: isEditLoading } = usePutComplexities();

	const [initialValue, setInitialValue] = useState<ComplexityForm>(complexityInitialValues);
	const apiData = data.find((value: ForGetComplexities) => value.id === complexityId);

	const {
		name: complexityName = '',
		minFeatures,
		maxFeatures,
		minHours,
		maxHours,
		description = '',
		sample: samples = ''
	} = apiData ?? {};

	const addEditComplexityForm = useFormik<ComplexityForm>({
		initialValues: initialValue,
		validationSchema: complexityFormSchema(t),
		enableReinitialize: true,
		onSubmit: ({
			complexityName,
			numberOfHoursFrom,
			numberOfHoursTo,
			numberOfFeaturesFrom,
			numberOfFeaturesTo,
			description,
			samples
		}): void => {
			const addFormData = {
				name: complexityName,
				minHours: `${numberOfHoursFrom}`,
				maxHours: `${numberOfHoursTo}`,
				minFeatures: `${numberOfFeaturesFrom}`,
				maxFeatures: `${numberOfFeaturesTo}`,
				description: description,
				sample: samples,
				isActive: true,
			}
			console.log('parameter', addFormData)

			if (formContext === 'Add')
				mutateAddComplexities(
					{ complexities: [addFormData] },
					mutationOptions(handleClose, setIsEditError, setIsEditSuccess)
				);

			const { isActive, ...editFormData } = addFormData;
			if (formContext === 'Edit')
				mutateEditComplexities(
					{ id: complexityId, isActive: isActive, ...editFormData },
					mutationOptions(handleClose, setIsEditError, setIsEditSuccess)
				);
		},
	});

	const { errors } = addEditComplexityForm;

	useEffect(() => {
		if (formContext === 'Add')
			setInitialValue(complexityInitialValues);
		if (formContext === 'Edit')
			setInitialValue({
				complexityName,
				numberOfHoursFrom: minHours ?? '',
				numberOfHoursTo: maxHours ?? '',
				numberOfFeaturesFrom: minFeatures ?? '',
				numberOfFeaturesTo: maxFeatures ?? '',
				description,
				samples,
			});
	}, [apiData, formContext]);

	useEffect(() => {
		if (isAddLoading || isEditLoading)
			setIsEditLoading(isAddLoading || isEditLoading);
	}, [isAddLoading, isEditLoading])

	const handleClose = (): void => {
		addEditComplexityForm.resetForm();
		setContext('');
		handleCloseAddEdit();
	};

	const handleError = (error: string | undefined): boolean => {
		return error !== undefined;
	};

	return (
		<Form instance={addEditComplexityForm}>
			<Grid container spacing={2}>
				<Grid item xs={8} >
					<ControlledTextField
						name="complexityName"
						label={t(label.name)}
						error={handleError(errors.complexityName)}
						helperText={getFieldError(errors, "complexityName")}
					/>
				</Grid>
				<Grid container item xs={2} spacing={1} alignItems='center'>
					<Grid item xs={12}>
						<Typography>{t(label.noOfHours)}</Typography>
					</Grid>
					<Grid item xs={5}>
						<ControlledTextField
							name="numberOfHoursFrom"
							error={handleError(errors.numberOfHoursFrom)}
						/>
					</Grid>
					<Grid item xs={1}><Divider /></Grid>
					<Grid item xs={5}>
						<ControlledTextField
							name="numberOfHoursTo"
							error={handleError(errors.numberOfHoursTo)}
						/>
					</Grid>
					<Grid item xs={12}>
						{handleError(errors.numberOfHoursFrom) && (
							<Typography color="error">{getFieldError(errors, "numberOfHoursFrom")}</Typography>
						)}
						{handleError(errors.numberOfHoursTo) && (
							<Typography color="error">{getFieldError(errors, "numberOfHoursTo")}</Typography>
						)}
					</Grid>
				</Grid>
				<Grid container item xs={2} spacing={1} alignItems='center'>
					<Grid item xs={12}>
						<Typography>{t(label.noOfFeatures)}</Typography>
					</Grid>
					<Grid item xs={5}>
						<ControlledTextField
							name="numberOfFeaturesFrom"
							error={handleError(errors.numberOfFeaturesFrom)}
						/>
					</Grid>
					<Grid item xs={1}><Divider /></Grid>
					<Grid item xs={5}>
						<ControlledTextField
							name="numberOfFeaturesTo"
							error={handleError(errors.numberOfFeaturesTo)}
						/>
					</Grid>
					<Grid item xs={12}>
						{handleError(errors.numberOfFeaturesFrom) && (
							<Typography color="error">{getFieldError(errors, "numberOfFeaturesFrom")}</Typography>
						)}
						{handleError(errors.numberOfFeaturesTo) && (
							<Typography color="error">{getFieldError(errors, "numberOfFeaturesTo")}</Typography>
						)}
					</Grid>
				</Grid>
				<Grid item xs={12}>
					<ControlledTextArea
						name="description"
						label={t(label.description)}
						error={handleError(errors.description)}
						helperText={getFieldError(errors, "description")}
					/>
				</Grid>
				<Grid item xs={12}>
					<ControlledTextArea
						name="samples"
						label={t(label.samples)}
						error={handleError(errors.samples)}
						helperText={getFieldError(errors, "samples")}
					/>
				</Grid>
			</Grid>
			<Grid container justifyContent={'flex-end'} mt={2}>
				<CustomButton
					type="button"
					colorVariant='neutral'
					sx={{ mr: 1 }}
					onClick={handleClose}
				>
					{t(btnLabel.cancel)}
				</CustomButton>
				<CustomButton type='submit'>
					{t(btnLabel.save)}
				</CustomButton>
			</Grid>
		</Form>
	)
}

export default ComplexityForms;
