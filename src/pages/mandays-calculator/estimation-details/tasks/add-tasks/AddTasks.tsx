import type { ChangeEvent, ReactElement } from "react";
import type { DropResult } from "react-beautiful-dnd";
import type { MandaysForm, Status, TaskType } from "../..";

import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useTranslation } from "react-i18next";
import { getIn, useFormikContext } from "formik";

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LocalizationKey from "~/i18n/key";
import { TextField } from "~/components";

import { usePagination } from "~/hooks/pagination";
import { useGetTasks } from "~/queries/mandays-est-tool/mandaysEstimationTool";
import { filterDataByValue } from "~/utils/helpers";

import { initializeTasksListData } from "../../utils/initialValue";
import { useResourceErrorAlert } from "../../utils/useHandleErrorAlert";

import DraggableContent from "./DraggableContent";
import { StyledGridItem, StyledNoDataContainer, StyledTitle } from ".";

const AddTasks = (): ReactElement => {
  const droppableList: Status[] = ["unselected", "selected"];
  const filteredValues: string[] = ["name", "description"];

  const taskStatus: string = "1";
  const { t } = useTranslation();
  const { mandaysCalculator } = LocalizationKey;
  const { values, setValues } = useFormikContext<MandaysForm>();

  const [notSelected, setNotSelected] = useState<string>("");
  const [selected, setSelected] = useState<string>("");

  const tasksData = useGetTasks(values.summary.teamId, taskStatus);

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
    <>
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
                        disabled={paginatedItems().length === 0}
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
                                <DraggableContent
                                  provided={provided}
                                  index={index}
                                  task={task}
                                />
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
                      {searchedFilteredData.length > 0 && <Pagination />}
                      {provided.placeholder}
                    </div>
                  );
                }}
              </Droppable>
            </StyledGridItem>
          ))}
        </Grid>
      </DragDropContext>
      {useResourceErrorAlert("tasks")}
    </>
  );
};

export default AddTasks;
