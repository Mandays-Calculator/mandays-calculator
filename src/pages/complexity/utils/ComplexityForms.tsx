import type { ReactElement, } from 'react';
import type { ComplexityForm, FormContext } from './types';

import { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import Grid from '@mui/material/Grid';

import { Card, Form } from '~/components';
import { ControlledTextField } from '~/components/form/controlled';
import { CircularProgress, Divider, Stack, Typography } from '@mui/material';
import { CustomButton } from '~/components/form/button';
import { complexityInitialValues, complexityFormSchema, handleSplitValues, mutationOptions } from './util';
import { useGetComplexitiesbyId, usePostComplexities, usePutComplexities } from '~/queries/complexity/Complexities';

type ComplexityFormsType = {
	formContext: FormContext;
	setContext: (context: FormContext) => void;
	complexityId: string;
}

const ComplexityForms = ({ formContext, setContext, complexityId }: ComplexityFormsType): ReactElement => {

	const [initialValue, setInitialValue] = useState<ComplexityForm>(complexityInitialValues);

	const { data: apiData, isLoading } = useGetComplexitiesbyId(complexityId, formContext === 'Edit');

	const {
		name: complexityName = '',
		numberOfDays,
		numberOfFeatures,
		description = '',
		sample: samples = ''
	} = apiData?.data ?? {}
	const [numberOfDayFrom, numberOfDayTo] = handleSplitValues(numberOfDays);
	const [numberOfFeaturesFrom, numberOfFeaturesTo] = handleSplitValues(numberOfFeatures);

	const { mutate: mutateAddComplexities } = usePostComplexities();
	const { mutate: mutateEditComplexities } = usePutComplexities();

	const ComplexityForm = useFormik<ComplexityForm>({
		initialValues: initialValue,
		validationSchema: complexityFormSchema,
		enableReinitialize: true,
		onSubmit: ({
			complexityName,
			numberOfDayFrom: noOfDayFrom,
			numberOfDayTo: noOfDayTo,
			numberOfFeaturesFrom: noOfFeaturesFrom,
			numberOfFeaturesTo: noOfFeaturesTo,
			description,
			samples
		}): void => {

			const addFormData = {
				name: complexityName,
				numberOfDays: `${noOfDayFrom} - ${noOfDayTo}`,
				numberOfFeatures: `${noOfFeaturesFrom} - ${noOfFeaturesTo}`,
				description: description,
				sample: samples,
				isActive: true,
			}

			if (formContext === 'Add') mutateAddComplexities([addFormData],
				mutationOptions(setContext)
			)

			const { isActive, ...editFormData } = addFormData;
			if (formContext === 'Edit')
				mutateEditComplexities({ id: complexityId, active: isActive, ...editFormData }, mutationOptions(setContext))
		},
	});

	useEffect(() => {
		if (formContext === 'Add') setInitialValue(complexityInitialValues)
		if (formContext === 'Edit')
			setInitialValue({
				complexityName,
				numberOfDayFrom,
				numberOfDayTo,
				numberOfFeaturesFrom,
				numberOfFeaturesTo,
				description,
				samples,
			})
	}, [isLoading, apiData, formContext])

	if (isLoading) return <Stack justifyContent='center' alignItems='center'>
		<CircularProgress aria-label="loading..." />
	</Stack>

	return (
		<>
			<Card title={`${formContext} Complexity`}>
				<Form instance={ComplexityForm}>
					<Grid container spacing={2}>
						<Grid item xs={8} >
							<ControlledTextField
								name='complexityName'
								label='Complexity Name'
							/>
						</Grid>
						<Grid container item xs={2} spacing={1} alignItems='center'>
							<Grid item xs={12}>
								<Typography>Number of Days</Typography>
							</Grid>
							<Grid item xs={5}>
								<ControlledTextField name='numberOfDayFrom' />
							</Grid>
							<Grid item xs={1}><Divider /></Grid>
							<Grid item xs={5}>
								<ControlledTextField name='numberOfDayTo' />
							</Grid>
						</Grid>
						<Grid container item xs={2} spacing={1} alignItems='center'>
							<Grid item xs={12}>
								<Typography>Number of Features</Typography>
							</Grid>
							<Grid item xs={5}>
								<ControlledTextField name='numberOfFeaturesFrom' />
							</Grid>
							<Grid item xs={1}><Divider /></Grid>
							<Grid item xs={5}>
								<ControlledTextField name='numberOfFeaturesTo' />
							</Grid>
						</Grid>
						<Grid item xs={12}>
							<ControlledTextField name='description' label='Description' />
						</Grid>
						<Grid item xs={12}>
							<ControlledTextField name='samples' label='Samples' />
						</Grid>
						<Grid item xs={12}>
							<Stack direction='row' justifyContent='flex-end'>
								<CustomButton type='submit'>Submit</CustomButton>
							</Stack>
						</Grid>
					</Grid>

				</Form>
			</Card>
		</>
	)
}

export default ComplexityForms;