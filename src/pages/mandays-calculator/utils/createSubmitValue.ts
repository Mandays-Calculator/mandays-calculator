import type {
  CreateEstimationParam,
  ResourceDetails,
} from "~/api/mandays-est-tool";
import type { MandaysForm } from "../estimation-details";
import { dateFormat } from "~/utils/date";

interface Legends {
  [key: string]: {
    careerStep: string;
    manHours: number;
  }[];
}

interface ResourceParam {
  [key: number]: ResourceDetails[];
}

const mapLegends = (legends: Legends) => {
  const mappedLegends: any = {};
  for (const key in legends) {
    if (legends.hasOwnProperty(key)) {
      const careerStep = key;
      const values = legends[key];
      mappedLegends[careerStep] = values.map((value) => ({
        manHours: value.manHours || 0,
        careerStep: value.careerStep,
      }));
    }
  }
  return mappedLegends;
};

export const createSubmitValue = (
  data: MandaysForm,
  projectId: string,
  userId: string,
): CreateEstimationParam => {
  return {
    createdBy: userId,
    basicInfo: {
      ...data.summary,
      estimationName:
        data.summary.estimationName ||
        `${data.summary.teamId}(${dateFormat(
          data.summary.endDate,
          "yyyy-DD-DD",
        )}-${dateFormat(data.summary.startDate, "yyyy-DD-DD")})`,
      endDate: dateFormat(data.summary.endDate, "yyyy-DD-DD"),
      startDate: dateFormat(data.summary.startDate, "yyyy-DD-DD"),
      projectId: projectId,
    },
    resources: data.resources as unknown as ResourceParam,
    legends: mapLegends(data.legends),
    phases: data.phases.map((phase) => ({
      name: phase.name,
      resourceCountByTasks: phase.functionalities.flatMap((functionality) =>
        functionality.estimations.map((estimation) => ({
          taskId: estimation.taskId,
          complexityId: estimation.complexityId,
          resourceCountByTasks: estimation.resourceCountByTasks,
        })),
      ),
    })) as any,
  };
};
