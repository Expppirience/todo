import { HashRouter } from "react-router-dom";

export const RouterDecorator = (story: any) => {
  return <HashRouter>{story()}</HashRouter>;
};
