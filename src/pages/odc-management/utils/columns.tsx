import type { Dispatch, SetStateAction } from "react";

import { Column } from "react-table";
import { IconButton } from "@mui/material";

import { SvgIcon } from "~/components";

type DataType = {
  odcName: string;
  location: string;
  abbreviation: string;
  noHolidays: number;
};

type HolidayType = {
  holidayDate: string;
  holidayName: string;
};

type ODCColumnType = Column<DataType> & { id?: string };
type HolidayColumnType = Column<HolidayType>;

export const ODCColumns = (
  setDeleteModalOpen: Dispatch<SetStateAction<boolean>>
): ODCColumnType[] => {
  return [
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
    },
    {
      Header: "",
      id: "actions",
      Cell: () => (
        <>
          <IconButton color="primary">
            <SvgIcon name="edit" color="primary" $size={2} />
          </IconButton>
          <IconButton onClick={() => setDeleteModalOpen(true)}>
            <SvgIcon name="delete" color="error" $size={2} />
          </IconButton>
        </>
      ),
    },
  ];
};

export const HolidayColumn: HolidayColumnType[] = [
  {
    Header: "Date",
    accessor: "holidayDate",
  },
  {
    Header: "Holiday",
    accessor: "holidayName",
  },
];