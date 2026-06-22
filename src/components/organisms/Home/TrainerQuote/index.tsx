import style from "./TrainerQuote.module.scss";

export default function TrainerQuote() {
  return (
    <section className={style.container}>
      <img src="/assets/trainer.jpg" alt="Trainer" className={style.trainer} />

      <img
        src="/assets/trainer-quote.png"
        alt="Quote"
        className={style.quote}
      />
    </section>
  );
}
