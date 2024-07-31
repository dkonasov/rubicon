import { useComboboxContext } from "./combobox-context";

export interface ComboBoxElemProps {
  children: string;
}
export const ComboBoxElem = (props: ComboBoxElemProps) => {
  const { children } = props;
  const { onItemSelect } = useComboboxContext();

  return (
    <div
      onClick={() => onItemSelect(children)}
      tabIndex={0}
      className="focus:bg-black focus:text-white"
    >
      {children}
    </div>
  );
};
