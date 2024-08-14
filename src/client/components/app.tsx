import { useSelector } from "react-redux";
import { RootState } from "../store";
import { WorkspaceSelector } from "./workspace-selector";
import { MainLayout } from "./main-layout";

export const App = () => {
  const workspaceUrl = useSelector(
    (state: RootState) => state.workspace.workspaceUrl
  );

  return (
    <main>
      {!workspaceUrl && <WorkspaceSelector />}
      {workspaceUrl && <MainLayout />}
    </main>
  );
};
