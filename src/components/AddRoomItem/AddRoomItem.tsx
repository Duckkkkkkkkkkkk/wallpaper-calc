import { useState, useEffect } from "react";
import { InputField } from "../ui/InputField/InputField";

import styles from "./AddRoomItem.module.css";

import close_icon from "../../assets/icons/close.svg";

interface AddRoomItemProps {
  type: "Окно" | "Дверь";
  onRemove: () => void;
  onDataChange: (field: "width" | "height", value: string) => void;
  data: { width: string; height: string };
}

export function AddRoomItem({ type, onRemove, onDataChange, data }: AddRoomItemProps) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 480);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const inputWidth = isMobile ? 134 : 107;

  const handleValueChange = (field: "width" | "height", value: string) => {
    onDataChange(field, value);
  };

  return (
    <div className={styles.block}>
      <button className={styles.close} onClick={onRemove}>
        <img src={close_icon} alt="Закрыть" />
      </button>
      <h4 className={styles.title}>{type}</h4>
      <div className={styles.inputs}>
        <InputField
          label="Ширина"
          value={data.width}
          onChange={(v) => handleValueChange("width", v)}
          placeholder="0"
          style={{ width: `${inputWidth}px` }}
        />
        <InputField
          label="Высота"
          value={data.height}
          onChange={(v) => handleValueChange("height", v)}
          placeholder="0"
          style={{ width: `${inputWidth}px` }}
        />
      </div>
    </div>
  );
}
