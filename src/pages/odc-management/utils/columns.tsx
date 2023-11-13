import type { Dispatch, SetStateAction } from "react";
import type { ODCListResponse, HolidayType } from "~/api/odc";

import { Column, CellProps } from "react-table";
import { IconButton } from "@mui/material";

import { SvgIcon } from "~/components";

type ODCColumnType = Column<ODCListResponse> & { id?: string };
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
      accessor: "name",
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
      id: "holidays",
      Cell: ({ row }: CellProps<ODCListResponse>) => (
        <>{row.original.holidays === null ? 0 : row.original.holidays?.length}</>
      ),
    },
    {
      Header: "",
      id: "actions",
      Cell: ({ row }: CellProps<ODCListResponse>) => (
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
    accessor: "date",
  },
  {
    Header: "Holiday",
    accessor: "holiday",
  },
];
