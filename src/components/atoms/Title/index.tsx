import { JSX } from "react/jsx-runtime";
import style from "./Title.module.scss";
import classNames from "classnames";

interface IProps {
  text: string | JSX.Element;
  className?: string;
  size?: "small" | "medium" | "large";
  textAlign?: "left" | "center" | "right";
}

export default function Title({
  text,
  className,
  size = "medium",
  textAlign = "center",
}: IProps) {
  return (
    <h1
      className={classNames(style.title, style[size], className)}
      style={{ textAlign }}
    >
      {text}
    </h1>
  );
}
