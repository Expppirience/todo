import React from 'react'
import AppWithRedux from "../AppWithRedux";
import {ReduxStoreDecorator} from "./decorators/ReduxStoreDecorator";


export default {
   title: "App with redux",
   component: AppWithRedux,
   decorators: [ReduxStoreDecorator]
}

export const DefaultCase = () =>
      <AppWithRedux/>
