import type { Column, CellProps } from "react-table"
import type { TFunction } from "i18next";

import { IconButton } from "@mui/material";

import { useDeleteComplexities } from "~/queries/complexity/Complexities";
import { SvgIcon } from "~/components";
import LocalizationKey from "~/i18n/key";

import { DataType, FormContext } from ".";

const { complexity: { table: { columns } } } = LocalizationKey;

export const complexityColumns = (
	isDaysChecked: boolean,
	setContext: (context: FormContext) => void,
	handleComplexityId: (id: string) => void,
	setOpenAddEditModal: (open: boolean) => void,
	t: TFunction<"translation", undefined>,
): Column<DataType>[] =>
	[
		{
			Header: t(columns.complexity),
			accessor: "name",
		},
		{
			Header: t(columns.noOfDays),
			accessor: "numberOfDays",
			Cell: ({ row: { original: { numberOfDays } } }: CellProps<DataType>) => {
				const numberOfHours = numberOfDays.split('-').map((values) => +values * 8).join(' - ');
				return isDaysChecked ? numberOfDays : numberOfHours
			}
		},
		{
			Header: t(columns.description),
			accessor: "description",
			width: 250,
		},
		{
			Header: t(columns.samples),
			accessor: "sample",
			width: 250,
		},
		{
			Header: "",
			id: "actions",
			width: 200,
			Cell: ({ row: { original: { id }, index } }: CellProps<DataType>) => {
				const { mutate } = useDeleteComplexities();
				const handleContext = (context: FormContext): void => {
					setContext(context);
					handleComplexityId(id);
					if (context === 'Edit')
						setOpenAddEditModal(true);
					if (context === '')
						mutate(id);
				};

				return (
					<>
						<IconButton
							onClick={() => handleContext('Edit')}
							aria-label={`edit-${index}`}
							color="primary"
						>
							<SvgIcon name="edit" $size={2} />
						</IconButton>
						<IconButton
							onClick={() => handleContext('')}
							aria-label={`delete-${index}`}
							color="error"
						>
							<SvgIcon name="delete" $size={2} />
						</IconButton>
					</>
				)
			}
		}
	]
