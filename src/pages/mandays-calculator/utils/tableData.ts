export const mandaysCalculatorData = {
  columns: [
    {
      Header: "Sprint Name",
      accessor: "sprintName",
    },
    {
      Header: "Team",
      accessor: "team",
    },
    {
      Header: "Started Date",
      accessor: "startedDate",
    },
    {
      Header: "Status",
      accessor: "status",
      disableSortBy: true,
    },
  ],
  data: [
    {
      sprintName: "Sprint 1",
      team: "Enrolment",
      startedDate: "30/01/2023",
      status: "On going",
    },
    {
      sprintName: "Sprint 2",
      team: "Registration",
      startedDate: "01/12/2023",
      status: "Not yet started",
    },
  ],
};

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
