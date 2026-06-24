import { Link } from "react-router-dom";
import Paragraph from "../../../atoms/Paragraph";
import Title from "../../../atoms/Title";
import style from "./Programs.module.scss";
import ProgramCard from "../../../molecules/ProgramCard";
import { useAppContext } from "../../../../context/AppContext";

export default function Programs() {
  const { programsData } = useAppContext();

  const topThreeProrgrams = programsData ? programsData.slice(0, 3) : [];
  const covers = [
    "/assets/functional-power.jpg",
    "/assets/hypertrophy.jpg",
    "/assets/calisthenics.jpg",
  ];

  return (
    <section className={style.container}>
      <div className={style.header}>
        <Title text="Curated Disciplines" textAlign="left" />

        <Paragraph
          text="Master your physical potential through our specialized, highly focused training modalities."
          maxWidth="28em"
        />

        <Link to="/programs" className={style.link}>
          Explore All &rarr;
        </Link>
      </div>

      <div className={style.programs}>
        {topThreeProrgrams.map((program, index) => (
          <ProgramCard
            key={program.title}
            program={program}
            image={covers[index]}
          />
        ))}
      </div>
    </section>
  );
}
