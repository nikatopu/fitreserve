import { JSX } from "react/jsx-runtime";
import classNames from "classnames";
import style from "./Button.module.scss";

interface IProps {
  label: string | JSX.Element;
  onClick: () => void;
  type?: "button" | "submit" | "reset";
  theme?: "primary" | "secondary" | "transparent";
  disabled?: boolean;
  className?: string;
  maxWidth?: string;
}

export default function Button({
  label,
  onClick,
  type = "button",
  theme = "primary",
  disabled = false,
  className = "",
  maxWidth,
}: IProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={classNames(style.button, style[theme], className)}
      disabled={disabled}
      style={{ maxWidth }}
    >
      <span className={style.label}>{label}</span>
    </button>
  );
}
