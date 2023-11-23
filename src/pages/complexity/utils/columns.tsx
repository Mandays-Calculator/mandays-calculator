import type { Column, CellProps } from "react-table"
import { DataType } from ".";

export const complexityColumns = (isDaysChecked: boolean): Column<DataType>[] =>
	[
		{ Header: 'Complexity', accessor: 'name', },
		{
			Header: `No. of Days`,
			accessor: `numberOfDays`,
			Cell: ({ row: { original: { numberOfDays } } }: CellProps<DataType>) => {
				const numberOfHours = numberOfDays.split('-').map((values) => +values * 8).join(' - ');
				return isDaysChecked ? numberOfDays : numberOfHours
			}
		},
		{ Header: 'No. of Features', accessor: 'numberOfFeatures', },
		{ Header: 'Description', accessor: 'description', },
		{ Header: 'Samples', accessor: 'sample', }
	]
