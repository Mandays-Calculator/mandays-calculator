
import type { Column } from "react-table";
import { render } from '@testing-library/react';

import { Table } from '~/components';

interface TableData {
  odcName: string;
  location: string;
  abbreviation: string;
  noHolidays: number;
};


describe('Table Component', () => {
  const columns: Column<TableData>[] = [
    {
      Header: "ODC Name",
      accessor: "odcName",
    },
    {
      Header: "Location",
      accessor: "location",
    },
    {
      Header: "Abbreviation",
      accessor: "abbreviation",
    },
    {
      Header: "No. Holidays",
      accessor: "noHolidays",
    }
  ];

  it('renders the table with headers and data', () => {
   
    const data: TableData[] = [
			{
				odcName: "Philippines ODC",
				location: "Philippines",
				abbreviation: "PH ODC",
				noHolidays: 26,
			},
			{
				odcName: "Philippines ODC",
				location: "Philippines",
				abbreviation: "PH ODC",
				noHolidays: 26,
			},
		];

		const { getByRole, container } = render(<Table name="common-table-test" title="Common Table" columns={columns} data={data} />)
		const table = getByRole("table");
		expect(table).toBeInTheDocument();
		
		expect(container.querySelector('.MuiTable-root')).toBeInTheDocument();
		expect(container.querySelector('.MuiTableHead-root')).toBeInTheDocument();
		expect(container.querySelector('.MuiTableRow-root')).toBeInTheDocument();
		expect(container.querySelector('.MuiTableRow-root')).toBeInTheDocument();
		expect(container.querySelector('.MuiTypography-root')).toBeInTheDocument();
	});

  it('renders a "No Data" message when no data is provided', () => {
    const { container } = render(
      <Table name="common-table-test" columns={columns} data={[]} />
    );
    expect(container).toHaveTextContent('No Data');
  });
});