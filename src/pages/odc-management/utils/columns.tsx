import type { Dispatch, SetStateAction } from "react";
import type { DataType, HolidayType } from "./type";

import { Column, CellProps } from "react-table";
import { IconButton } from "@mui/material";

import { SvgIcon } from "~/components";

type ODCColumnType = Column<DataType> & { id?: string };
type HolidayColumnType = Column<HolidayType>;

export const ODCColumns = (
  setIsAdd: Dispatch<SetStateAction<boolean>>,
  setIsEdit: Dispatch<SetStateAction<boolean>>,
  setIdx: Dispatch<SetStateAction<number>>,
  setDelIdx: Dispatch<SetStateAction<number | null>>,
  setDeleteModalOpen: Dispatch<SetStateAction<boolean>>,
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
              setIsAdd(true);
              setIsEdit(true);
              setIdx(row.index);
            }}
          >
            <SvgIcon name="edit" $size={2} />
          </IconButton>
          <IconButton
            onClick={() => {
              setDeleteModalOpen(true);
              setDelIdx(row.index);
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
