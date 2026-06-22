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
    </section>
  );
}
