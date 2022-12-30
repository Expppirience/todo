import { TaskPriorities, TaskStatuses } from "../../../API/todoListsAPI";
import { TasksAC, tasksReducer } from "./tasksReducer";
import { addTaskTC, getTasksTC, removeTaskTC } from "../../thunks/taskThunks";

import { ITaskDomain } from "../../../models/models";
import { ITasksState } from "./types";
import { updateTaskTC } from "./../../thunks/taskThunks";

const initialState: ITasksState = {
  first: [
    {
      id: "1",
      title: "HTML&CSS",
      priority: TaskPriorities.hi,
      order: 0,
      startDate: "",
      addedDate: "",
      todoListId: "first",
      description: "",
      status: TaskStatuses.inProgress,
      deadline: "",
    },
    {
      id: "2",
      title: "JS",
      priority: TaskPriorities.hi,
      order: 0,
      startDate: "",
      addedDate: "",
      todoListId: "first",
      description: "",
      status: TaskStatuses.inProgress,
      deadline: "",
    },
    {
      id: "3",
      title: "React JS",
      priority: TaskPriorities.hi,
      order: 0,
      startDate: "",
      addedDate: "",
      todoListId: "first",
      description: "",
      status: TaskStatuses.inProgress,
      deadline: "",
    },
  ],
  second: [
    {
      id: "1",
      title: "What to buy",
      priority: TaskPriorities.hi,
      order: 0,
      startDate: "",
      addedDate: "",
      todoListId: "first",
      description: "",
      status: TaskStatuses.inProgress,
      deadline: "",
    },
    {
      id: "2",
      title: "What to do",
      priority: TaskPriorities.hi,
      order: 0,
      startDate: "",
      addedDate: "",
      todoListId: "first",
      description: "",
      status: TaskStatuses.inProgress,
      deadline: "",
    },
    {
      id: "3",
      title: "What to think",
      priority: TaskPriorities.hi,
      order: 0,
      startDate: "",
      addedDate: "",
      todoListId: "first",
      description: "",
      status: TaskStatuses.inProgress,
      deadline: "",
    },
  ],
};

test("correct task should be deleted from correct array", () => {
  const removeConfig = { todoListID: "second", taskID: "2" };
  const finalState = tasksReducer(
    initialState,
    removeTaskTC.fulfilled(removeConfig, "requestID", removeConfig)
  );
  expect(finalState["second"].length).toBe(2);
  expect(finalState["first"].length).toBe(3);
  expect(finalState["second"].every((t) => t.id !== "2")).toBeTruthy();
});

test("task should be added to correct todoList", () => {
  const taskName = "new task name";
  const newTask: ITaskDomain = {
    id: "99",
    title: taskName,
    status: TaskStatuses.inProgress,
    addedDate: "",
    order: 0,
    deadline: "",
    todoListId: "second",
    description: "",
    priority: TaskPriorities.later,
    startDate: "",
  };
  const finalState = tasksReducer(
    initialState,
    addTaskTC.fulfilled({ task: newTask }, "requestId", {
      todoListID: newTask.todoListId,
      title: taskName,
    })
  );

  expect(finalState["second"].length).toBe(4);
  expect(finalState["second"][0].id).toBeDefined();
  expect(finalState["second"][0].title).toBe(taskName);
  expect(finalState["second"][0].status).toBe(TaskStatuses.inProgress);
  expect(finalState["first"].length).toBe(3);
});

test("specified task should change it's status", () => {
  const updateTaskData = {
    todoListID: "second",
    taskID: "2",
    model: { status: TaskStatuses.completed },
  };
  const finalState = tasksReducer(
    initialState,
    updateTaskTC.fulfilled(updateTaskData, "requestID", updateTaskData)
  );
  expect(finalState["second"][1].status).toBe(TaskStatuses.completed);
});

test("specified task should change it's title", () => {
  const newTitle = "new title for task";
  const updateTaskData = {
    todoListID: "second",
    taskID: "2",
    model: { title: newTitle },
  };
  const finalState = tasksReducer(
    initialState,
    updateTaskTC.fulfilled(updateTaskData, "requestID", updateTaskData)
  );
  expect(finalState["second"][1].title).toBe(newTitle);
  expect(finalState["second"][0].title).toBe(initialState["second"][0].title);
});

// test("property with todoListId should be deleted", () => {
//   const finalState = tasksReducer(
//     initialState,
//     TodoListsAC.removeTodoList("second")
//   );
//   expect(Object.keys(finalState).length).toBe(1);
//   expect(finalState["second"]).toBeUndefined();
// });

test("task should be added for specified todolist", () => {
  const tasks = [
    {
      id: "4",
      title: "What to think",
      priority: TaskPriorities.hi,
      order: 0,
      startDate: "",
      addedDate: "",
      todoListId: "first",
      description: "",
      status: TaskStatuses.inProgress,
      deadline: "",
    },
  ];
  const finalState = tasksReducer(
    initialState,
    getTasksTC.fulfilled({ todoListID: "first", tasks }, "requestID", "first")
  );
  expect(finalState["first"].length).toBe(1);
});
