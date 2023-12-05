import type { ReactElement } from "react";
import type { MandaysForm, TaskType } from "../..";

import { useState } from "react";

import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider, useDrag, useDrop } from "react-dnd";

import { Grid, Typography } from "@mui/material";
import { SvgIcon, Pagination } from "~/components";
import { TextField } from "~/components/form";
import { useTranslation } from "react-i18next";

import LocalizationKey from "~/i18n/key";
import { usePagination } from "~/hooks/pagination";

import { StyledCardContainer, StyledGridItem, StyledNoDataContainer, StyledDropContainer } from ".";
import { dateFormat } from "~/utils/date";
import { getIn, useFormikContext } from "formik";

const AddTasks = (): ReactElement => {
  const [selectedTasks, setSelectedTasks] = useState<TaskType[]>([]);
  const [tasksField, setTaskField] = useState<string>("");
  const [selectedTasksField, setSelectedTasksField] = useState<string>("");
  /**
   * Pagination properties
   */

  const { values, setValues } = useFormikContext<MandaysForm>();
  const tasks: TaskType[] = getIn(values, "tasks");
  const {
    currentPage,
    totalPages,
    paginatedItems: paginatedTasks,
    handlePageChange,
  } = usePagination({ items: tasks, itemsPerPage: 2 });

  const DropZone = (): ReactElement => {
    const { mandaysCalculator } = LocalizationKey;
    const { t } = useTranslation();
    const [, drop] = useDrop(() => ({
      accept: "TASK",
      drop: (item: TaskType) => {
        const updatedTask = tasks.filter((task) => task.id !== item.id);
        setSelectedTasks((prev: any) => [...prev, item]);
        console.log(updatedTask);
        setValues({ ...values, tasks: updatedTask });
      },
    }));

    return (
      <StyledDropContainer ref={drop}>
        {selectedTasks.length > 0 ? (
          selectedTasks.map((task) => (
            <StyledCardContainer
              key={task.id}
              headerTitle={task.title}
              sx={{ background: "#EBF5FB" }}
              actionHeader={
                <SvgIcon
                  name="edit"
                  sx={{ color: "#7AC0EF", cursor: "pointer" }}
                />
              }
              subHeader={`Created date: ${dateFormat(task.createdDate)}`}
            >
              <Typography>{t(mandaysCalculator.taskDescriptionLabel)}:</Typography>
              <Typography>{task.description}</Typography>
            </StyledCardContainer>
          ))
        ) : (
          <StyledNoDataContainer
            item
            xs={12}
          >
            <Typography
              variant="h2"
              color="primary"
            >
              {t(mandaysCalculator.noSelectedTaskLabel)}
            </Typography>
          </StyledNoDataContainer>
        )}
      </StyledDropContainer>
    );
  };

  const RenderDraggableTasks = (): ReactElement => {
    const { mandaysCalculator, common } = LocalizationKey;
    const { t } = useTranslation();
    const DraggableTask = ({ task, index }: { task: TaskType; index: number }): ReactElement => {
      const [{ isDragging }, drag] = useDrag(() => ({
        type: "TASK",
        item: task,
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging(),
        }),
      }));

      return (
        <div
          ref={drag}
          style={{ opacity: isDragging ? 0.5 : 1 }}
        >
          <StyledCardContainer
            key={index}
            headerTitle={task.title}
            actionHeader={
              <SvgIcon
                name="edit"
                sx={{ color: "#7AC0EF", cursor: "pointer" }}
              />
            }
            subHeader={`${t(common.createdDateLabel)}: ${dateFormat(task.createdDate)}`}
          >
            <Typography>{t(mandaysCalculator.taskDescriptionLabel)}:</Typography>
            <Typography>{task.description}</Typography>
          </StyledCardContainer>
        </div>
      );
    };

    return (
      <StyledGridItem
        item
        xs={6}
      >
        <Grid
          container
          sx={{ mb: 5 }}
          justifyContent="space-between"
        >
          <Grid
            item
            xs={4}
          >
            <Typography
              color={"primary"}
              variant="h5"
              fontWeight="bold"
            >
              {t(mandaysCalculator.tasksListLabel)}
            </Typography>
          </Grid>
          <Grid
            item
            xs={5}
          >
            <TextField
              value={tasksField}
              name="tasks"
              onChange={(e) => setTaskField(e.target.value)}
            />
          </Grid>
        </Grid>
        {paginatedTasks().length > 0 ? (
          paginatedTasks().map((task, index) => (
            <DraggableTask
              task={task}
              index={index}
              key={task.id}
            />
          ))
        ) : (
          <StyledNoDataContainer
            item
            xs={12}
          >
            <Typography
              variant="h2"
              color="primary"
            >
              {t(mandaysCalculator.noTaskLabel)}
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

  const RenderDropZoneTasks = (): ReactElement => {
    const { t } = useTranslation();
    const { common } = LocalizationKey;
    return (
      <StyledGridItem
        item
        xs={6}
      >
        <Grid
          container
          sx={{ mb: 5 }}
          justifyContent="space-between"
        >
          <Grid
            item
            xs={4}
          >
            <Typography
              color={"primary"}
              variant="h5"
              fontWeight="bold"
            >
              {t(common.selectedLabel)}
            </Typography>
          </Grid>
          <Grid
            item
            xs={5}
          >
            <TextField
              value={selectedTasksField}
              onChange={(e) => setSelectedTasksField(e.target.value)}
              name="selectedTask"
            />
          </Grid>
        </Grid>
        <Grid container>
          <Grid
            item
            xs={12}
          >
            <DropZone />
          </Grid>
          <Grid
            item
            xs={12}
          >
            <Pagination
              totalItems={selectedTasks.length}
              itemsPerPage={3}
            />
          </Grid>
        </Grid>
      </StyledGridItem>
    );
  };

  return (
    <Grid
      container
      sx={{ paddingBottom: 10 }}
    >
      <Grid
        item
        xs={12}
      >
        <DndProvider backend={HTML5Backend}>
          <Grid
            container
            justifyContent="space-evenly"
          >
            <RenderDraggableTasks />
            <RenderDropZoneTasks />
          </Grid>
        </DndProvider>
      </Grid>
    </Grid>
  );
};

export default AddTasks;
