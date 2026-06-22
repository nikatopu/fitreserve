import style from "./Paragraph.module.scss";
import classNames from "classnames";
import { JSX } from "react/jsx-runtime";

interface IProps {
  text: string | JSX.Element;
  className?: string;
  size?: "small" | "medium" | "large";
  textAlign?: "left" | "center" | "right";
  maxWidth?: string;
}

export default function Paragraph({
  text,
  className,
  size = "medium",
  textAlign = "left",
  maxWidth,
}: IProps) {
  return (
    <p
      className={classNames(style.paragraph, style[size], className)}
      style={{ textAlign, maxWidth }}
    >
      {text}
    </p>
  );
}
