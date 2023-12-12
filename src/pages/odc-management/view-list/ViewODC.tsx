import type { ReactElement, ChangeEvent } from "react";
import type { ODCListResponse } from "~/api/odc";
import type { FormContext } from "../utils/interface";

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { Grid, TextField, styled, Box } from "@mui/material";

import { CustomButton } from "~/components/form/button";
import { Table } from "~/components";
import LocalizationKey from "~/i18n/key";

import { ODCColumns } from "../utils/columns";

const StyledTextField = styled(TextField)(() => ({
  width: "100%",
}));

type ViewProps = {
  data: ODCListResponse[];
  setFormContext: (context: FormContext) => void;
  setIdx: (idx: number) => void;
};

const ViewODC = (props: ViewProps): ReactElement => {
  const { data, setFormContext, setIdx } = props;

  const { t } = useTranslation();
  const { odc: { btnlabel, placeholder } } = LocalizationKey;
  
  const [filterData, setFilterData] = useState<ODCListResponse[]>([]);

  useEffect(() => {
    setFilterData(data?.filter((obj: ODCListResponse) => obj.active === true));
  }, [data]);

  const handleLowerCase = (value: string): string => value.toLocaleLowerCase();

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setFilterData(
      data?.filter(
        (obj: ODCListResponse) => {
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
          columns={ODCColumns(
            t,
            setFormContext,
            setIdx,
          )}
          data={filterData}
        />
      </Box>
    </>
  );
};

export default ViewODC;
