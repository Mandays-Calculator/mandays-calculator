import type { ODCListResponse, HolidayType } from "~/api/odc";
import type { TFunction } from "i18next";
import type { FormContext } from "../utils/interface";

import { Column, CellProps } from "react-table";
import { IconButton } from "@mui/material";
import moment from "moment";

import { SvgIcon } from "~/components";
import { ControlledTextField, ControlledDatePicker } from "~/components/form/controlled";
import LocalizationKey from "~/i18n/key";

type ODCColumnType = Column<ODCListResponse> & { id?: string };

const { odc: { label } } = LocalizationKey;

export const ODCColumns = (
  t: TFunction<"translation", undefined>,
  setFormContext: (context: FormContext) => void,
  setIdx: (idx: number) => void,
): ODCColumnType[] => {
  return [
    {
      Header: t(label.name),
      accessor: "name",
    },
    {
      Header: t(label.location),
      accessor: "location",
    },
    {
      Header: t(label.abbreviation),
      accessor: "abbreviation",
    },
    {
      Header: t(label.noHolidays),
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
              setFormContext("Edit");
              setIdx(row.index);
            }}
            aria-label={`edit-${row.index}`}
          >
            <SvgIcon name="edit" $size={2} />
          </IconButton>
          <IconButton
            onClick={() => {
              setFormContext("Delete");
              setIdx(row.index);
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
  holIdx: number[],
  setHolIdx: (idx: number[]) => void,
  handleDeleteHoliday: (idx: number) => void,
): Column<HolidayType>[] => {
  return [
    {
      Header: t(label.date),
      accessor: "date",
      Cell: ({ row }: CellProps<HolidayType>) => {
        const formatDate = moment(row.original.date, "yyyy-MM-DD hh:mm:ss").format("yyyy-MM-DD");
        let valueDate = "";
        if (row.original.date !== undefined || row.original.date !== null)
          valueDate = moment(row.original.date, "yyyy-MM-DD hh:mm:ss").format("MM/DD/yyyy");
        return (
          <>
            {holIdx.includes(row.index) ? (
              <ControlledDatePicker
                name={`holidays.${row.index}.date`}
                value={valueDate}
              />
            ) : (
              <>{formatDate}</>
            )}
          </>
        )
      },
    },
    {
      Header: t(label.holiday),
      accessor: "holiday",
      Cell: ({ row }: CellProps<HolidayType>) => (
        <>
          {holIdx.includes(row.index) ? (
            <ControlledTextField
              name={`holidays.${row.index}.holiday`}
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
          {!holIdx.includes(row.index) && (
            <>
              <IconButton
                onClick={() => setHolIdx([row.index, ...holIdx])}
                aria-label={`edit-${row.index}`}
              >
                <SvgIcon name="edit" $size={2} />
              </IconButton>
              <IconButton
                onClick={() => handleDeleteHoliday(row.index)}
                aria-label={`delete-${row.index}`}
              >
                <SvgIcon name="delete" $size={2} />
              </IconButton>
            </>
          )}
        </>
        
      ),
    },
  ];
};
