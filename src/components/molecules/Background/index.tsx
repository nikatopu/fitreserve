import style from "./Background.module.scss";

interface IProps {
  img: string;
  darken?: boolean;
}

export default function Background({ img, darken = true }: IProps) {
  return (
    <div className={style.container}>
      <img src={img} alt="Background" className={style.backgroundImage} />
      {darken && <div className={style.darkenOverlay} />}
    </div>
  );
}
