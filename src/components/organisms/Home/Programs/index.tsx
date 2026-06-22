import { Link } from "react-router-dom";
import Paragraph from "../../../atoms/Paragraph";
import Title from "../../../atoms/Title";
import style from "./Programs.module.scss";
import ProgramCard from "../../../molecules/ProgramCard";

export default function Programs() {
  const programs = [
    {
      image: "/assets/functional-power.jpg",
      title: "Functional Power",
      category: "STRENGTH",
      link: "/programs?title=functional-power",
    },
    {
      image: "/assets/hypertrophy.jpg",
      title: "Hypertrophy",
      category: "BODYBUILDING",
      link: "/programs?title=hypertrophy",
    },
    {
      image: "/assets/calisthenics.jpg",
      title: "Calisthenics",
      category: "GROUP DYNAMICS",
      link: "/programs?title=calisthenics",
    },
  ];

  return (
    <section className={style.container}>
      <div className={style.header}>
        <Title text="Curated Disciplines" />

        <Paragraph
          text="Master your physical potential through our specialized, highly focused training modalities."
          maxWidth="28em"
        />

        <Link to="/programs" className={style.link}>
          Explore All &rarr;
        </Link>
      </div>

      <div className={style.programs}>
        {programs.map((program) => (
          <ProgramCard key={program.title} {...program} />
        ))}
      </div>
    </section>
  );
}
