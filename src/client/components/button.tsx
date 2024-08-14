import { ButtonHTMLAttributes, FC, PropsWithChildren } from "react";

export const Button: FC<
  PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>
> = (props) => {
  return (
    <button {...props} className="border-solid border-black border px-2 py-1" />
  );
};
