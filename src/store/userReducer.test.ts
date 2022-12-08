import {userReducer} from "./userReducer";


test('user reducer should increment age', () => {
        const initialState = {age: 20, childrenCount: 26, name: 'Dimych'}
        const finalState = userReducer(initialState, {type: 'INCREMENT_AGE', data: {}})

        expect(finalState.age).toBe(21)
        expect(finalState.childrenCount).toBe(26)
    }
)

test('user reducer should increment childrenCount', () => {
    const initialState = {age: 20, childrenCount: 2, name: 'Dimych'}
    const finalState = userReducer(initialState, {type: 'INCREMENT_CHILDREN_COUNT', data: {}})

    expect(finalState.childrenCount).toBe(3)
    expect(finalState.age).toBe(20)
})


test('user reducer should change the name of user', () => {
    const initialState = {name: 'Dimych', age: 20, childrenCount: 2}
    const name = 'Viktor'
    const finalState = userReducer(initialState, {type: 'CHANGE_NAME', data: {name}})

    expect(finalState.name).toBe(name)
})