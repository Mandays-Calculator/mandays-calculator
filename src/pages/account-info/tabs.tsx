import type { ReactElement } from "react";
import type { UserProject } from "~/api/auth";

import { useState, useEffect } from 'react';
import { Grid, Stack, Typography } from "@mui/material";
import PasswordInput from "../auth/components/password-input/PasswordInput";
import { Form, StyledLabel } from "~/components";
import { useFormik } from "formik";
import { CustomButton } from "~/components/form/button";
import { Check, Clear } from "@mui/icons-material";
import { actInfoChangePassSchema } from "./utils";


type DetailsTypes = {
	personal: {
		fullName?: string;
		gender?: string;
		email?: string;
		employeeId?: string;
	};
	project: {
		odc?: string;
		project?: UserProject[];
	};
}

export const Details = ({ personal: { fullName, gender, email, employeeId }, project: { odc, project } }: DetailsTypes): ReactElement => {
	return (
		<>
			<Stack>
				<Typography variant="h6" color='primary' fontWeight='bold'>Personal Details</Typography>
				<Typography variant="subtitle1" fontWeight='bold'>
					Name :
					<Typography ml={2} fontWeight='bold' display='inline'>{fullName}</Typography>
				</Typography>
				<Typography variant="subtitle1" fontWeight='bold'>
					Gender :
					<Typography ml={2} fontWeight='bold' display='inline'>{gender}</Typography>
				</Typography>
				<Typography variant="subtitle1" fontWeight='bold'>
					Email :
					<Typography ml={2} fontWeight='bold' display='inline'>{email}</Typography>
				</Typography>
				<Typography variant="subtitle1" fontWeight='bold'>
					Employee ID :
					<Typography ml={2} fontWeight='bold' display='inline'>{employeeId}</Typography>
				</Typography>
			</Stack>
			<Stack mt={2}>
				<Typography variant="h6" color='primary' fontWeight='bold'>Project Details</Typography>
				<Typography variant="subtitle1" fontWeight='bold'>
					ODC :
					<Typography ml={2} fontWeight='bold' display='inline'>{odc}</Typography>
				</Typography>
				<Typography variant="subtitle1" fontWeight='bold'>
					Project :
					<Typography ml={2} fontWeight='bold' display='inline'>{project?.map((val) => <div key={val.projectId}>{val.name}</div>)}</Typography>
				</Typography>
				<Typography variant="subtitle1" fontWeight='bold'>
					Team/s :
					<Typography ml={2} fontWeight='bold' display='inline'> </Typography>
				</Typography>
			</Stack>
		</>
	);
};

export const Settings = ({ }: any): ReactElement => {
	const [formValidation, setFormValidation] = useState({
		charLength: false,
		upper: false,
		lower: false,
		num: false,
		symbols: false,
		match: false,
	});

	const changePassForm = useFormik({
		initialValues: {
			currentPassword: '',
			newPassword: '',
			confirmNewPassword: '',
		},
		validationSchema: actInfoChangePassSchema,
		onSubmit: (values): void => {
			if (Object.values(formValidation).every(val => val === true)) {
				console.log(values)
			}
		}
	});

	useEffect(() => {
		const { newPassword, confirmNewPassword } = changePassForm.values;
		setFormValidation({
			charLength: newPassword.length >= 8,
			upper: !!newPassword.match(/[A-Z]/),
			lower: !!newPassword.match(/[a-z]/),
			num: !!newPassword.match(/[0-9]/),
			symbols: !!newPassword.match(/[#$-_!]/),
			match: newPassword === confirmNewPassword && newPassword !== '',
		});
	}, [changePassForm.values]);

	return (
		<>
			<Typography variant="h6" color='primary' fontWeight='bold' mb={4}>Change Password</Typography>

			<Form instance={changePassForm}>
				<Grid container spacing={2}>
					<Grid item xs={3}>
						<StyledLabel>Current Password</StyledLabel>
						<PasswordInput name="currentPassword" />
					</Grid>
					<Grid item xs={9} />
					<Grid item xs={3}>
						<StyledLabel>New Password</StyledLabel>
						<PasswordInput name="newPassword" />
					</Grid>
					<Grid item xs={9} />
					<Grid item xs={3}>
						<StyledLabel>Confirm New Password</StyledLabel>
						<PasswordInput name="confirmNewPassword" />
					</Grid>
					<Grid item xs={9} />
					<Grid item xs={12} >
						<Stack direction='column' justifyContent='center'>
							<ValidatePassword isOkay={formValidation.charLength} condition="Password must be at least 8 characters long" />
							<ValidatePassword isOkay={formValidation.upper} condition="Password must contain an uppercase letter" />
							<ValidatePassword isOkay={formValidation.lower} condition="Password must contain a lowercase letter" />
							<ValidatePassword isOkay={formValidation.num} condition="Password must contain a number" />
							<ValidatePassword isOkay={formValidation.symbols} condition="Password must any of the following symbols (#$-_!)" />
							<ValidatePassword isOkay={formValidation.match} condition="New password and confirm new password must match" />
						</Stack>
					</Grid>
					<Grid item xs={12}>
						<Stack direction='row' justifyContent='flex-end' spacing={2}>
							<CustomButton onClick={() => changePassForm.resetForm()} colorVariant="neutral">Clear</CustomButton>
							<CustomButton type="submit">Change Password</CustomButton>
						</Stack>
					</Grid>
				</Grid>
			</Form>
		</>
	);
}

type ValidatePasswordTypes = {
	isOkay: boolean;
	condition: string;
}

const ValidatePassword = ({ isOkay, condition }: ValidatePasswordTypes): ReactElement =>
	<Typography><Stack alignContent='center' direction='row'>{isOkay ? <Check color="success" /> : <Clear color="secondary" />}{condition}</Stack></Typography>
