import { TodoListsAC, todoListsReducer } from "./todoListsReducer";

import { ITodoListDomain } from "../../../models/models";
import { v1 } from "uuid";

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

test("correct todolist should be removed", () => {
  const finalState = todoListsReducer(
    initialState,
    TodoListsAC.removeTodoList({ todoListID: todoListId1 })
  );
  expect(finalState.length).toBe(1);
  expect(finalState[0].id).toBe(todoListId2);
});

test("correct todolist should be added", () => {
  const title = "New todoList";
  const newTodolist = {
    id: "99",
    title: title,
    addedDate: "",
    order: 1,
    filter: "all",
  };
  const finalState = todoListsReducer(
    initialState,
    TodoListsAC.addTodoList({ todoList: newTodolist })
  );
  expect(finalState.length).toBe(3);
  expect(finalState[0].title).toBe(title);
  expect(finalState[0].filter).toBe("all");
});

test("correct todolist should change its own name", () => {
  const title = "New todoList";

  const finalState = todoListsReducer(
    initialState,
    TodoListsAC.changeTodoListTitle({ todoListID: todoListId2, title })
  );

  expect(finalState[0].title).toBe("first");
  expect(finalState[1].title).toBe(title);
});

test("entity status of todolist should be changed", () => {
  const status = "loading";

  const finalState = todoListsReducer(
    initialState,
    TodoListsAC.setTodoListStatus({ todoListID: todoListId2, status })
  );

  expect(finalState[0].entityStatus).toBe("idle");
  expect(finalState[1].entityStatus).toBe(status);
});
