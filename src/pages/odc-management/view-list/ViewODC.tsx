import type { ReactElement, Dispatch, SetStateAction } from "react";
import type { IntValues } from "../utils/interface";

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
              {t('odc.button.add')}
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
            )}
            data={values.odcList}
          />
        </Box>
      </PageContainer>
    </>
  );
};

export default ViewODC;
