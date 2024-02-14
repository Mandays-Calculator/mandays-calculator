import type { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { dateFormat } from "~/utils/date";
import LocalizationKey from "~/i18n/key";

import type { TaskType } from "../..";
import type { DraggableProvided } from "react-beautiful-dnd";
import { Typography } from "@mui/material";

import { StyledCardContainer } from "./styles";

interface DraggableContentProps {
  task: TaskType;
  index: number;
  provided: DraggableProvided;
}

const DraggableContent = ({
  provided,
  index,
  task,
}: DraggableContentProps): ReactElement => {
  const { t } = useTranslation();

  const { common, mandaysCalculator } = LocalizationKey;

  return (
    <div
      ref={provided.innerRef}
      {...provided.dragHandleProps}
      {...provided.draggableProps}
    >
      <StyledCardContainer
        key={index}
        headerTitle={task.name}
        subHeader={`${t(common.createdDateLabel)}: ${dateFormat(
          task.createdDate,
          "DD/MM/YYYY",
        )}`}
      >
        <Typography>{t(mandaysCalculator.taskDescriptionLabel)}</Typography>
        <Typography>{task.description}</Typography>
      </StyledCardContainer>
    </div>
  );
};

export default DraggableContent;
