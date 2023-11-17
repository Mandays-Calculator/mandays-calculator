import { ReactElement, useEffect, useReducer } from "react";
import { Column } from "react-table";

import { Grid, TextField, styled, Box, IconButton } from "@mui/material";

import { PageContainer } from "~/components/page-container";
import { CustomButton } from "~/components/form/button";
import { SvgIcon, Table } from "~/components";
import { ProjectResponse, getProjects } from "~/api/projects";

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

const initialProjectListState = { results: [] as DataType[], filteredText: '', filteredResult: [] as DataType[] };

const projectListReducer = (
    state: typeof initialProjectListState, 
    action: { type: 'SET_VALUE' | 'SEARCH', payload: any }
  ) => {
    if (action.type === 'SET_VALUE') {
      const mapProjectResult: (T: ProjectResponse[]) => DataType[] = (data: ProjectResponse[]) => {
        return data.map(response => ({
          prjName: response.name,
          noOfTeams: response.project_team.length,
          noOfUsers: 1 //WIP
        }));
      } 
      const newResult = mapProjectResult(action.payload);
      
      return { ...state, results: newResult, filteredResult: newResult };
    } 
    else if (action.type === 'SEARCH') {
      const filteredData = state.results.filter((row) =>
        row.prjName.toLowerCase().includes(action.payload),
      );

      return { ...state, filteredResult: filteredData, filteredText: action.payload };
    } 
    else {
      return state
    }
}

const ProjectList = (props: ProjectListProps): ReactElement => {
  const { handleAddProject } = props;

  const [projectListState, dispatchProjectList] = useReducer(projectListReducer, initialProjectListState);

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
  
  const onChangeFilterText = (e: any) => {
    dispatchProjectList({ type: 'SEARCH', payload: e.target.value });
  }
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProjects();
        dispatchProjectList({type: 'SET_VALUE', payload: response.data ?? [] });
      } 
      catch (error) {
        dispatchProjectList({type: 'SET_VALUE', payload: [] });
        // show error if necessary
      }
        
    };

    fetchData();
  }, []);

  return (
    <PageContainer>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={5}>
          <StyledTextField
            size="small"
            placeholder="Enter keyword here..."
            value={projectListState.filteredText}
            onChange={onChangeFilterText}
          />
        </Grid>
        <Grid item xs={7} container justifyContent="flex-end">
          <CustomButton type="button" onClick={handleAddProject}>
            Add Project
          </CustomButton>
        </Grid>
      </Grid>
      <Box marginTop="14px">
        <Table name="ODCTable" columns={columns} data={projectListState.filteredResult} />
      </Box>
    </PageContainer>
  );
};

export default ProjectList;
