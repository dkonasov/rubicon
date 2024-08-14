import { Editor } from "@monaco-editor/react";
import { getLanguageByExt } from "../../utils/get-language-by-ext";
import { on } from "events";

export interface TextEditorProps {
  value: string;
  onChange: (value: string) => void;
  ext: string;
}

export const TextEditor = (props: TextEditorProps) => {
  const { value, onChange, ext } = props;

  return (
    <Editor
      height="90vh"
      defaultLanguage={getLanguageByExt(ext)}
      defaultValue={value}
      onChange={onChange}
    />
  );
};
