import { useState } from "react";
import styles from "./RoomParams.module.css";
import { InputField } from "../ui/InputField/InputField";

export function RoomParams() {
  const [vals, setVals] = useState({ length: "", width: "", height: "" });

  const fields = [
    { key: "length", label: "Длина м", placeholder: "6.5" },
    { key: "width", label: "Ширина м", placeholder: "6.5" },
    { key: "height", label: "Высота м", placeholder: "2.7" },
  ] as const;

  return (
    <section className={styles.wrapper}>
      <h3 className={styles.title}>Параметры комнаты</h3>
      <div className={styles.row}>
        {fields.map((f) => (
          <InputField
            key={f.key}
            label={f.label}
            placeholder={f.placeholder}
            value={(vals as any)[f.key]}
            onChange={(v) => setVals((s) => ({ ...s, [f.key]: v }))}
          />
        ))}
      </div>
    </section>
  );
}
