import type { OdcParam, HolidayParam } from "~/api/odc";
import type { TFunction } from "i18next";
import type { FormContext } from "../utils";

import { Column, CellProps } from "react-table";
import { IconButton } from "@mui/material";
import moment from "moment";

import { SvgIcon } from "~/components";
import { ControlledTextField, ControlledDatePicker } from "~/components/form/controlled";
import { CustomButton } from "~/components/form/button";
import LocalizationKey from "~/i18n/key";

type ODCColumnType = Column<OdcParam> & { id?: string };

const { odc: { label, btnlabel } } = LocalizationKey;

export const ODCColumns = (
  t: TFunction<"translation", undefined>,
  setFormContext: (context: FormContext) => void,
  setIdx: (idx: string) => void,
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
      Cell: ({ row }: CellProps<OdcParam>) => (
        <>{row.original.holidays === null ? 0 : row.original.holidays?.length}</>
      ),
    },
    {
      Header: "",
      id: "actions",
      Cell: ({ row }: CellProps<OdcParam>) => (
        <>
          <IconButton
            onClick={() => {
              setFormContext("Edit");
              setIdx(row.original.id);
            }}
            aria-label={`edit-${row.index}`}
          >
            <SvgIcon name="edit" $size={2} />
          </IconButton>
          <IconButton
            onClick={() => {
              setFormContext("Delete");
              setIdx(row.original.id);
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
  handleDeleteHoliday: (holidayId: string) => void,
  handleUpdateHoliday: (data: HolidayParam) => void,
): Column<HolidayParam>[] => {
  return [
    {
      Header: t(label.date),
      accessor: "date",
      Cell: ({ row }: CellProps<HolidayParam>) => {
        let valueDate = "";
        if (row.original.date !== undefined || row.original.date !== null)
          valueDate = moment(row.original.date).format("yyyy/MM/DD");

        return (
          <>
            {holIdx.includes(row.index) ? (
              <ControlledDatePicker
                name={`holidays.${row.index}.date`}
                value={valueDate}
                dateFormat="yyyy/MM/dd"
              />
            ) : (
              <>{valueDate}</>
            )}
          </>
        )
      },
    },
    {
      Header: t(label.holiday),
      accessor: "name",
      Cell: ({ row }: CellProps<HolidayParam>) => (
        <>
          {holIdx.includes(row.index) ? (
            <ControlledTextField
              name={`holidays.${row.index}.name`}
            />
          ) : (
            <>{row.original.name}</>
          )}
        </>
      ),
    },
    {
      Header: "",
      id: "actions",
      Cell: ({ row }: CellProps<HolidayParam>) => (
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
                onClick={() => handleDeleteHoliday(row.original.id)}
                aria-label={`delete-${row.index}`}
              >
                <SvgIcon name="delete" $size={2} />
              </IconButton>
            </>
          )}
          {(holIdx.includes(row.index) && row.original.id !== "") && (
            <CustomButton
              type="button"
              onClick={() => handleUpdateHoliday(row.original)}
            >
              {t(btnlabel.save)}
            </CustomButton>
          )}
        </>
      ),
    },
  ];
};
