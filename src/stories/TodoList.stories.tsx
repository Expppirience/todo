import React from 'react'
import {TodoList} from "../TodoList";
import {ComponentStory} from "@storybook/react";
import {action} from "@storybook/addon-actions";
import {ReduxStoreDecorator} from "./decorators/ReduxStoreDecorator";

export default {
   title: "todoList",
   component: TodoList,
   decorators: [ReduxStoreDecorator]
}

const Template: ComponentStory<typeof TodoList> = (args) => <TodoList {...args} />
export const DefaultCase = Template.bind({})
DefaultCase.args = {
   title: "TodoList title placeholder",
   id: '1',
   filter: "all",
   changeTodoListName: () => action('changing todoList name'),
   removeTodoList: () => action('removing todoList'),
   changeFilter: () => action('changing filter'),
}
