import type {RootState, AppDispatch} from "../store.ts";
import {useDispatch, useSelector} from "react-redux";
import type {TypedUseSelectorHook} from "react-redux";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();