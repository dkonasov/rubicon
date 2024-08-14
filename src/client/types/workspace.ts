export interface WorkspaceFile {
  name: string;
}

export interface WorkspaceDirectory {
  name: string;
  children: WorkspaceEntry[];
}

export type WorkspaceEntry = WorkspaceFile | WorkspaceDirectory;
