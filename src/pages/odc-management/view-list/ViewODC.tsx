import type { ReactElement, Dispatch, SetStateAction, ChangeEvent } from "react";
import type { ODCListResponse } from "~/api/odc";
import type { IntValues } from "../utils/interface";

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { Grid, TextField, styled, Box } from "@mui/material";
import { useFormikContext } from "formik";

import { PageContainer } from "~/components/page-container";
import { CustomButton } from "~/components/form/button";
import { Table } from "~/components";

import { ODCColumns } from "../utils/columns";

const StyledTextField = styled(TextField)(() => ({
  width: "100%",
}));

type ViewProps = {
  setIsAdd: Dispatch<SetStateAction<boolean>>;
  setDeleteModalOpen: Dispatch<SetStateAction<boolean>>;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  setIdx: Dispatch<SetStateAction<number>>;
  setDelIdx: Dispatch<SetStateAction<number | null>>;
};

const ViewODC = (props: ViewProps): ReactElement => {
  const { t } = useTranslation();
  const { setIsAdd, setDeleteModalOpen, setIsEdit, setIdx, setDelIdx } = props;
  const { values } = useFormikContext<IntValues>();
  const [filterData, setFilterData] = useState<ODCListResponse[]>([]);

  useEffect(() => {
    setFilterData(values?.odcList?.filter((obj: ODCListResponse) => obj.active === true));
  }, [values]);

  const handleAdd = (): void => {
    setIsAdd(true);
    setIsEdit(false);
  };

  const handleLowerCase = (value: string): string => value.toLocaleLowerCase();

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setFilterData(
      values?.odcList?.filter(
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
      <PageContainer sx={{ background: "#FFFFFF" }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={5}>
            <StyledTextField
              size="small"
              placeholder={t("odc.placeholder")}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={7} container justifyContent="flex-end">
            <CustomButton type="button" onClick={handleAdd}>
              {t("odc.btnlabel.addOdc")}
            </CustomButton>
          </Grid>
        </Grid>

        <Box marginTop="14px">
          <Table
            name="ODCTable"
            columns={ODCColumns(
              setIsAdd,
              setIsEdit,
              setIdx,
              setDelIdx,
              setDeleteModalOpen,
              t
            )}
            data={filterData}
          />
        </Box>
      </PageContainer>
    </>
  );
};

export default ViewODC;
