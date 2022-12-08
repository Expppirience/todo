import React from "react";
import { EditableElement } from "../components/EditableElement/EditableElement";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { action } from "@storybook/addon-actions";

export default {
  title: "Span that turns into an input",
  component: EditableElement,
} as ComponentMeta<typeof EditableElement>;

const Template: ComponentStory<typeof EditableElement> = (args) => (
  <EditableElement {...args} />
);

const onChangeHandler = action("Input value has been changed");
export const DefaultCase = Template.bind({});
DefaultCase.args = {
  title: "Title placeholder",
  onChange: onChangeHandler,
};

// export const DefaultCase: ComponentStory<typeof EditableElement> = () => {
//       <EditableElement title={'title placeholder'} onChange={onChangeHandler}/>
//    )
//
// }
