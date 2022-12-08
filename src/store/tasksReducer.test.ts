import { tasksReducer } from "./tasksReducer";
import {
  ADD_TASK,
  CHANGE_TASK_STATUS,
  CHANGE_TASK_TITLE,
  REMOVE_TASK,
  REMOVE_TODOLIST,
} from "./actionCreators";
import { TaskPriorities, TaskStatuses } from "../API/todoListsAPI";
import { AllTasksType } from "../AppWithRedux";
import { ITaskDomain } from "../models/models";

const initialState: AllTasksType = {
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
  const finalState = tasksReducer(initialState, REMOVE_TASK("second", "2"));
  expect(finalState["second"].length).toBe(2);
  expect(finalState["first"].length).toBe(3);
  expect(finalState["second"].every((t) => t.id !== "2")).toBeTruthy();
});

test("task should be added to correct todoList", () => {
  const taskName = "new task name";
  const newTask: ITaskDomain = {
    id: "99",
    title: taskName,
    status: TaskStatuses.new,
    addedDate: "",
    order: 0,
    deadline: "",
    todoListId: "second",
    description: "",
    priority: TaskPriorities.later,
    startDate: "",
  };
  const finalState = tasksReducer(initialState, ADD_TASK(newTask));

  expect(finalState["second"].length).toBe(4);
  expect(finalState["second"][0].id).toBeDefined();
  expect(finalState["second"][0].title).toBe(taskName);
  expect(finalState["second"][0].status).toBe(TaskStatuses.new);
  expect(finalState["first"].length).toBe(3);
});

test("specified task should change it's status", () => {
  const finalState = tasksReducer(
    initialState,
    CHANGE_TASK_STATUS("second", "2", TaskStatuses.completed)
  );
  expect(finalState["second"][1].status).toBe(TaskStatuses.completed);
});

test("specified task should change it's title", () => {
  const newTitle = "new title for task";
  const finalState = tasksReducer(
    initialState,
    CHANGE_TASK_TITLE("second", "2", newTitle)
  );
  expect(finalState["second"][1].title).toBe(newTitle);
  expect(finalState["second"][0].title).toBe("Grooming");
});

test("property with todoListId should be deleted", () => {
  const finalState = tasksReducer(initialState, REMOVE_TODOLIST("second"));
  expect(Object.keys(finalState).length).toBe(1);
  expect(finalState["second"]).toBeUndefined();
});