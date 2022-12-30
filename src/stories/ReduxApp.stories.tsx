import App from "../App";
import React from "react";
import { ReduxStoreDecorator } from "./decorators/ReduxStoreDecorator";
import { RouterDecorator } from "./decorators/RouterDecorator";

export default {
  title: "App with redux",
  component: App,
  decorators: [ReduxStoreDecorator, RouterDecorator],
};

export const DefaultCase = () => <App demo={true} />;
