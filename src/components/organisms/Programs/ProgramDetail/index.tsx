import { useAppContext } from "../../../../context/AppContext";
import Title from "../../../atoms/Title";
import Paragraph from "../../../atoms/Paragraph";
import style from "./ProgramDetail.module.scss";

interface IProps {
  id: string;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

function formatTime(timeStr: string): string {
  const [h, m] = timeStr.split(":");
  const hour = parseInt(h, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  const display = hour % 12 === 0 ? 12 : hour % 12;
  return `${display}:${m} ${ampm}`;
}

export default function ProgramDetail({ id }: IProps) {
  const { programsData, classesData, professionalsData } = useAppContext();

  const program = programsData?.find((p) => p.id === id) ?? null;

  if (!program) {
    return <Paragraph text="Program not found." />;
  }

  const relatedClasses = (classesData ?? [])
    .filter((c) => c.program_id === id)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const upcomingClasses = relatedClasses.filter(
    (c) => new Date(c.date) >= new Date(),
  );

  return (
    <div className={style.container}>
      <div className={style.meta}>
        {program.category && (
          <span className={style.category}>{program.category}</span>
        )}
        <span className={style.duration}>{program.duration_minutes} min per session</span>
      </div>

      <Title text={program.title} size="small" textAlign="left" />

      {program.description && (
        <Paragraph text={program.description} />
      )}

      <div className={style.section}>
        <h3 className={style.sectionTitle}>Upcoming Classes</h3>
        {upcomingClasses.length === 0 ? (
          <Paragraph text="No upcoming classes scheduled for this program." size="small" />
        ) : (
          <ul className={style.classList}>
            {upcomingClasses.map((c) => {
              const trainer =
                c.professional ??
                professionalsData?.find((p) => p.id === c.professional_id) ??
                null;
              return (
                <li key={c.id} className={style.classItem}>
                  <div className={style.classInfo}>
                    <span className={style.classTitle}>{c.title}</span>
                    <span className={style.classMeta}>
                      {formatDate(c.date)} · {formatTime(c.start_time)} – {formatTime(c.end_time)}
                      {trainer && (
                        <> · <a href={`/trainers?id=${trainer.id}`} className={style.trainerLink}>{trainer.first_name} {trainer.last_name}</a></>
                      )}
                    </span>
                  </div>
                  <span className={style.seats}>
                    {c.max_seats - c.booked_seats} seats left
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
