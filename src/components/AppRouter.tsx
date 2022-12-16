import { Route, Routes } from "react-router-dom";

import { Login } from "./../Pages/Login/Login";
import React from "react";
import { TodoListsPage } from "../Pages/TodoLists/TodoListsPage";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path={"/login"} element={<Login />} />
      <Route path={"/"} element={<TodoListsPage />} />
      <Route path={"/*"} element={<div>404</div>} />
    </Routes>
  );
};
