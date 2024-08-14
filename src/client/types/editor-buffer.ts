export interface EditorBuffer {
  url: string;
  content: string;
  encoding: "utf-8" | "binary";
  isDirty?: boolean;
}
