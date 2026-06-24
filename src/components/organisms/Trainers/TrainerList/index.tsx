import { useAppContext } from "../../../../context/AppContext";
import Paragraph from "../../../atoms/Paragraph";
import style from "./TrainerList.module.scss";

export default function TrainerList() {
  const { professionalsData } = useAppContext();

  const active = (professionalsData ?? []).filter((p) => p.active);

  if (!professionalsData) {
    return <Paragraph text="Loading trainers…" />;
  }

  if (active.length === 0) {
    return <Paragraph text="No trainers available." />;
  }

  return (
    <div className={style.grid}>
      {active.map((trainer) => (
        <a
          key={trainer.id}
          href={`/trainers?id=${trainer.id}`}
          className={style.card}
        >
          <div className={style.avatar}>
            {trainer.image_url ? (
              <img
                src={trainer.image_url}
                alt={`${trainer.first_name} ${trainer.last_name}`}
                className={style.avatarImage}
              />
            ) : (
              <span className={style.avatarInitials}>
                {trainer.first_name[0]}{trainer.last_name[0]}
              </span>
            )}
          </div>
          <div className={style.info}>
            <h2 className={style.name}>
              {trainer.first_name} {trainer.last_name}
            </h2>
            {trainer.specialization && (
              <span className={style.specialization}>
                {trainer.specialization}
              </span>
            )}
          </div>
        </a>
      ))}
    </div>
  );
}
