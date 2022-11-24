// Types
interface StateType {
    age: number,
    childrenCount: number,
    name: string;
}

interface ActionDataType {
    [key: string]: any
}

interface ActionType {
    type: string,
    data: ActionDataType
}

// ==============================================================


// Reducer
export const userReducer = (state: StateType, action: ActionType): StateType => {
    switch (action.type) {
        case 'INCREMENT_AGE':
            state.age = state.age + 1
            break;
        case 'INCREMENT_CHILDREN_COUNT':
            state.childrenCount = state.childrenCount + 1
            break;
        case 'CHANGE_NAME':
            state.name = action.data.name
            break;
        default:
            return state
    }
    return {...state}
}