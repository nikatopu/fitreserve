import type { ReactNode } from "react";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useAppContext } from "../../../context/AppContext";
import { useAuth } from "../../../context/AuthContext";
import { BookingsContext } from "../../../context/BookingsContext";
import type { Booking } from "../../../api";
import { bookingsApi } from "../../../api";
import Modal from "../../molecules/Modal";
import Title from "../../atoms/Title";
import Paragraph from "../../atoms/Paragraph";
import Button from "../../atoms/Button";
import {
  checkConflict,
} from "../Schedule/scheduleUtils";
import style from "./ModalController.module.scss";
import ClassDetail from "../../molecules/ClassDetail";

interface IProps {
  children: ReactNode;
}

export default function ModalController({ children }: IProps) {
  const { modal, openModal, closeModal, classesData } = useAppContext();
  const { isAuthenticated } = useAuth();

  const [myBookings, setMyBookings] = useState<Booking[]>([]);
  const [locallyBookedIds, setLocallyBookedIds] = useState<Set<string>>(
    new Set(),
  );
  const [conflictError, setConflictError] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      setMyBookings([]);
      return;
    }
    bookingsApi
      .getMy()
      .then(setMyBookings)
      .catch(() => {});
  }, [isAuthenticated]);

  const classIdForModal =
    modal?.type === "class-detail"
      ? (modal.data as { classId: string }).classId
      : null;

  useEffect(() => {
    setConflictError(false);
  }, [classIdForModal]);

  async function handleBook(classId: string) {
    const cls = (classesData ?? []).find((c) => c.id === classId);
    if (!cls) return;

    if (checkConflict(cls, myBookings, classesData ?? [])) {
      setConflictError(true);
      return;
    }

    setLocallyBookedIds((prev) => {
      const next = new Set(prev);
      next.add(classId);
      return next;
    });

    closeModal();

    try {
      const booking = await bookingsApi.create({ class_id: classId });
      setMyBookings((prev) => [...prev, booking]);

      setLocallyBookedIds((prev) => {
        const next = new Set(prev);
        next.delete(classId);
        return next;
      });

      toast.success("Class booked.");
    } catch {

      setLocallyBookedIds((prev) => {
        const next = new Set(prev);
        next.delete(classId);
        return next;
      });

      openModal("booking-error", {});
    }
  }

  async function handleCancel(bookingId: string) {
    const booking = myBookings.find((b) => b.id === bookingId);
    if (!booking) return;

    const originalStatus = booking.status;

    setMyBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: "cancelled" } : b)),
    );

    closeModal();

    try {
      await bookingsApi.cancel(bookingId);
      toast.success("Booking cancelled.");
    } catch {
      setMyBookings((prev) =>
        prev.map((b) =>
          b.id === bookingId ? { ...b, status: originalStatus } : b,
        ),
      );

      openModal("booking-error", {});
    }
  }

  function renderModal() {
    if (modal?.type === "class-detail") {
      const classId = (modal.data as { classId: string }).classId;
      const cls = (classesData ?? []).find((c) => c.id === classId) ?? null;
      if (!cls) return null;

      const booking =
        myBookings.find(
          (b) => b.class_id === cls.id && b.status !== "cancelled",
        ) ?? null;

      return (
        <Modal isOpen onClose={closeModal}>
          <ClassDetail
            cls={cls}
            isAuthenticated={isAuthenticated}
            conflictError={conflictError}
            booking={booking}
            isLocallyBooked={locallyBookedIds.has(cls.id)}
            onBook={() => handleBook(cls.id)}
            onCancel={() => booking && handleCancel(booking.id)}
            onClose={closeModal}
          />
        </Modal>
      );
    }

    if (modal?.type === "booking-error") {
      return (
        <Modal isOpen onClose={closeModal}>
          <div className={style.errorModal}>
            <Title text="Booking failed" size="small" textAlign="left" />
            <Paragraph
              text="Something went wrong with your booking. Please try again."
              size="small"
            />
            <Button label="Try Again" onClick={closeModal} />
          </div>
        </Modal>
      );
    }

    return null;
  }

  return (
    <BookingsContext.Provider value={{ myBookings, locallyBookedIds }}>
      {children}
      {renderModal()}
    </BookingsContext.Provider>
  );
}
