import { ComponentMeta, ComponentStory } from "@storybook/react";

import { AddItemForm } from "../components/AddItemForm/AddItemForm";
import React from "react";
import { action } from "@storybook/addon-actions";

export default {
  title: "AddItemForm",
  component: AddItemForm,
} as ComponentMeta<typeof AddItemForm>;

export const DefaultCase: ComponentStory<typeof AddItemForm> = (props: any) => {
  return (
    <div>
      <AddItemForm addItemCallback={(title: string) => action(title)()} />
    </div>
  );
};

export const DisabledCase: ComponentStory<typeof AddItemForm> = (
  props: any
) => {
  return (
    <div>
      <AddItemForm
        disabled={true}
        addItemCallback={(title: string) => action(title)()}
      />
    </div>
  );
};
