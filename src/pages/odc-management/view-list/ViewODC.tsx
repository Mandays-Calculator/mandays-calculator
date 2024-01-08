import type { ReactElement, ChangeEvent } from "react";
import type { OdcParam } from "~/api/odc";
import type { ViewProps } from "../utils";

import { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { Grid, TextField, styled, Box } from "@mui/material";

import { CustomButton } from "~/components/form/button";
import { Table } from "~/components";
import LocalizationKey from "~/i18n/key";

import { ODCColumns } from "../utils";

const StyledTextField = styled(TextField)(() => ({
  width: "100%",
}));

const ViewODC = (props: ViewProps): ReactElement => {
  const { data, setFormContext, setIdx } = props;

  const { t } = useTranslation();
  const { odc: { btnlabel, placeholder } } = LocalizationKey;
  
  const [filterData, setFilterData] = useState<OdcParam[]>([]);

  useEffect(() => {
    setFilterData(data?.filter((obj: OdcParam) => (obj.active).toString() === "true"));
  }, [data]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const handleLowerCase = (value: string): string => value.toLocaleLowerCase();

    setFilterData(
      data?.filter(
        (obj: OdcParam) => {
          const value = handleLowerCase(event.target.value);
          return obj.active === true &&
          (
            handleLowerCase(obj.name).includes(value) ||
            handleLowerCase(obj.abbreviation).includes(value) ||
            handleLowerCase(obj.location).includes(value)
          )
        }
      )
    );
  };

  const odcListColumn = useMemo(() => ODCColumns(t, setFormContext, setIdx), []);

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
          <CustomButton type="button" onClick={() => setFormContext("Add")}>
            {t(btnlabel.addOdc)}
          </CustomButton>
        </Grid>
      </Grid>

      <Box marginTop="14px">
        <Table
          name="ODCTable"
          columns={odcListColumn}
          data={filterData}
        />
      </Box>
    </>
  );
};

export default ViewODC;
