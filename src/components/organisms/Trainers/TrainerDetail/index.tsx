import { useAppContext } from "../../../../context/AppContext";
import Title from "../../../atoms/Title";
import Paragraph from "../../../atoms/Paragraph";
import style from "./TrainerDetail.module.scss";

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

export default function TrainerDetail({ id }: IProps) {
  const { professionalsData, classesData } = useAppContext();

  const trainer = professionalsData?.find((p) => p.id === id) ?? null;

  if (!trainer) {
    return <Paragraph text="Trainer not found." />;
  }

  const upcomingClasses = (classesData ?? [])
    .filter(
      (c) => c.professional_id === id && new Date(c.date) >= new Date(),
    )
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className={style.container}>
      <div className={style.profile}>
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

        <div className={style.profileInfo}>
          <Title
            text={`${trainer.first_name} ${trainer.last_name}`}
            size="small"
            textAlign="left"
          />
          {trainer.specialization && (
            <span className={style.specialization}>
              {trainer.specialization}
            </span>
          )}
          {trainer.bio && <Paragraph text={trainer.bio} />}
        </div>
      </div>

      <div className={style.section}>
        <h3 className={style.sectionTitle}>Upcoming Classes</h3>
        {upcomingClasses.length === 0 ? (
          <Paragraph
            text="No upcoming classes scheduled with this trainer."
            size="small"
          />
        ) : (
          <ul className={style.classList}>
            {upcomingClasses.map((c) => (
              <li key={c.id} className={style.classItem}>
                <div className={style.classInfo}>
                  <span className={style.classTitle}>{c.title}</span>
                  <span className={style.classMeta}>
                    {formatDate(c.date)} · {formatTime(c.start_time)} –{" "}
                    {formatTime(c.end_time)}
                    {c.program && (
                      <>
                        {" · "}
                        <a
                          href={`/programs?id=${c.program.id}`}
                          className={style.programLink}
                        >
                          {c.program.title}
                        </a>
                      </>
                    )}
                  </span>
                </div>
                <span className={style.seats}>
                  {c.max_seats - c.booked_seats} seats left
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
