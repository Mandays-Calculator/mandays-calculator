import type { Dispatch, SetStateAction } from "react";
import type { ODCListResponse, HolidayType } from "~/api/odc";
import type { TFunction } from "i18next";

import { Column, CellProps } from "react-table";
import { IconButton } from "@mui/material";

import { SvgIcon } from "~/components";
import { CustomButton } from "~/components/form/button";
import { ControlledTextField, ControlledDatePicker } from "~/components/form/controlled";

type ODCColumnType = Column<ODCListResponse> & { id?: string };


export const ODCColumns = (
  setIsAdd: Dispatch<SetStateAction<boolean>>,
  setIsEdit: Dispatch<SetStateAction<boolean>>,
  setIdx: Dispatch<SetStateAction<number>>,
  setDelIdx: Dispatch<SetStateAction<number | null>>,
  setDeleteModalOpen: Dispatch<SetStateAction<boolean>>,
  t: TFunction<"translation", undefined>,
): ODCColumnType[] => {
  return [
    {
      Header: t("odc.label.name"),
      accessor: "name",
    },
    {
      Header: t("odc.label.location"),
      accessor: "location",
    },
    {
      Header: t("odc.label.abbreviation"),
      accessor: "abbreviation",
    },
    {
      Header: t("odc.label.noHolidays"),
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
            aria-label={`edit-${row.index}`}
          >
            <SvgIcon name="edit" $size={2} />
          </IconButton>
          <IconButton
            onClick={() => {
              setDeleteModalOpen(true);
              setDelIdx(row.index);
            }}
            aria-label={`delete-${row.index}`}
          >
            <SvgIcon name="delete" $size={2} />
          </IconButton>
        </>
      ),
    },
  ];
};

export const HolidayColumn = (
  t: TFunction<"translation", undefined>,
  editIdx: number[],
  setEditIdx: Dispatch<SetStateAction<number[]>>,
  idx: number,
): Column<HolidayType>[] => {
  return [
    {
      Header: t("odc.label.date"),
      accessor: "date",
      Cell: ({ row }: CellProps<HolidayType>) => (
        <>
          {editIdx.includes(row.index) ? (
            <ControlledDatePicker
              name={`odcList.${idx}.holidays.${row.index}.date`}
            />
          ) : (
            <>{row.original.date}</>
          )}
        </>
      ),
    },
    {
      Header: t("odc.label.holiday"),
      accessor: "holiday",
      Cell: ({ row }: CellProps<HolidayType>) => (
        <>
          {editIdx.includes(row.index) ? (
            <ControlledTextField
              name={`odcList.${idx}.holidays.${row.index}.holiday`}
            />
          ) : (
            <>{row.original.holiday}</>
          )}
        </>
      ),
    },
    {
      Header: "",
      id: "actions",
      Cell: ({ row }: CellProps<HolidayType>) => (
        <>
          {!editIdx.includes(row.index) && (
            <CustomButton
              type="button"
              onClick={() => { setEditIdx([row.index, ...editIdx]) }}
            >
              {t("odc.btnlabel.edit")}
            </CustomButton>
          )}
        </>
        
      ),
    },
  ];
};
