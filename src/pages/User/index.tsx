import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { bookingsApi, membershipsApi } from "../../api";
import type { Booking, UserMembership } from "../../api";
import Title from "../../components/atoms/Title";
import Paragraph from "../../components/atoms/Paragraph";
import Button from "../../components/atoms/Button";
import UserStats from "../../components/organisms/User/UserStats";
import UserBookings from "../../components/organisms/User/UserBookings";
import UserMembershipCard from "../../components/organisms/User/UserMembershipCard";
import UserUpdates from "../../components/organisms/User/UserUpdates";
import style from "./User.module.scss";

export default function UserPage() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [myMemberships, setMyMemberships] = useState<UserMembership[]>([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) return;
    Promise.all([bookingsApi.getMy(), membershipsApi.getMy()])
      .then(([b, m]) => {
        setBookings(b);
        setMyMemberships(m);
      })
      .catch(() => {})
      .finally(() => setDataLoading(false));
  }, [isAuthenticated]);

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
          <Title text="Members Area" size="small" />
          <Paragraph text="Sign in to access your dashboard." />
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
        <div className={style.pageHeaderLeft}>
          <Title
            text={`Welcome back, ${user?.first_name ?? "Member"}.`}
            size="small"
            textAlign="left"
          />
          <Paragraph
            text="Your cinematic fitness journey awaits."
            size="small"
          />
        </div>
        <div className={style.pageHeaderRight}>
          <Button
            label="Book a Session"
            onClick={() => navigate("/schedule")}
            theme="primary"
          />
        </div>
      </div>

      {dataLoading ? (
        <div className={style.loading}>
          <Paragraph text="Loading your data…" />
        </div>
      ) : (
        <div className={style.columns}>
          <div className={style.columnLeft}>
            <UserStats bookings={bookings} />
            <UserBookings bookings={bookings} />
          </div>
          <div className={style.columnRight}>
            <UserMembershipCard
              memberships={myMemberships}
              bookings={bookings}
            />
            <UserUpdates bookings={bookings} />
          </div>
        </div>
      )}
    </div>
  );
}
