import Title from "../../atoms/Title";
import style from "./ProgramCard.module.scss";

interface IProps {
  image: string;
  title: string;
  category: string;
  link: string;
}

export default function ProgramCard({ image, title, category, link }: IProps) {
  return (
    <a href={link} className={style.container}>
      <img src={image} alt={title} className={style.image} />

      <div className={style.content}>
        <span className={style.category}>{category}</span>

        <Title text={title} size="small" className={style.title} />
      </div>
    </a>
  );
}
