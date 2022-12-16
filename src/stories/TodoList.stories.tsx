import { ComponentStory } from "@storybook/react";
import React from "react";
import { ReduxStoreDecorator } from "./decorators/ReduxStoreDecorator";
import { TodoList } from "../components/TodoList/TodoList";
import { action } from "@storybook/addon-actions";

export default {
  title: "todoList",
  component: TodoList,
  decorators: [ReduxStoreDecorator],
};

const Template: ComponentStory<typeof TodoList> = (args) => (
  <TodoList {...args} />
);
export const DefaultCase = Template.bind({});
DefaultCase.args = {
  todolist: {
    title: "title placeholder",
    id: "1",
    filter: "all",
    entityStatus: "idle",
    order: 0,
    addedDate: "",
  },
  changeTodoListName: () => action("changing todoList name"),
  removeTodoList: () => action("removing todoList"),
  changeFilter: () => action("changing filter"),
};
