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

export const estimationDetailsData = [
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
];

export const mockData = {
  summary: {
    estimationName: "Test",
    teamId: "69eb6717-bbf2-11ee-a0aa-00090faa0001",
    utilizationRate: 85,
    startDate: "2024-02-01T00:00:00.000Z",
    endDate: "2024-12-01T00:00:00.000Z",
  },
  resources: {
    I03: [
      {
        odcId: "5d5b997d-bbf3-11ee-a0aa-00090faa0001",
        numberOfResources: 8,
        annualLeaves: 6,
      },
    ],
    I04: [],
    I05: [],
    I06: [],
    I07: [],
  },
  legends: {
    "bf327d58-22e8-486b-ac22-c2c1c2f8a1e8": [
      {
        careerStep: "I03",
      },
      {
        careerStep: "I04",
        manHours: 0,
      },
      {
        careerStep: "I05",
        manHours: 0,
      },
      {
        careerStep: "I06",
        manHours: 0,
      },
      {
        careerStep: "I07",
        manHours: 0,
      },
    ],
    "cd373cd1-f29f-4923-aa0f-41b785411e95": [
      {
        careerStep: "I03",
        manHours: 8,
      },
      {
        careerStep: "I04",
        manHours: 8,
      },
      {
        careerStep: "I05",
        manHours: 8,
      },
      {
        careerStep: "I06",
        manHours: 0,
      },
      {
        careerStep: "I07",
        manHours: 0,
      },
    ],
    "dd4515e4-c10e-4f5d-8708-254d1fec61fc": [
      {
        careerStep: "I03",
        manHours: 8,
      },
      {
        careerStep: "I04",
        manHours: 8,
      },
      {
        careerStep: "I05",
        manHours: 8,
      },
      {
        careerStep: "I06",
        manHours: 0,
      },
      {
        careerStep: "I07",
        manHours: 0,
      },
    ],
    "e5ff6a24-8a74-4831-a7cc-61fa8e728778": [
      {
        careerStep: "I03",
        manHours: 8,
      },
      {
        careerStep: "I04",
        manHours: 8,
      },
      {
        careerStep: "I05",
        manHours: 8,
      },
      {
        careerStep: "I06",
        manHours: 0,
      },
      {
        careerStep: "I07",
        manHours: 0,
      },
    ],
  },
  tasks: [
    {
      id: "184a2a64-bb33-11ee-beb0-a0291936d1c2",
      name: "Landing Page for Data Modification",
      description: "Create a user landing page for admin data change",
      status: "Backlog",
      functionality: {
        id: "a2877a73-bb2c-11ee-beb0-a0291936d1c2",
        name: "Registration",
      },
      tags: [
        {
          id: "184b701b-bb33-11ee-beb0-a0291936d1c2",
          name: "Test 3",
        },
      ],
      mandaysEstimation: null,
      complexity: {
        id: "dd4515e4-c10e-4f5d-8708-254d1fec61fc",
        name: "Medium",
        minFeatures: "21",
        maxFeatures: "50",
        minHours: "25.0",
        maxHours: "120.0",
        description: "Sample",
        sample: "Sample",
        active: true,
      },
      completionDate: null,
      createdDate: "2024-01-25T11:37:42+08:00",
      dndStatus: "selected",
    },
    {
      id: "46503cd5-bb33-11ee-beb0-a0291936d1c2",
      name: "Devops configuration",
      description: "Automation for deployment process",
      status: "Backlog",
      functionality: {
        id: "a2877a73-bb2c-11ee-beb0-a0291936d1c2",
        name: "Registration",
      },
      tags: [
        {
          id: "46512b17-bb33-11ee-beb0-a0291936d1c2",
          name: "Test 4",
        },
      ],
      mandaysEstimation: null,
      complexity: {
        id: "cd373cd1-f29f-4923-aa0f-41b785411e95",
        name: "Complex",
        minFeatures: "151",
        maxFeatures: null,
        minHours: "481.0",
        maxHours: null,
        description: "Sample",
        sample: "Sample",
        active: true,
      },
      completionDate: null,
      createdDate: "2024-01-25T11:38:59+08:00",
      dndStatus: "selected",
    },
    {
      id: "29095cd6-c644-11ee-9e33-00090faa0001",
      name: "Sign In screen",
      description: "Create screen for sign in page",
      status: "Backlog",
      functionality: {
        id: "a288687d-bb2c-11ee-beb0-a0291936d1c2",
        name: "ERVC Transfer",
      },
      tags: null,
      mandaysEstimation: null,
      complexity: {
        id: "cd373cd1-f29f-4923-aa0f-41b785411e95",
        name: "Complex",
        minFeatures: "151",
        maxFeatures: null,
        minHours: "481.0",
        maxHours: null,
        description: "Sample",
        sample: "Sample",
        active: true,
      },
      completionDate: null,
      createdDate: "2024-02-08T13:37:34+08:00",
      dndStatus: "selected",
    },
  ],
  phases: [
    {
      name: "Timebox 1",
      functionalities: [
        {
          id: "a2877a73-bb2c-11ee-beb0-a0291936d1c2",
          name: "Registration",
          estimations: [
            {
              taskId: "184a2a64-bb33-11ee-beb0-a0291936d1c2",
              task: "Landing Page for Data Modification",
              complexityId: "dd4515e4-c10e-4f5d-8708-254d1fec61fc",
              complexity: "Medium",
              resourceCountByTasks: {
                I03: 3,
                I04: 4,
                I05: 1,
              },
            },
            {
              taskId: "46503cd5-bb33-11ee-beb0-a0291936d1c2",
              task: "Devops configuration",
              complexityId: "cd373cd1-f29f-4923-aa0f-41b785411e95",
              complexity: "Complex",
              resourceCountByTasks: {
                I03: 2,
              },
            },
          ],
        },
        {
          id: "a288687d-bb2c-11ee-beb0-a0291936d1c2",
          name: "ERVC Transfer",
          estimations: [
            {
              taskId: "29095cd6-c644-11ee-9e33-00090faa0001",
              task: "Sign In screen",
              complexityId: "cd373cd1-f29f-4923-aa0f-41b785411e95",
              complexity: "Complex",
              resourceCountByTasks: {
                I03: 3,
              },
            },
          ],
        },
      ],
    },
  ],
};

export const resourcesDetailData = [
  {
    odc: "PH",
    resourceCount: "5",
    annualLeaves: "3",
  },
  {
    odc: "HK",
    resourceCount: "2",
    annualLeaves: "6",
  },
];

export const tasksData = [
  {
    id: "1",
    title: "Task title 1",
    description:
      " Lorem ipsum dolor sit amet, consectuer adiciping elit. Aenan commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
  },
  {
    id: "2",
    title: "Task title 2",
    description:
      " Lorem ipsum dolor sit amet, consectuer adiciping elit. Aenan commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
  },
  {
    id: "3",
    title: "Task title 3 ",
    description:
      " Lorem ipsum dolor sit amet, consectuer adiciping elit. Aenan commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
  },
  {
    id: "3",
    title: "Task title 4",
    description:
      " Lorem ipsum dolor sit amet, consectuer adiciping elit. Aenan commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
  },
  {
    id: "4",
    title: "Task title 5",
    description:
      " Lorem ipsum dolor sit amet, consectuer adiciping elit. Aenan commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
  },
];
