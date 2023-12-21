import type { Column, CellProps } from "react-table"
import type { TFunction } from "i18next";

import { IconButton } from "@mui/material";

import { SvgIcon } from "~/components";
import LocalizationKey from "~/i18n/key";

import { DataType, FormContext } from ".";

const { complexity: { table: { columns } } } = LocalizationKey;

export const complexityColumns = (
	isDaysChecked: boolean,
	handleContext: (complexity: FormContext, id: string) => void,
	t: TFunction<"translation", undefined>,
): Column<DataType>[] => {
	return [
		{
			Header: t(columns.complexity),
			accessor: "name",
		},
		{
			Header: t(columns.noOfHours),
			accessor: "numberOfHours",
			Cell: ({ row: { original: { numberOfHours } } }: CellProps<DataType>) => {
				const numberOfDays = numberOfHours.split('-').map((values) => + values / 8).join(' - ');
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
				return (
					<>
						<IconButton
							onClick={() => handleContext('Edit', id)}
							aria-label={`edit-${index}`}
							color="primary"
						>
							<SvgIcon name="edit" $size={2} />
						</IconButton>
						<IconButton
							onClick={() => handleContext('', id)}
							aria-label={`delete-${index}`}
							color="error"
						>
							<SvgIcon name="delete" $size={2} />
						</IconButton>
					</>
				)
			},
		},
	];
};
