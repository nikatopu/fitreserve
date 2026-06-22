import { JSX } from "react/jsx-runtime";
import style from "./Title.module.scss";
import classNames from "classnames";

interface IProps {
  text: string | JSX.Element;
  className?: string;
  size?: "small" | "medium" | "large";
}

export default function Title({ text, className, size = "medium" }: IProps) {
  return (
    <h1 className={classNames(style.title, style[size], className)}>{text}</h1>
  );
}
