import { PropsWithChildren } from "react";
import { Provider as StoreProvider } from "react-redux";
import store from "../store";

export const AppProviders = (props: PropsWithChildren) => {
  return <StoreProvider store={store}>{props.children}</StoreProvider>;
};
