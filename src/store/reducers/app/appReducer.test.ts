import { AppAC } from "./actionCreators";
import { IAppState } from "./types";
import { appReducer } from "./appReducer";

let startState: IAppState;
const defaultStatus = "idle";

beforeEach(() => {
  startState = {
    error: null,
    status: defaultStatus,
    init: false,
  };
});

test("correct error should be set", () => {
  const error = "error placeholder";
  const finalState = appReducer(startState, AppAC.setError(error));
  expect(finalState.error).toBe(error);
  expect(finalState.status).toBe(defaultStatus);
});

test("correct status should be set", () => {
  const status = "loading";
  const finalState = appReducer(startState, AppAC.setStatus(status));
  expect(finalState.status).toBe(status);
  expect(finalState.error).toBe(null);
});
