import App from "../App";
import React from "react";
import { ReduxStoreDecorator } from "./decorators/ReduxStoreDecorator";

export default {
  title: "App with redux",
  component: App,
  decorators: [ReduxStoreDecorator],
};

export const DefaultCase = () => <App demo={true} />;
