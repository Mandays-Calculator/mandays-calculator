export const mandaysCalculatorData = [
  {
    id: "sprint1",
    sprintName: "Sprint 1",
    team: "Enrolment",
    startedDate: "30/01/2023",
    status: "On going",
  },
  {
    id: "sprint2",
    sprintName: "Sprint 2",
    team: "Registration",
    startedDate: "01/12/2023",
    status: "Not yet started",
  },
];

export const estimationDetailsData = {
  columns: [
    {
      Header: "Functionality",
      accessor: "functionality",
    },
    {
      Header: "Total Man Hours",
      accessor: "totalManHours",
    },
    {
      Header: "Total Man Days",
      accessor: "totalManDays",
    },
  ],
  data: [
    {
      functionality: "(PMO)",
      totalManHours: "40",
      totalManDays: "40",
    },
    {
      functionality: "(PMO)",
      totalManHours: "39",
      totalManDays: "41",
    },
  ],
};
