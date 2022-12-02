import {ComponentStory} from "@storybook/react";
import AppWithRedux from "../../AppWithRedux";
import {Provider} from "react-redux";
import {AppStateType} from "../../state/store";
import {combineReducers, createStore} from "redux";
import {todoListsReducer} from "../../state/todoListsReducer";
import {tasksReducer} from "../../state/tasksReducer";
import {v1} from "uuid";



const rootReducer = combineReducers({
   tasks: tasksReducer,
   todoLists: todoListsReducer
})

const initialGlobalState = {
   todoLists: [
      {id: '1', title: "placeholder 1", filter: 'all'},
      {id: '2', title: "placeholder 2", filter: 'all'},
   ],
   tasks: {
      ['1']: [
         {id: v1(), title: 'placeholder', isDone: true},
         {id: v1(), title: 'placeholder', isDone: false},
         {id: v1(), title: 'placeholder', isDone: true},
      ],
      ['2']: [
         {id: v1(), title: 'placeholder', isDone: true},
         {id: v1(), title: 'placeholder', isDone: false},
         {id: v1(), title: 'placeholder', isDone: true},
      ]
   }
}
const storyBookStore = createStore(rootReducer, initialGlobalState as AppStateType)

type StoryType = ComponentStory<typeof AppWithRedux>
export const ReduxStoreDecorator = (story: any) => {
   return <Provider store={storyBookStore}>
      {story()}
   </Provider>
}