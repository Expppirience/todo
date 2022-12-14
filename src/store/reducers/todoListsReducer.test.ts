import {
  addTodolistAC,
  changeTodolistTitleAC,
  removeTodolistAC,
} from "../actionCreators";

import { ITodoListDomain } from "../../models/models";
import { todoListsReducer } from "./todoListsReducer";
import { v1 } from "uuid";

test("correct todolist should be removed", () => {
  const todoListId1 = v1();
  const todoListId2 = v1();

  const initialState: ITodoListDomain[] = [
    {
      id: todoListId1,
      title: "first",
      addedDate: "",
      order: 0,
      filter: "all",
      entityStatus: "idle",
    },
    {
      id: todoListId2,
      title: "second",
      addedDate: "",
      order: 1,
      filter: "all",
      entityStatus: "idle",
    },
  ];
  const finalState = todoListsReducer(
    initialState,
    removeTodolistAC(todoListId1)
  );
  expect(finalState.length).toBe(1);
  expect(finalState[0].id).toBe(todoListId2);
});

test("correct todolist should be added", () => {
  const todoListId1 = v1();
  const todoListId2 = v1();

  const title = "New todoList";
  const initialState: ITodoListDomain[] = [
    {
      id: todoListId1,
      title: "first",
      addedDate: "",
      order: 0,
      filter: "all",
      entityStatus: "idle",
    },
    {
      id: todoListId2,
      title: "second",
      addedDate: "",
      order: 1,
      filter: "all",
      entityStatus: "idle",
    },
  ];
  const newTodolist = {
    id: "99",
    title: title,
    addedDate: "",
    order: 1,
    filter: "all",
  };
  const finalState = todoListsReducer(initialState, addTodolistAC(newTodolist));
  expect(finalState.length).toBe(3);
  expect(finalState[0].title).toBe(title);
  expect(finalState[0].filter).toBe("all");
});

test("correct todolist should change its own name", () => {
  const todoListId1 = v1();
  const todoListId2 = v1();

  const title = "New todoList";
  const initialState: ITodoListDomain[] = [
    {
      id: todoListId1,
      title: "first",
      addedDate: "",
      order: 0,
      filter: "all",
      entityStatus: "idle",
    },
    {
      id: todoListId2,
      title: "second",
      addedDate: "",
      order: 1,
      filter: "all",
      entityStatus: "idle",
    },
  ];

  const finalState = todoListsReducer(
    initialState,
    changeTodolistTitleAC(todoListId2, title)
  );

  expect(finalState[0].title).toBe("first");
  expect(finalState[1].title).toBe(title);
});
