import { ReactElement } from "react";
import { Column } from "react-table";

import { Grid, TextField, styled, Box, IconButton } from "@mui/material";

import { PageContainer } from "~/components/page-container";
import { CustomButton } from "~/components/form/button";
import { SvgIcon, Table } from "~/components";

type DataType = {
  prjName: string;
  noOfTeams: number;
  noOfUsers: number;
};

type ColumnType = Column<DataType> & { id?: string };

interface ProjectListProps {
  handleAddProject: () => void;
  // Other props
}

const StyledTextField = styled(TextField)(() => ({
  width: "100%",
}));

const ProjectList = (props: ProjectListProps): ReactElement => {
  const { handleAddProject } = props;

  const rows = [
    {
      prjName: "eMPF",
      noOfTeams: 1,
      noOfUsers: 2,
    },
    {
      prjName: "eMPF",
      noOfTeams: 1,
      noOfUsers: 2,
    },
  ];

  const columns: ColumnType[] = [
    {
      Header: "Project",
      accessor: "prjName",
    },
    {
      Header: "No. of Teams",
      accessor: "noOfTeams",
    },
    {
      Header: "No. of Users",
      accessor: "noOfUsers",
    },
    {
      Header: "",
      id: "actions",
      Cell: () => (
        <>
          <IconButton color="primary">
            <SvgIcon name="edit" color="primary" $size={2} />
          </IconButton>
          <IconButton>
            <SvgIcon name="delete" color="error" $size={2} />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <PageContainer>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={5}>
          <StyledTextField size="small" placeholder="Enter keyword here..." />
        </Grid>
        <Grid item xs={7} container justifyContent="flex-end">
          <CustomButton type="button" onClick={handleAddProject}>
            Add Project
          </CustomButton>
        </Grid>
      </Grid>
      <Box marginTop="14px">
        <Table name="ODCTable" columns={columns} data={rows} />
      </Box>
    </PageContainer>
  );
};

export default ProjectList;
