import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getInitialFolderThunk } from "../store/filesystem";
import { Action, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../store";

export function useInitialFolder() {
  const dispatch = useDispatch<ThunkDispatch<RootState, void, Action>>();
  useEffect(() => {
    dispatch(getInitialFolderThunk());
  }, []);
}
