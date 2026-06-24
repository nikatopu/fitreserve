import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Title from "../../components/atoms/Title";
import Paragraph from "../../components/atoms/Paragraph";
import MembershipGrid from "../../components/organisms/Membership/MembershipGrid";
import style from "./Membership.module.scss";

export default function MembershipPage() {
  const [searchParams] = useSearchParams();
  const tierId = searchParams.get("tier");

  return (
    <div className={style.container}>
      <div className={style.pageHeader}>
        <Title
          text={tierId ? "Membership Details" : "Memberships"}
          size="small"
          textAlign="left"
        />
        {!tierId && (
          <Paragraph
            text="Choose the membership that fits your journey. Upgrade or change at any time."
            size="small"
          />
        )}
        {tierId && (
          <Link to="/membership" className={style.backLink}>
            ← All memberships
          </Link>
        )}
      </div>

      <MembershipGrid tierId={tierId} />
    </div>
  );
}
