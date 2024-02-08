import type { ChangeEvent, ReactElement } from "react";
import type { DropResult } from "react-beautiful-dnd";
import type { MandaysForm, Status, TaskType } from "../..";

import { Fragment, useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useTranslation } from "react-i18next";

import { getIn, useFormikContext } from "formik";

import {
  StyledCardContainer,
  StyledGridItem,
  StyledNoDataContainer,
  StyledTitle,
} from ".";

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import { TextField } from "~/components";
import { dateFormat } from "~/utils/date";
import LocalizationKey from "~/i18n/key";
import { usePagination } from "~/hooks/pagination";
import { useGetTasks } from "~/queries/mandays-est-tool/MandaysEstimationTool";

import { initializeTasksListData } from "../utils/initializeTasks";
import { filterDataByValue } from "~/utils/helpers";

const AddTasks = (): ReactElement => {
  const droppableList: Status[] = ["unselected", "selected"];
  const filteredValues: string[] = ["name", "description"];

  const taskStatus: string = "1";
  const { t } = useTranslation();
  const { mandaysCalculator, common } = LocalizationKey;

  const { values, setValues } = useFormikContext<MandaysForm>();

  const [notSelected, setNotSelected] = useState<string>("");
  const [selected, setSelected] = useState<string>("");

  const tasksData = useGetTasks(
    "a2eb9f01-6e4e-11ee-8624-a0291936d1c2", // hard coded for now since getTask is not fully working
    taskStatus,
  );

  const tasks: TaskType[] = getIn(values, "tasks");

  useEffect(() => {
    const toBeTask = initializeTasksListData(
      tasksData.data as unknown as TaskType[],
      values.tasks,
    );
    if (toBeTask) {
      setValues({ ...values, tasks: toBeTask });
    }
  }, [tasksData.data]);

  const handleDragEnd = (result: DropResult): void => {
    const { destination, draggableId } = result;
    if (!destination) return;
    const destinationStatus = destination.droppableId as Status;
    const draggedTask = tasks.find((task) => task.id === draggableId);
    if (draggedTask) {
      const updatedData: TaskType[] = tasks.map((task) => {
        if (task.id === draggableId) {
          return {
            ...task,
            dndStatus: destinationStatus,
          };
        }
        return task;
      });

      setValues({ ...values, tasks: updatedData });
    }
  };

  const handleSearch = (
    e: ChangeEvent<HTMLInputElement>,
    status: Status,
  ): void => {
    if (status === "selected") {
      setSelected(e.target.value);
    } else {
      setNotSelected(e.target.value);
    }
  };

  return (
    <Fragment>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Grid container spacing={2} justifyContent={"space-between"}>
          {droppableList.map((droppable, index) => (
            <StyledGridItem $type={droppable} item xs={5.9} key={index}>
              <Droppable droppableId={droppable}>
                {(provided) => {
                  const filteredData = tasks.filter(
                    (filtered) => filtered.dndStatus === droppable,
                  );

                  const { paginatedItems, Pagination } = usePagination({
                    items: filteredData,
                    itemsPerPage: 5,
                  });

                  const searchedFilteredData = filterDataByValue(
                    paginatedItems(),
                    droppable === "selected" ? selected : notSelected,
                    filteredValues,
                  );

                  return (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      <StyledTitle variant="h5" color="primary">
                        {droppable === "selected"
                          ? "Selected Task"
                          : "Task List"}
                      </StyledTitle>
                      <TextField
                        name={`mandays-${droppable}`}
                        value={
                          droppable === "selected" ? selected : notSelected
                        }
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          handleSearch(e, droppable)
                        }
                        endAdornment={<SearchOutlinedIcon />}
                        sx={{ marginBottom: "1.5rem", background: "#fff" }}
                      />
                      {searchedFilteredData.length !== 0 ? (
                        searchedFilteredData.map((task, index) => (
                          <Draggable
                            draggableId={task.id}
                            key={task.id}
                            index={index}
                          >
                            {(provided) => {
                              return (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <StyledCardContainer
                                    key={index}
                                    headerTitle={task.name}
                                    subHeader={`${t(
                                      common.createdDateLabel,
                                    )}: ${dateFormat(
                                      task.createdDate,
                                      "DD/MM/YYYY",
                                    )}`}
                                  >
                                    <Typography>
                                      {t(
                                        mandaysCalculator.taskDescriptionLabel,
                                      )}
                                    </Typography>
                                    <Typography>{task.description}</Typography>
                                  </StyledCardContainer>
                                </div>
                              );
                            }}
                          </Draggable>
                        ))
                      ) : (
                        <StyledNoDataContainer item xs={12}>
                          <Typography variant="h2" color="primary">
                            {t(mandaysCalculator.noSelectedTaskLabel)}
                          </Typography>
                        </StyledNoDataContainer>
                      )}
                      <Pagination />
                      {provided.placeholder}
                    </div>
                  );
                }}
              </Droppable>
            </StyledGridItem>
          ))}
        </Grid>
      </DragDropContext>
    </Fragment>
  );
};

export default AddTasks;
