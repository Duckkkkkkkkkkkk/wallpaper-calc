import { InputField } from "../ui/InputField/InputField";

import styles from "./RoomParams.module.css";

export interface RoomData {
  length: string;
  width: string;
  height: string;
}

interface RoomParamsProps {
  roomData: RoomData;
  onDataChange: (data: RoomData) => void;
  errors?: { [key: string]: string };
  inputRefs: {
    length: React.RefObject<HTMLInputElement | null>;
    width: React.RefObject<HTMLInputElement | null>;
    height: React.RefObject<HTMLInputElement | null>;
  };
  onClearError?: (field: keyof RoomData) => void;
}

export function RoomParams({ onDataChange, errors = {}, inputRefs, onClearError, roomData }: RoomParamsProps & { roomData: RoomData }) {
  const fields = [
    { key: "length", label: "Длина м", placeholder: "6.5" },
    { key: "width", label: "Ширина м", placeholder: "6.5" },
    { key: "height", label: "Высота м", placeholder: "2.7" },
  ] as const;

  const handleChange = (key: "length" | "width" | "height", value: string) => {
    onDataChange({ ...roomData, [key]: value });
    if (value) onClearError?.(key);
  };

  return (
    <section className={styles.wrapper}>
      <h3 className={styles.title}>Параметры комнаты</h3>
      <div className={styles.row}>
        {fields.map((f) => (
          <InputField
            key={f.key}
            label={f.label}
            placeholder={f.placeholder}
            value={roomData[f.key]}
            onChange={(v) => handleChange(f.key, v)}
            error={errors[f.key]}
            ref={inputRefs?.[f.key]}
          />
        ))}
      </div>
    </section>
  );
}
