import { useSelector } from "react-redux";
import { activeBufferSelector, buffersSelector } from "../store/editor";
import { getFilenameFromPath } from "../utils/get-filename-from-path";
import cx from "classnames";

export const EditorTabs = () => {
  const buffers = useSelector(buffersSelector);
  const activeBuffer = useSelector(activeBufferSelector);

  return (
    <div className="inline-flex border-t border-black border-l border-b">
      {buffers.map((buffer) => (
        <div
          key={buffer.url}
          className={cx("border-black border-r px-2 py-1", {
            "bg-slate-500": activeBuffer?.url === buffer.url,
          })}
        >
          {getFilenameFromPath(buffer.url)}
          {buffer.isDirty && " *"}
        </div>
      ))}
    </div>
  );
};
