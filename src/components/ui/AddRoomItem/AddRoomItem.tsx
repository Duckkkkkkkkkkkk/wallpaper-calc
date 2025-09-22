import { useState } from "react";
import { InputField } from "../InputField/InputField";
import close_icon from "../../../assets/icons/close.svg";
import styles from "./AddRoomItem.module.css";

interface AddRoomItemProps {
  type: "Окно" | "Дверь";
  onRemove: () => void;
}

export function AddRoomItem({ type, onRemove }: AddRoomItemProps) {
  const [vals, setVals] = useState({ width: "", height: "" });

  return (
    <div className={styles.block}>
      <button className={styles.close} onClick={onRemove}>
        <img src={close_icon} alt="Закрыть" />
      </button>
      <h4 className={styles.title}>{type}</h4>
      <div className={styles.inputs}>
        <InputField
          label="Ширина"
          value={vals.width}
          onChange={(v) => setVals((s) => ({ ...s, width: v }))}
          placeholder="0"
          style={{ width: "107px" }}
        />
        <InputField
          label="Высота"
          value={vals.height}
          onChange={(v) => setVals((s) => ({ ...s, height: v }))}
          placeholder="0"
          style={{ width: "107px" }}
        />
      </div>
    </div>
  );
}
