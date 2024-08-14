import { Editor } from "./editor";
import { WorkspaceTree } from "./workspace-tree";

export const MainLayout = () => {
  return (
    <div className="flex">
      <div>
        <WorkspaceTree />
      </div>
      <div className="flex-grow">
        <Editor />
      </div>
    </div>
  );
};
