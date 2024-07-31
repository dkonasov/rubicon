import { useFloating } from "@floating-ui/react";
import {
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  KeyboardEvent,
} from "react";
import { ComboBoxElemProps } from "./combo-box-elem";
import { ComboboxContextValue, ComboboxProvider } from "./combobox-context";
import { on } from "events";

export interface ComboBoxProps {
  value?: string;
  onFocus?: () => void;
  isLoading?: boolean;
  children?:
    | ReactElement<ComboBoxElemProps>[]
    | ReactElement<ComboBoxElemProps>;
  onItemSelect?: ComboboxContextValue["onItemSelect"];
}

export const ComboBox = (props: ComboBoxProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { floatingStyles, refs } = useFloating();
  const currentFocusedOptionRef = useRef<HTMLElement | null>(null);

  const { value = "", isLoading, onItemSelect, children } = props;
  const comboBoxContextValue = useMemo<ComboboxContextValue>(
    () => ({ onItemSelect }),
    [onItemSelect]
  );

  const onInputFocus = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    if (isOpen && refs.floating.current.firstElementChild) {
      const firstItem = refs.floating.current
        .firstElementChild as HTMLDivElement;
      firstItem.focus();
      currentFocusedOptionRef.current = firstItem;
    }
  }, [isOpen, children]);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    event.preventDefault();
    if (currentFocusedOptionRef.current) {
      if (event.key === "ArrowDown") {
        const nextItem = currentFocusedOptionRef.current.nextElementSibling as
          | HTMLElement
          | undefined;
        if (nextItem) {
          currentFocusedOptionRef.current = nextItem as HTMLElement;
        } else {
          currentFocusedOptionRef.current = refs.floating.current
            .firstElementChild as HTMLElement;
        }

        currentFocusedOptionRef.current.focus();
      } else if (event.key === "ArrowUp") {
        const prevItem = currentFocusedOptionRef.current
          .previousElementSibling as HTMLElement | undefined;
        if (prevItem) {
          currentFocusedOptionRef.current = prevItem as HTMLElement;
        } else {
          currentFocusedOptionRef.current = refs.floating.current
            .lastElementChild as HTMLElement;
        }

        currentFocusedOptionRef.current.focus();
      } else if (event.key === "Enter") {
        onItemSelect?.(currentFocusedOptionRef.current.textContent || "");
      }
    }
  }, []);

  return (
    <ComboboxProvider value={comboBoxContextValue}>
      <input
        type="text"
        value={value}
        ref={refs.setReference}
        onFocus={onInputFocus}
        className="w-96 border border-solid border-black px-2 py-1"
        readOnly
      />
      {isOpen && (
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          className="w-96"
          onKeyDown={handleKeyDown}
        >
          {isLoading && <div>Loading...</div>}
          {!isLoading && props.children}
        </div>
      )}
    </ComboboxProvider>
  );
};
