import React from 'react'
import {AddItemForm} from "../AddItemForm";
import {action} from "@storybook/addon-actions";
import {ComponentMeta, ComponentStory} from "@storybook/react";

export default {
   title: "AddItemForm",
   component: AddItemForm
} as ComponentMeta<typeof AddItemForm>

export const DefaultCase: ComponentStory<typeof AddItemForm> = (props: any) => {
   return (
      <div>
         <AddItemForm addItemCallback={(title: string) => action(title)()}/>
      </div>
   )
}
