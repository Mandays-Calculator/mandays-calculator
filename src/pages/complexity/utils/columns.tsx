import type { Column, CellProps } from "react-table"
import { DataType, FormContext } from ".";
import { CustomButton } from "~/components/form/button";
import { useDeleteComplexities } from "~/queries/complexity/Complexities";

export const complexityColumns = (
	isDaysChecked: boolean,
	setContext: (context: FormContext) => void,
	handleComplexityId: (id: string) => void
): Column<DataType>[] =>
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
		{ Header: 'Samples', accessor: 'sample', },
		{
			Header: 'Action', Cell: ({ row: { original: { id } } }: CellProps<DataType>) => {
				const { mutate } = useDeleteComplexities();
				const handleContext = (context: FormContext): void => {
					if (context === 'Delete') mutate(id);
					setContext(context)
					handleComplexityId(id)
				}
				return (
					<>
						<CustomButton onClick={() => handleContext('Edit')}>Edit</CustomButton>
						<CustomButton colorVariant="error" onClick={() => handleContext('Delete')}>Delete</CustomButton>
					</>
				)
			}
		}
	]
