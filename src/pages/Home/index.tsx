import Landing from "../../components/organisms/Home/Landing";
import Programs from "../../components/organisms/Home/Programs";
import style from "./Home.module.scss";

export default function Home() {
  return (
    <div className={style.container}>
      <Landing />

      <Programs />
    </div>
  );
}
