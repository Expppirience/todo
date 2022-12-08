import { v1 } from "uuid";

import { todoListsReducer } from "./todoListsReducer";
import {
  ADD_TODOLIST,
  CHANGE_TODOLIST_TITLE,
  REMOVE_TODOLIST,
} from "./actionCreators";
import { ITodoListDomain } from "../models/models";

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
    },
    {
      id: todoListId2,
      title: "second",
      addedDate: "",
      order: 1,
      filter: "all",
    },
  ];
  const finalState = todoListsReducer(
    initialState,
    REMOVE_TODOLIST(todoListId1)
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
    },
    {
      id: todoListId2,
      title: "second",
      addedDate: "",
      order: 1,
      filter: "all",
    },
  ];
  const finalState = todoListsReducer(initialState, ADD_TODOLIST(title));
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
    },
    {
      id: todoListId2,
      title: "second",
      addedDate: "",
      order: 1,
      filter: "all",
    },
  ];

  const finalState = todoListsReducer(
    initialState,
    CHANGE_TODOLIST_TITLE(todoListId2, title)
  );

  expect(finalState[0].title).toBe("first");
  expect(finalState[1].title).toBe(title);
});
