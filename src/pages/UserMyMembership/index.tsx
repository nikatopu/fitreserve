import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Title from "../../components/atoms/Title";
import Paragraph from "../../components/atoms/Paragraph";
import Button from "../../components/atoms/Button";
import UserMembershipList from "../../components/organisms/User/UserMembershipList";
import style from "./UserMyMembership.module.scss";

export default function UserMyMembership() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();

  if (authLoading) {
    return (
      <div className={style.container}>
        <Paragraph text="Loading…" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className={style.container}>
        <div className={style.unauthState}>
          <Title text="My Membership" size="small" />
          <Paragraph text="Sign in to view your membership details." />
          <div className={style.unauthButtons}>
            <Button
              label="Log In"
              onClick={() => navigate("/login")}
              theme="primary"
            />
            <Button
              label="Sign Up"
              onClick={() => navigate("/signup")}
              theme="secondary"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={style.container}>
      <div className={style.pageHeader}>
        <div>
          <Title text="My Membership" size="small" textAlign="left" />
          <Paragraph
            text="Review your active membership details."
            size="small"
          />
        </div>
        <div className={style.headerActions}>
          <Button
            label="Browse Plans"
            onClick={() => navigate("/membership")}
            theme="secondary"
          />
        </div>
      </div>

      <UserMembershipList />
    </div>
  );
}
