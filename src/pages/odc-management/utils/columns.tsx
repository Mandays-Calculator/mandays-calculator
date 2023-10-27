import type { Dispatch, SetStateAction } from "react";

import { Column, CellProps } from "react-table";
import { IconButton } from "@mui/material";

import { SvgIcon } from "~/components";

export type DataType = {
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
  setAddODC: Dispatch<SetStateAction<boolean>>,
  setDeleteModalOpen: Dispatch<SetStateAction<boolean>>,
  setIsEdit: Dispatch<SetStateAction<boolean>>,
  setIdx: Dispatch<SetStateAction<number>>,
  onDeleteRow: (index: number) => void
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
      Cell: ({ row }: CellProps<DataType>) => (
        <>
          <IconButton
            onClick={() => {
              setAddODC(true);
              setIsEdit(true);
              setIdx(row.index);
            }}
          >
            <SvgIcon name="edit" $size={2} />
          </IconButton>
          <IconButton
            onClick={() => {
              setDeleteModalOpen(true);
              onDeleteRow(row.index);
            }}
          >
            <SvgIcon name="delete" $size={2} />
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
