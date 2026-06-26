import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import ScheduleHeader from "../../components/organisms/Schedule/ScheduleHeader";
import WeekNav from "../../components/organisms/Schedule/WeekNav";
import WeekGrid from "../../components/organisms/Schedule/WeekGrid";
import style from "./Schedule.module.scss";

export default function Schedule() {
  const [weekOffset, setWeekOffset] = useState(0);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const { openModal } = useAppContext();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Restore modal from redirect URL (e.g. after login with ?class=id)
  useEffect(() => {
    const classId = searchParams.get("class");
    if (classId) {
      openModal("class-detail", { classId });
      navigate("/schedule", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={style.container}>
      <ScheduleHeader categoryFilter={categoryFilter} onFilterChange={setCategoryFilter} />
      <WeekNav weekOffset={weekOffset} onOffsetChange={setWeekOffset} />
      <WeekGrid weekOffset={weekOffset} categoryFilter={categoryFilter} />
    </div>
  );
}
