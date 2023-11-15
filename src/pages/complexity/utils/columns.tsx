import type { Column } from "react-table"
import { DataType } from "./types"


export const complexityColumns = (daysOrHours: boolean): Column<DataType>[] => {

	const renderdaysOrHours = (): Column<DataType> =>
		daysOrHours ?
			{ Header: `No. of Days`, accessor: `noOfDays`, } :
			{ Header: `No. of Hours`, accessor: `hours`, }

	return [
		{ Header: 'Complexit', accessor: 'complexity', },
		renderdaysOrHours(),
		{ Header: 'No. of Features', accessor: 'noOfFeatures', },
		{ Header: 'Description', accessor: 'description', },
		{ Header: 'Samples', accessor: 'samples', }
	]
}