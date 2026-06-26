import style from "./ClassDetail.module.scss";
import { Booking, Class } from "../../../api";
import { useNavigate } from "react-router-dom";
import Title from "../../atoms/Title";
import Paragraph from "../../atoms/Paragraph";
import {
  formatDateLong,
  formatTime,
} from "../../organisms/Schedule/scheduleUtils";
import Button from "../../atoms/Button";

interface IClassDetail {
  cls: Class;
  isAuthenticated: boolean;
  conflictError: boolean;
  booking: Booking | null;
  isLocallyBooked: boolean;
  onBook: () => void;
  onCancel: () => void;
  onClose: () => void;
}

export default function ClassDetail({
  cls,
  isAuthenticated,
  conflictError,
  booking,
  isLocallyBooked,
  onBook,
  onCancel,
  onClose,
}: IClassDetail) {
  const navigate = useNavigate();
  const isBooked = !!booking || isLocallyBooked;
  const seatsLeft = cls.max_seats - (cls._count?.bookings ?? 0);

  function signInToBook() {
    navigate(
      `/login?redirect=${encodeURIComponent(`/schedule?class=${cls.id}`)}`,
    );
  }

  return (
    <div className={style.classModal}>
      <div className={style.modalMeta}>
        {cls.program?.category && (
          <span className={style.categoryLabel}>{cls.program.category}</span>
        )}
      </div>

      <Title text={cls.title} size="small" textAlign="left" />

      {cls.professional && (
        <Paragraph
          text={`${cls.professional.first_name} ${cls.professional.last_name}`}
          size="small"
        />
      )}

      <div className={style.modalDetails}>
        <div className={style.detailRow}>
          <span className={style.detailLabel}>Date</span>
          <span>{formatDateLong(cls.date)}</span>
        </div>
        <div className={style.detailRow}>
          <span className={style.detailLabel}>Time</span>
          <span>
            {formatTime(cls.start_time)} – {formatTime(cls.end_time)}
          </span>
        </div>
        <div className={style.detailRow}>
          <span className={style.detailLabel}>Availability</span>
          <span>
            {seatsLeft > 0 ? `${seatsLeft} seats available` : "Fully Booked"}
          </span>
        </div>
      </div>
      {conflictError && (
        <p className={style.conflictNote}>
          This class overlaps with a session you have already booked.
        </p>
      )}
      <div className={style.modalActions}>
        {isBooked ? (
          <>
            {booking ? (
              <Button
                label="Cancel Booking"
                onClick={onCancel}
                theme="secondary"
                type="button"
              />
            ) : (
              <p className={style.bookedNote}>Booking pending…</p>
            )}
          </>
        ) : isAuthenticated ? (
          <Button
            label="Book"
            onClick={onBook}
            theme="primary"
            disabled={seatsLeft <= 0}
          />
        ) : (
          <Button
            label="Sign In to Book"
            onClick={signInToBook}
            theme="primary"
          />
        )}
        <Button
          label="Back"
          onClick={onClose}
          theme="secondary"
          type="button"
        />
      </div>
    </div>
  );
}
