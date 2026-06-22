import Landing from "../../components/organisms/Home/Landing";
import Membership from "../../components/organisms/Home/Membership";
import Programs from "../../components/organisms/Home/Programs";
import style from "./Home.module.scss";

export default function Home() {
  return (
    <div className={style.container}>
      <Landing />

      <Programs />

      <Membership />
    </div>
  );
}
