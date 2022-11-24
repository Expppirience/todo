import {v1} from "uuid";

import {TodoListsType} from "../App";
import {todoListsReducer} from "./todoListsReducer";
import {ADD_TODOLIST, CHANGE_TODOLIST_TITLE, REMOVE_TODOLIST} from "./actionCreators";

test('correct todolist should be removed', () => {
    const todoListId1 = v1()
    const todoListId2 = v1()

    const initialState: TodoListsType[] = [
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'active'},
    ]
    const finalState = todoListsReducer(initialState, REMOVE_TODOLIST(todoListId1))
    expect(finalState.length).toBe(1)
    expect(finalState[0].id).toBe(todoListId2)
})


test('correct todolist should be added', () => {
    const todoListId1 = v1()
    const todoListId2 = v1()

    const title = 'New todoList'
    const initialState: TodoListsType[] = [
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'active'},
    ]
    const finalState = todoListsReducer(initialState,ADD_TODOLIST(title))
    expect(finalState.length).toBe(3)
    expect(finalState[2].title).toBe(title)
    expect(finalState[2].filter).toBe('all')
})


test('correct todolist should change its own name', () => {
    const todoListId1 = v1()
    const todoListId2 = v1()

    const title = 'New todoList'
    const initialState: TodoListsType[] = [
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'active'},
    ]

    const finalState = todoListsReducer(initialState, CHANGE_TODOLIST_TITLE(todoListId2, title))

    expect(finalState[0].title).toBe('What to learn')
    expect(finalState[1].title).toBe(title)
})