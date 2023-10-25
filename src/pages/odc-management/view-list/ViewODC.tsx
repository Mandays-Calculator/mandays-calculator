import type { ReactElement, Dispatch, SetStateAction } from "react";
import type { IntValues } from "../utils/interface";

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
  setAddODC: Dispatch<SetStateAction<boolean>>;
  setDeleteModalOpen: Dispatch<SetStateAction<boolean>>;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  setIdx: Dispatch<SetStateAction<number>>;
};

const ViewODC = (props: ViewProps): ReactElement => {
  const { setAddODC, setDeleteModalOpen, setIsEdit, setIdx } = props;
  const { values } = useFormikContext<IntValues>();

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
            <CustomButton type="button" onClick={handleAdd}>Add ODC</CustomButton>
          </Grid>
        </Grid>

        <Box marginTop="14px">
          <Table name="ODCTable"
            columns={ODCColumns(setAddODC,setDeleteModalOpen,setIsEdit,setIdx)}
            data={values.odcList}
          />
        </Box>
      </PageContainer>
    </>
  );
};

export default ViewODC;
