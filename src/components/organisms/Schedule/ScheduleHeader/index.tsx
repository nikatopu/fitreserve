import { useMemo } from "react";
import { useAppContext } from "../../../../context/AppContext";
import Title from "../../../atoms/Title";
import Paragraph from "../../../atoms/Paragraph";
import style from "./ScheduleHeader.module.scss";

interface IProps {
  categoryFilter: string;
  onFilterChange: (v: string) => void;
}

export default function ScheduleHeader({ categoryFilter, onFilterChange }: IProps) {
  const { classesData } = useAppContext();

  const categories = useMemo(() => {
    const cats = new Set<string>();
    (classesData ?? []).forEach((c) => {
      if (c.program?.category) cats.add(c.program.category);
    });
    return ["all", ...Array.from(cats).sort()];
  }, [classesData]);

  return (
    <div className={style.header}>
      <div className={style.text}>
        <Title text="The Schedule" size="small" textAlign="left" />
        <Paragraph
          text="Curated sessions designed for peak performance. Secure your place."
          size="small"
        />
      </div>
      <select
        className={style.filter}
        title="Filter by class type"
        value={categoryFilter}
        onChange={(e) => onFilterChange(e.target.value)}
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat === "all" ? "All Classes" : cat}
          </option>
        ))}
      </select>
    </div>
  );
}
