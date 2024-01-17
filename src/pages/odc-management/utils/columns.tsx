import type { OdcParam, HolidayParam } from "~/api/odc";
import type { TFunction } from "i18next";
import type { FormContext, SucErrType } from "../utils";

import { Column, CellProps } from "react-table";
import { IconButton } from "@mui/material";
import moment from "moment";

import { SvgIcon } from "~/components";
import { ControlledTextField, ControlledDatePicker } from "~/components/form/controlled";
import { CustomButton } from "~/components/form/button";
import LocalizationKey from "~/i18n/key";

import { SucErrData } from "../utils";

type ODCColumnType = Column<OdcParam> & { id?: string };

const { odc: { label, btnlabel } } = LocalizationKey;

export const ODCColumns = (
  t: TFunction<"translation", undefined>,
  setFormContext: (context: FormContext) => void,
  setIdx: (idx: string) => void,
  setSuccessError: (sucErr: SucErrType) => void,
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
              setSuccessError(SucErrData);
              setFormContext("Edit");
              setIdx(row.original.id);
            }}
            aria-label={`edit-${row.index}`}
          >
            <SvgIcon name="edit" $size={2} />
          </IconButton>
          <IconButton
            onClick={() => {
              setSuccessError(SucErrData);
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

export const AddHolidayColumn = (
  t: TFunction<"translation", undefined>,
): Column<HolidayParam>[] => {
  return [
    {
      Header: t(label.date),
      accessor: "date",
      Cell: ({ row }: CellProps<HolidayParam>) => {
        let valueDate = "";
        if (row.original.date !== undefined && row.original.date !== null && row.original.date !== "")
          valueDate = moment(row.original.date).format("yyyy/MM/DD");

        return (
          <ControlledDatePicker
            name={`holidays.${row.index}.date`}
            value={valueDate}
            dateFormat="yyyy/MM/dd"
          />
        );
      },
    },
    {
      Header: t(label.holiday),
      accessor: "name",
      Cell: ({ row }: CellProps<HolidayParam>) => {
        return (
          <ControlledTextField
            name={`holidays.${row.index}.name`}
            value={row.original.name}
          />
        );
      },
    },
  ];
};

export const EditHolidayColumn = (
  t: TFunction<"translation", undefined>,
  holIdx: number[],
  setHolIdx: (holIdx: number[]) => void,
  handleDeleteHoliday: (id: string, holidayId: number) => void,
  handleUpdateHoliday: (data: HolidayParam) => void,
  setSuccessError: (sucErr: SucErrType) => void,
): Column<HolidayParam>[] => {
  return [
    {
      Header: t(label.date),
      accessor: "date",
      Cell: ({ row }: CellProps<HolidayParam>) => {
        let valueDate = "";
        if (row.original.date !== undefined && row.original.date !== null && row.original.date !== "")
          valueDate = moment(row.original.date).format("yyyy/MM/DD");

        return (
          <>
            {(holIdx.includes(row.original.id) || row.original.id === 0) ? (
              <>
                <ControlledDatePicker
                  name={`holidays.${row.index}.date`}
                  value={valueDate}
                  dateFormat="yyyy/MM/dd"
                />
              </>
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
      Cell: ({ row }: CellProps<HolidayParam>) => {
        return (
          <>
            {(holIdx.includes(row.original.id) || row.original.id === 0) ? (
              <ControlledTextField
                name={`holidays.${row.index}.name`}
                value={row.original.name}
              />
            ) : (
              <>{row.original.name}</>
            )}
          </>
        );
      },
    },
    {
      Header: "",
      id: "actions",
      Cell: ({ row }: CellProps<HolidayParam>) => (
        <>
          {(!holIdx.includes(row.original.id) && row.original.id !== 0) && (
            <>
              <IconButton
                onClick={() => {
                  setSuccessError(SucErrData);
                  setHolIdx([...holIdx, row.original.id]);
                }}
                aria-label={`edit-${row.index}`}
              >
                <SvgIcon name="edit" $size={2} />
              </IconButton>
              <IconButton
                onClick={() => {
                  setSuccessError(SucErrData);
                  handleDeleteHoliday(row.original.odcId, row.original.id);
                }}
                aria-label={`delete-${row.index}`}
              >
                <SvgIcon name="delete" $size={2} />
              </IconButton>
            </>
          )}
          {(holIdx.includes(row.original.id)) && (
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
