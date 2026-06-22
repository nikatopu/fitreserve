import Button from "../../atoms/Button";
import Paragraph from "../../atoms/Paragraph";
import Title from "../../atoms/Title";
import Background from "../../molecules/Background";
import style from "./Landing.module.scss";

export default function Landing() {
  function handleBookAClass() {
    window.location.href = "./schedule";
  }

  function handleViewPrograms() {
    window.location.href = "./programs";
  }

  return (
    <section className={style.container}>
      <Background img="/assets/luxury-gym.jpg" />

      <div className={style.content}>
        <Title text="Elevate Your Performance" />

        <Paragraph
          text="Experience the pinnacle of physical conditioning in an environment designed for the elite. Cinematic minimalism meets raw intensity."
          textAlign="center"
          maxWidth="40em"
        />

        <div className={style.buttonContainer}>
          <Button onClick={handleBookAClass} label="Book a Class" />

          <Button
            onClick={handleViewPrograms}
            label="View Programs"
            theme="secondary"
          />
        </div>
      </div>

      <div className={style.statusContainer}>
        <svg
          width="8"
          height="8"
          viewBox="0 0 8 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="8" height="8" rx="4" fill="var(--text-color-light)" />
        </svg>

        <Paragraph
          text={
            <>
              STATION STATUS: <b>OPEN</b>
            </>
          }
          size="small"
        />
      </div>
    </section>
  );
}
