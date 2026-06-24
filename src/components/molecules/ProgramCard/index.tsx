import { Program } from "../../../api";
import Title from "../../atoms/Title";
import style from "./ProgramCard.module.scss";

export default function ProgramCard({
  program,
  image,
}: {
  program: Program;
  image: string;
}) {
  const { title, category, id } = program;

  return (
    <a href={`/programs/${id}`} className={style.container}>
      <img src={image} alt={title} className={style.image} />

      <div className={style.content}>
        <span className={style.category}>{category}</span>

        <Title text={title} size="small" className={style.title} />
      </div>
    </a>
  );
}
