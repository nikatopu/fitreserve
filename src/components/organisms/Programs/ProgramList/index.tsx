import { useAppContext } from "../../../../context/AppContext";
import Paragraph from "../../../atoms/Paragraph";
import style from "./ProgramList.module.scss";

export default function ProgramList() {
  const { programsData } = useAppContext();

  if (!programsData) {
    return <Paragraph text="Loading programs…" />;
  }

  if (programsData.length === 0) {
    return <Paragraph text="No programs available." />;
  }

  return (
    <div className={style.grid}>
      {programsData.map((program) => (
        <a
          key={program.id}
          href={`/programs?id=${program.id}`}
          className={style.card}
        >
          {program.category && (
            <span className={style.category}>{program.category}</span>
          )}
          <h2 className={style.title}>{program.title}</h2>
          {program.description && (
            <p className={style.description}>{program.description}</p>
          )}
          <span className={style.duration}>
            {program.duration_minutes} min
          </span>
        </a>
      ))}
    </div>
  );
}
