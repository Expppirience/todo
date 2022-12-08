import React, { useEffect, useState } from "react";
import { todoListsAPI } from "../API/todoListsAPI";

export default {
  title: "TodoLists API",
};

export const GetTodoLists = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    todoListsAPI.getTodoLists().then((response) => {
      console.log("IN GET settings store", response);
      setState(response.data);
    });
  }, []);

  return <div>Current state: {JSON.stringify(state)}</div>;
};

export const CreateTodoList = () => {
  const [state, setState] = useState<any>(null);

  useEffect(() => {
    const payload = { title: "title placeholder" };
    todoListsAPI.createTodoList(payload).then((response) => {
      console.log("IN POST settings store", response);
      setState(response.data);
    });
  }, []);

  return <div>Current state: {JSON.stringify(state)}</div>;
};

export const DeleteTodoList = () => {
  const [state, setState] = useState<any>(null);
  const todoListID = "77e060b6-b0aa-4374-b65c-0e1e9c09dc78";
  useEffect(() => {
    todoListsAPI.deleteTodoList(todoListID).then((response) => {
      console.log("IN DELETE settings store", response);
      setState(response.data);
    });
  }, []);
  return <div>Current state: {JSON.stringify(state)}</div>;
};

export const UpdateTodoList = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    const payload = { title: "AGKJHGWHJKNWGABKJNLWGAKJLNB" };
    todoListsAPI.updateTodoList("FWAFAWFAWFAW", payload).then((response) => {
      console.log("IN PUT settings store", response);
      setState(response.data);
    });
  }, []);

  return <div>Current state: {JSON.stringify(state)}</div>;
};

export const GetTasks = () => {
  const [state, setState] = useState<any>(null);
  const [todoListId, setTodoListId] = useState("");

  const getTasksFromTodoList = () => {
    todoListsAPI.getTasks(todoListId).then(({ data }) => {
      setState(data.items);
    });
  };

  return (
    <div>
      <input
        value={todoListId}
        onChange={(e) => setTodoListId(e.currentTarget.value)}
      />
      <button onClick={getTasksFromTodoList}>Get tasks</button>
      <div>Current State: {JSON.stringify(state)}</div>
    </div>
  );
};

export const DeleteTask = () => {
  const [state, setState] = useState<any>(null);
  const todoListID = "2b467c96-aaee-4153-9615-ddea08321b87";
  const taskID = "2b467c96-aaee-4153-9615-ddea08321b87";

  useEffect(() => {
    todoListsAPI.deleteTask(todoListID, taskID).then(({ data }) => {
      console.log("IN DELETE TASKS", data);
      setState(data);
    });
  }, []);
  return <div>Current State: {JSON.stringify(state)}</div>;
};

export const CreateTask = () => {
  const [state, setState] = useState<any>(null);
  const [taskTitle, setTaskTitle] = useState("");
  const [todoListId, setTodoListId] = useState("");
  const todoListID = "abfdf18d-07c6-4139-9e3e-a2224eaade88";

  const createTask = () => {
    const payload = { title: taskTitle };
    todoListsAPI.createTask(todoListId, payload).then(({ data }) => {
      setState(data);
    });
  };

  return (
    <div>
      <input
        placeholder={"todolistId"}
        value={todoListId}
        onChange={(e) => setTodoListId(e.currentTarget.value)}
      />
      <input
        placeholder={"todolistId"}
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.currentTarget.value)}
      />
      <button onClick={createTask}>Create task</button>
    </div>
  );
};

export const UpdateTask = () => {
  const [state, setState] = useState<any>(null);
  const [taskDesc, setTaskDesc] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [status, setStatus] = useState(0);
  const [todoListId, setTodoListId] = useState("");
  const [taskId, setTaskId] = useState("");
  const [priority, setPriority] = useState(0);
  const [deadline, setDeadline] = useState("");
  const [startDate, setStartDate] = useState("");
  const todoListID = "abfdf18d-07c6-4139-9e3e-a2224eaade88";
  const taskID = "abfdf18d-07c6-4139-9e3e-a2224eaade88";

  const createTask = () => {
    const payload = {
      deadline: null,
      description: taskDesc,
      priority,
      startDate: null,
      status,
      title: taskTitle,
    };
    todoListsAPI.updateTask(todoListId, taskId, payload).then(({ data }) => {
      console.log("IN UPDATE TASKS", data);
      setState(data);
    });
  };

  return (
    <div>
      <input
        placeholder={"todolistId"}
        value={todoListId}
        onChange={(e) => setTodoListId(e.currentTarget.value)}
      />
      <input
        placeholder={"Task title"}
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.currentTarget.value)}
      />
      <input
        placeholder={"Task desc"}
        value={taskDesc}
        onChange={(e) => setTaskDesc(e.currentTarget.value)}
      />
      <input
        placeholder={"Task desc"}
        value={priority}
        onChange={(e) => setPriority(+e.currentTarget.value)}
      />
      <input
        placeholder={"Task title"}
        value={status}
        onChange={(e) => setStatus(+e.currentTarget.value)}
      />
      <input
        placeholder={"Task id"}
        value={taskId}
        onChange={(e) => setTaskId(e.currentTarget.value)}
      />
      <button onClick={createTask}></button>
      <div>Current State: {JSON.stringify(state)}</div>
    </div>
  );
};
