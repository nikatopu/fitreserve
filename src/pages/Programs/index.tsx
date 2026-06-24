import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Title from "../../components/atoms/Title";
import Paragraph from "../../components/atoms/Paragraph";
import ProgramList from "../../components/organisms/Programs/ProgramList";
import ProgramDetail from "../../components/organisms/Programs/ProgramDetail";
import style from "./Programs.module.scss";

export default function Programs() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  return (
    <div className={style.container}>
      <div className={style.pageHeader}>
        <Title
          text={id ? "Program Details" : "Programs"}
          size="small"
          textAlign="left"
        />
        {!id && (
          <Paragraph
            text="Explore our curated training disciplines designed to elevate your performance."
            size="small"
          />
        )}
        {id && (
          <Link to="/programs" className={style.backLink}>
            ← All programs
          </Link>
        )}
      </div>

      {id ? <ProgramDetail id={id} /> : <ProgramList />}
    </div>
  );
}
