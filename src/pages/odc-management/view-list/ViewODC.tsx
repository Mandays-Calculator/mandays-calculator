import type { ReactElement, Dispatch, SetStateAction } from "react";

import { Grid, TextField, styled, Box } from "@mui/material";

import { PageContainer } from "~/components/page-container";
import { CustomButton } from "~/components/form/button";
import { Table } from "~/components";

import { DataType, ODCColumns } from "../utils/columns";

const StyledTextField = styled(TextField)(() => ({
  width: "100%",
}));

type ViewProps = {
  setAddODC: Dispatch<SetStateAction<boolean>>;
  setDeleteModalOpen: Dispatch<SetStateAction<boolean>>;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  setIdx: Dispatch<SetStateAction<number>>;
  data: DataType[];
  onDeleteRow: (index: number) => void;
};

const ViewODC = (props: ViewProps): ReactElement => {
  const { setAddODC, setDeleteModalOpen, setIsEdit, setIdx } = props;

  const handleAdd = () => {
    setAddODC(true);
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
              Add ODC
            </CustomButton>
          </Grid>
        </Grid>

        <Box marginTop="14px">
          <Table
            name="ODCTable"
            columns={ODCColumns(
              setAddODC,
              setDeleteModalOpen,
              setIsEdit,
              setIdx,
              props.onDeleteRow
            )}
            data={props.data}
          />
        </Box>
      </PageContainer>
    </>
  );
};

export default ViewODC;
