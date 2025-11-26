import type { ReactElement } from "react";

interface ButtonProps {
  variant: "primary" | "secondary";
  size: "sm" | "md" | "lg";
  text: string;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  onClick?: () => void;
  widthFull?: boolean;
  disabled?: boolean;
}

const variantStyles = {
  primary: "bg-blue-500 text-white hover:bg-blue-400",
  secondary: "bg-blue-200 text-gray-800 hover:bg-blue-100",
};

const sizeStyles = {
  sm: "px-3 py-1 text-xs",
  md: "px-4 py-1.5 text-sm",
  lg: "px-6 py-2 text-md",
};

const defaultStyles =
  "flex items-center gap-1 rounded-lg cursor-pointer font-medium";

const fullWidthStyles = "w-full justify-center";

const disabledStyles = "bg-red-300 hover:bg-red-300 cursor-text";

const Button = (props: ButtonProps) => {
  return (
    <button
      className={`${defaultStyles} ${props.widthFull && fullWidthStyles} ${
        variantStyles[props.variant]
      } ${sizeStyles[props.size]} ${props.disabled && disabledStyles} cursor-`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.startIcon} {props.text} {props.endIcon}
    </button>
  );
};

export default Button;
