const data = {
  task: [
    {
      id: "task-1",
      title: "title",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
      status: 1,
      date: new Date(),
    },
    {
      id: "task-2",
      title: "title",
      description:
        "2Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
      status: 1,
      date: new Date(),
    },
    {
      id: "task-3",
      title: "title",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
      status: 1,
      date: new Date(),
    },
    {
      id: "task-4",
      title: "title",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam ",
      status: 3,
      date: new Date(),
    },
    {
      id: "task-5",
      title: "title",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
      status: 3,
      date: new Date(),
    },
    {
      id: "task-6",
      title: "title",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
      status: 3,
      date: new Date(),
    },
    {
      id: "task-7",
      title: "title",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
      status: 2,
      date: new Date(),
    },
    {
      id: "task-8",
      title: "title",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
      status: 4,
      date: new Date(),
    },
    {
      id: "task-9",
      title: "title",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
      status: 4,
      date: new Date(),
    },
  ],
  columns: {
    "column-1": {
      id: "column-1",
      status: 1,
      title: "NEW",
      taskIds: ["task-1", "task-2", "task-3"],
    },
    "column-2": {
      id: "column-2",
      status: 2,
      title: "INPROGRESS",
      taskIds: ["task-7"],
    },
    "column-3": {
      id: "column-3",
      status: 3,
      title: "DONE",
      taskIds: ["task-4", "task-5", "task-6"],
    },

    "column-4": {
      id: "column-4",
      status: 4,
      title: "ACTCHIVE",
      taskIds: ["task-8", "task-9"],
    },
  },

  columnOrder: ["column-1", "column-2", "column-3"],
};

export default data;
