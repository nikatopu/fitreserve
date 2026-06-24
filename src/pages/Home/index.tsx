import Landing from "../../components/organisms/Home/Landing";
import Memberships from "../../components/organisms/Home/Membership";
import Programs from "../../components/organisms/Home/Programs";
import TrainerQuote from "../../components/organisms/Home/TrainerQuote";
import style from "./Home.module.scss";

export default function Home() {
  return (
    <div className={style.container}>
      <Landing />

      <Programs />

      <Memberships />

      <TrainerQuote />
    </div>
  );
}
