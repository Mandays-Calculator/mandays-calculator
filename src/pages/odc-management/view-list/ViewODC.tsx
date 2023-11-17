import type { ReactElement, Dispatch, SetStateAction } from "react";

import { useTranslation } from "react-i18next";

import { Grid, TextField, styled, Box } from "@mui/material";

import { PageContainer } from "~/components/page-container";
import { CustomButton } from "~/components/form/button";
import { Table } from "~/components";

import { ODCColumns } from "../utils/columns";
import { ODCListResponse } from "~/api/odc/types";

const StyledTextField = styled(TextField)(() => ({
  width: "100%",
}));

type ViewProps = {
  setIsAdd: Dispatch<SetStateAction<boolean>>;
  setDeleteModalOpen: Dispatch<SetStateAction<boolean>>;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  setIdx: Dispatch<SetStateAction<number>>;
  data: ODCListResponse[];
  setDelIdx: Dispatch<SetStateAction<number | null>>;
};

const ViewODC = (props: ViewProps): ReactElement => {
  const { t } = useTranslation();
  const { setIsAdd, setDeleteModalOpen, setIsEdit, setIdx, setDelIdx } = props;

  const handleAdd = (): void => {
    setIsAdd(true);
    setIsEdit(false);
  };

  return (
    <>
      <PageContainer sx={{ background: "#FFFFFF" }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={5}>
            <StyledTextField size="small" placeholder="Enter keyword here..." />
          </Grid>
          <Grid item xs={7} container justifyContent="flex-end">
            <CustomButton type="button" onClick={handleAdd}>
              {t("odc.button.add")}
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
              setDeleteModalOpen
            )}
            data={props.data}
          />
        </Box>
      </PageContainer>
    </>
  );
};

export default ViewODC;
