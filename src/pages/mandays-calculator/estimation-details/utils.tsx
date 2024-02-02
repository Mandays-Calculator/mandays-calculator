import { MandaysForm } from ".";

export const initMandays: MandaysForm = {
  summary: {
    estimationName: "",
    teamId: "",
    utilizationRate: 0,
    startDate: "",
    endDate: "",
  },
  resource: [],
  legend: [
    {
      complexity: "Simple",
      i03: "5",
      i04: "2",
      i05: "1",
      i06: "1",
      i07: "1",
    },
    {
      complexity: "Medium",
      i03: "2",
      i04: "2",
      i05: "1",
      i06: "1",
      i07: "1",
    },
    {
      complexity: "Complex",
      i03: "3",
      i04: "2",
      i05: "1",
      i06: "1",
      i07: "1",
    },
  ],
  tasks: [],
};
