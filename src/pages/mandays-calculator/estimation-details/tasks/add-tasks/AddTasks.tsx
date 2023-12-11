import type { ChangeEvent, ReactElement } from "react";
import type { DropResult } from "react-beautiful-dnd";
import type { MandaysForm, Status, TaskType } from "../..";

import { Fragment, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useTranslation } from "react-i18next";

import { getIn, useFormikContext } from "formik";

import { StyledCardContainer, StyledGridItem, StyledNoDataContainer } from ".";

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import { SvgIcon, TextField } from "~/components";
import { dateFormat } from "~/utils/date";
import LocalizationKey from "~/i18n/key";

const AddTasks = (): ReactElement => {
  const droppableList: Status[] = ["unselected", "selected"];
  const { values, setValues } = useFormikContext<MandaysForm>();
  const [notSelected, setNotSelected] = useState<string>("");
  const [selected, setSelected] = useState<string>("");
  const tasks: TaskType[] = getIn(values, "tasks");
  const { mandaysCalculator, common } = LocalizationKey;
  const { t } = useTranslation();

  const handleDragEnd = (result: DropResult) => {
    const { destination, draggableId } = result;
    if (!destination) return;

    const destinationStatus = destination.droppableId as Status;
    const draggedTask = tasks.find((task) => task.id === draggableId);
    if (draggedTask) {
      const updatedData: TaskType[] = tasks.map((task) => {
        if (task.id === draggableId) {
          return {
            ...task,
            status: destinationStatus,
          };
        }
        return task;
      });

      setValues({ ...values, tasks: updatedData });
    }
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>, status: Status): void => {
    if (status === "selected") {
      setSelected(e.target.value);
    } else {
      setNotSelected(e.target.value);
    }
  };
  return (
    <Fragment>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Grid
          container
          spacing={2}
          justifyContent={"space-between"}
        >
          {droppableList.map((droppable, index) => (
            <StyledGridItem
              $type={droppable}
              item
              xs={5.9}
              key={index}
            >
              <Droppable droppableId={droppable}>
                {(provided) => {
                  const filteredData = tasks.filter((filtered) => filtered.status === droppable);
                  return (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      <Typography
                        variant="h5"
                        color={"primary"}
                        fontWeight={"bold"}
                        display={"flex"}
                        justifyContent={"center"}
                        marginBottom={"1rem"}
                      >
                        {droppable === "selected" ? "Selected" : "Task List"}
                      </Typography>

                      <TextField
                        name={`mandays-${droppable}`}
                        value={droppable === "selected" ? selected : notSelected}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleSearch(e, droppable)}
                        margin="normal"
                      />

                      {filteredData.length !== 0 ? (
                        filteredData.map((task, index) => (
                          <Draggable
                            draggableId={task.id}
                            key={task.id}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
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
                                  subHeader={`${t(common.createdDateLabel)}: ${dateFormat(
                                    task.createdDate
                                  )}`}
                                >
                                  <Typography>
                                    {t(mandaysCalculator.taskDescriptionLabel)}:
                                  </Typography>
                                  <Typography>{task.description}</Typography>
                                </StyledCardContainer>
                              </div>
                            )}
                          </Draggable>
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
