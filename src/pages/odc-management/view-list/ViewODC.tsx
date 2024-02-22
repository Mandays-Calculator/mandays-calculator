import type { ReactElement, ChangeEvent } from "react";
import type { OdcParam } from "~/api/odc";
import type { ViewProps } from "../utils";

import { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { Grid, TextField, styled, Box } from "@mui/material";

import { CustomButton } from "~/components/form/button";
import { Table } from "~/components";
import LocalizationKey from "~/i18n/key";

import { ODCColumns, SucErrData } from "../utils";
import { filterDataByValue } from "~/utils/helpers";

const StyledTextField = styled(TextField)(() => ({
  width: "100%",
}));

const ViewODC = (props: ViewProps): ReactElement => {
  const { data, setFormContext, setIdx, setSuccessError, country } = props;

  const { t } = useTranslation();
  const {
    odc: { btnlabel, placeholder },
  } = LocalizationKey;

  const [filterData, setFilterData] = useState<OdcParam[]>([]);

  useEffect(() => {
    setFilterData(
      data?.filter((obj: OdcParam) => obj.active.toString() === "true"),
    );
  }, [data]);

  const handleAdd = (): void => {
    setFormContext("Add");
    setSuccessError(SucErrData);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const handleLowerCase = (value: string): string => value.toLowerCase();

    const inputValue = handleLowerCase(event.target.value);

    setFilterData(
      filterDataByValue(
        data.filter((odc) => odc.active && odc),
        inputValue,
        ["name", "abbreviation", "location"],
      ),
    );
  };

  const odcListColumn = useMemo(
    () => ODCColumns(t, setFormContext, setIdx, setSuccessError, country),
    [],
  );

  return (
    <>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={5}>
          <StyledTextField
            size="small"
            placeholder={t(placeholder)}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={7} container justifyContent="flex-end">
          <CustomButton type="button" onClick={handleAdd}>
            {t(btnlabel.addOdc)}
          </CustomButton>
        </Grid>
      </Grid>

      <Box marginTop="14px">
        <Table name="ODCTable" columns={odcListColumn} data={filterData} />
      </Box>
    </>
  );
};

export default ViewODC;
