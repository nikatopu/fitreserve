import style from "./Paragraph.module.scss";
import classNames from "classnames";
import { JSX } from "react/jsx-runtime";

interface IProps {
  text: string | JSX.Element;
  className?: string;
  size?: "small" | "medium" | "large";
}

export default function Paragraph({
  text,
  className,
  size = "medium",
}: IProps) {
  return (
    <p className={classNames(style.paragraph, style[size], className)}>{text}</p>
  );
}
