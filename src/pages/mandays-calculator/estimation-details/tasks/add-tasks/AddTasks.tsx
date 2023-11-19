import type { ReactElement } from "react";
import type { TaskType } from ".";
import { useState } from "react";

import moment from "moment";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider, useDrag, useDrop } from "react-dnd";

import { Grid, Typography } from "@mui/material";
import { SvgIcon, Pagination } from "~/components";
import { TextField } from "~/components/form";

import { usePagination } from "~/hooks/pagination";

import { tasksData } from "~/pages/mandays-calculator/utils/tableData";
import {
  StyledCardContainer,
  StyledGridItem,
  StyledNoDataContainer,
  StyledDropContainer,
} from ".";

const AddTasks = (): ReactElement => {
  const [selectedTasks, setSelectedTasks] = useState<TaskType[]>([]);
  const [tasks, setTask] = useState<TaskType[]>(tasksData);
  const [tasksField, setTaskField] = useState<string>("");
  const [selectedTasksField, setSelectedTasksField] = useState<string>("");

  /**
   * Pagination properties
   */
  const {
    currentPage,
    totalPages,
    paginatedItems: paginatedTasks,
    handlePageChange,
  } = usePagination({ items: tasks, itemsPerPage: 2 });

  const DropZone = (): ReactElement => {
    const [, drop] = useDrop(() => ({
      accept: "TASK",
      drop: (item: TaskType) => {
        //@ts-ignore
        const droppedTask = tasksData[item.id];
        const updatedTask = tasksData.filter((task) => task.id !== item.id);
        console.log(updatedTask, "updated task");
        //@ts-ignore
        setSelectedTasks((prev: any) => [...prev, droppedTask]);
        setTask(updatedTask);
      },
    }));

    return (
      <StyledDropContainer ref={drop}>
        {selectedTasks.length > 0 ? (
          selectedTasks.map((task: any, index) => (
            <StyledCardContainer
              key={index}
              headerTitle={task.title}
              sx={{ background: "#EBF5FB" }}
              actionHeader={
                <SvgIcon
                  name="edit"
                  sx={{ color: "#7AC0EF", cursor: "pointer" }}
                />
              }
              subHeader={`Created date: ${moment(new Date().toString()).format(
                "MM-DD-YYYY"
              )}`}
            >
              <Typography>Description:</Typography>
              <Typography>{task.description}</Typography>
            </StyledCardContainer>
          ))
        ) : (
          <StyledNoDataContainer item xs={12}>
            <Typography variant="h2" color="primary">
              No selected task.
            </Typography>
          </StyledNoDataContainer>
        )}
      </StyledDropContainer>
    );
  };

  const renderDraggableTasks = (): ReactElement => {
    const DraggableTask = ({
      task,
      index,
    }: {
      task: TaskType;
      index: number;
    }): ReactElement => {
      const [{ isDragging }, drag] = useDrag(() => ({
        type: "TASK",
        item: { id: index, ...task },
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging(),
        }),
      }));

      return (
        <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
          <StyledCardContainer
            key={index}
            headerTitle={task.title}
            actionHeader={
              <SvgIcon
                name="edit"
                sx={{ color: "#7AC0EF", cursor: "pointer" }}
              />
            }
            subHeader={`Created date: ${moment(new Date().toString()).format(
              "MM-DD-YYYY"
            )}`}
          >
            <Typography>Description:</Typography>
            <Typography>{task.description}</Typography>
          </StyledCardContainer>
        </div>
      );
    };

    return (
      <StyledGridItem item xs={6}>
        <Grid container sx={{ mb: 5 }} justifyContent="space-between">
          <Grid item xs={4}>
            <Typography color={"primary"} variant="h5" fontWeight="bold">
              Tasks list
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <TextField
              value={tasksField}
              name="tasks"
              onChange={(e) => setTaskField(e.target.value)}
            />
          </Grid>
        </Grid>
        {paginatedTasks().length > 0 ? (
          paginatedTasks().map((task, index) => (
            <DraggableTask task={task} index={index} />
          ))
        ) : (
          <StyledNoDataContainer item xs={12}>
            <Typography variant="h2" color="primary">
              No task.
            </Typography>
          </StyledNoDataContainer>
        )}
        <Pagination
          totalItems={totalPages}
          itemsPerPage={5}
          handleChange={handlePageChange}
          page={currentPage}
          count={totalPages}
        />
      </StyledGridItem>
    );
  };

  const renderDropZoneTasks = (): ReactElement => {
    return (
      <StyledGridItem item xs={6}>
        <Grid container sx={{ mb: 5 }} justifyContent="space-between">
          <Grid item xs={4}>
            <Typography color={"primary"} variant="h5" fontWeight="bold">
              Selected
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <TextField
              value={selectedTasksField}
              onChange={(e) => setSelectedTasksField(e.target.value)}
              name="selectedTask"
            />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12}>
            <DropZone />
          </Grid>
          <Grid item xs={12}>
            <Pagination totalItems={selectedTasks.length} itemsPerPage={3} />
          </Grid>
        </Grid>
      </StyledGridItem>
    );
  };

  return (
    <Grid container sx={{ paddingBottom: 10 }}>
      <Grid item xs={12}>
        <DndProvider backend={HTML5Backend}>
          <Grid container justifyContent="space-evenly">
            {renderDraggableTasks()}
            {renderDropZoneTasks()}
          </Grid>
        </DndProvider>
      </Grid>
    </Grid>
  );
};

export default AddTasks;
