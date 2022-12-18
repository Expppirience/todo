import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../store/store";

export type ThunkAppDispatchType = ThunkDispatch<AppStateType, any, AnyAction>;
export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector;
export const useAppDispatch = useDispatch<ThunkAppDispatchType>;

