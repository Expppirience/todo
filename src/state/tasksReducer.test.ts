import {AllTasksType} from "../App";
import {tasksReducer} from "./tasksReducer";
import {ADD_TASK, CHANGE_TASK_STATUS, CHANGE_TASK_TITLE, REMOVE_TASK, REMOVE_TODOLIST} from "./actionCreators";


const initialState: AllTasksType = {
    'first': [
        {id: '1', title: "HTML&CSS", isDone: false},
        {id: '2', title: "JS", isDone: false},
        {id: '3', title: "ReactJS", isDone: false},
    ],
    'second': [
        {id: '1', title: "Grooming", isDone: false},
        {id: '2', title: "Pet shop", isDone: false},
        {id: '3', title: "Nails", isDone: false},
    ]
}


test('correct task should be deleted from correct array', () => {
    const finalState = tasksReducer(initialState, REMOVE_TASK('second', '2'))
    expect(finalState['second'].length).toBe(2)
    expect(finalState['first'].length).toBe(3)
    expect(finalState['second'].every(t => t.id !== '2')).toBeTruthy()
})


test('task should be added to correct todoList', () => {
    const taskName = 'new task name'
    const finalState = tasksReducer(initialState, ADD_TASK('second', taskName))

    expect(finalState['second'].length).toBe(4)
    expect(finalState['second'][0].id).toBeDefined()
    expect(finalState['second'][0].title).toBe(taskName)
    expect(finalState['second'][0].isDone).toBe(false)
    expect(finalState['first'].length).toBe(3)

})

test("specified task should change it's status", () => {
        const finalState =
            tasksReducer(initialState, CHANGE_TASK_STATUS('second', '2'))
        expect(finalState['second'][1].isDone).toBe(true)
    }
)

test("specified task should change it's title", () => {
    const newTitle = 'new title for task'
    const finalState = tasksReducer(initialState, CHANGE_TASK_TITLE('second', '2', newTitle))
    expect(finalState['second'][1].title).toBe(newTitle)
    expect(finalState['second'][0].title).toBe('Grooming')
})

test('property with todoListId should be deleted', () => {
    const finalState = tasksReducer(initialState, REMOVE_TODOLIST('second'))
    expect(Object.keys(finalState).length).toBe(1)
    expect(finalState['second']).toBeUndefined()
})