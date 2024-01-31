import type { Column, CellProps } from "react-table";
import type { TFunction } from "i18next";
import type { SucErrType } from ".";

import { IconButton } from "@mui/material";

import { SvgIcon } from "~/components";
import LocalizationKey from "~/i18n/key";

import { DataType, FormContext, SucErrData } from ".";

const {
  complexity: {
    table: { columns },
  },
} = LocalizationKey;

export const complexityColumns = (
  isDaysChecked: boolean,
  handleContext: (complexity: FormContext, id: string, rowId?: number) => void,
  t: TFunction<"translation", undefined>,
  setSuccessError: (sucErr: SucErrType) => void
): Column<DataType>[] => {
  return [
    {
      Header: t(columns.complexity),
      accessor: "name",
    },
    {
      Header: t(isDaysChecked == true ? columns.noOfDays : columns.noOfHours),
      accessor: "minHours",
      Cell: ({
        row: {
          original: { minHours, maxHours },
        },
      }: CellProps<DataType>) => {
        const minimumHours =
          minHours !== undefined || minHours !== null ? minHours : "";
        const maximumHours =
          maxHours !== undefined || maxHours !== null ? maxHours : "";
        const minimumDays =
          minimumHours !== "" ? (parseInt(minimumHours) / 8).toString() : "";
        const maximumDays =
          maximumHours !== "" ? (parseInt(maximumHours) / 8).toString() : "";

        return isDaysChecked
          ? `${minimumDays} - ${maximumDays}`
          : `${minimumHours} - ${maximumHours}`;
      },
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
      Cell: ({
        row: {
          original: { id },
          index,
        },
      }: CellProps<DataType>) => {
        return (
          <>
            <IconButton
              onClick={() => {
                setSuccessError(SucErrData);
                handleContext("Edit", id);
              }}
              aria-label={`edit-${index}`}
              color="primary"
            >
              <SvgIcon name="edit" $size={2} />
            </IconButton>
            <IconButton
              onClick={() => {
                setSuccessError(SucErrData);
                handleContext("", id, index);
              }}
              aria-label={`delete-${index}`}
              color="error"
            >
              <SvgIcon name="delete" $size={2} />
            </IconButton>
          </>
        );
      },
    },
  ];
};
