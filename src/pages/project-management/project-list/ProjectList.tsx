import { useState, ReactElement } from "react";
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

  const [filterText, setFilterText] = useState("");

  const rows: DataType[] = [];
  
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

  const filteredRows = rows.filter((row) =>
    row.prjName.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <PageContainer>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={5}>
          <StyledTextField
            size="small"
            placeholder="Enter keyword here..."
            onChange={(e) => setFilterText(e.target.value)}
          />
        </Grid>
        <Grid item xs={7} container justifyContent="flex-end">
          <CustomButton type="button" onClick={handleAddProject}>
            Add Project
          </CustomButton>
        </Grid>
      </Grid>
      <Box marginTop="14px">
        <Table name="ODCTable" columns={columns} data={filteredRows} />
      </Box>
    </PageContainer>
  );
};

export default ProjectList;
