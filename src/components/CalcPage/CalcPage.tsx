import { useState } from "react";
import { RoomParams } from "../RoomParams/RoomParams";
import { OptionGroup } from "../ui/OptionGroup/OptionGroup";
import { AddBlock } from "../ui/AddBlock/AddBlock";
import { AddRoomItem } from "../ui/AddRoomItem/AddRoomItem";
import { CalcButton } from "../СalcButton/CalcButton";

import styles from "./CalcPage.module.css";

import magic_wand_icon from "../../assets/icons/magic-wand.svg"

export function CalcPage() {
  const [windows, setWindows] = useState<string[]>([]);
  const [doors, setDoors] = useState<string[]>([]);

  const handleAdd = (type: "window" | "door") => {
    if (type === "window") {
      setWindows((s) =>
        s.length === 0
          ? [crypto.randomUUID(), crypto.randomUUID()]
          : [...s, crypto.randomUUID()]
      );
    } else {
      setDoors((s) =>
        s.length === 0
          ? [crypto.randomUUID(), crypto.randomUUID()]
          : [...s, crypto.randomUUID()]
      );
    }
  };

  const handleRemove = (type: "window" | "door", id: string) => {
    if (type === "window") setWindows((s) => s.filter((w) => w !== id));
    else setDoors((s) => s.filter((d) => d !== id));
  };

  return (
    <div className={styles.container}>
      <div className={styles.topRow}>
        <RoomParams />
      </div>

      <div className={styles.row}>
        <OptionGroup
          title="Параметры рулона"
          options={["1.06 x 10м", "1.06 x 25м"]}
          widths={[142, 180]}
          defaultValue="1.06 x 10м"
        />
        <OptionGroup
          title="Раппорт"
          options={["0", "0.32м", "0.64м"]}
          widths={[74, 142, 180]}
          defaultValue="0"
        />
      </div>

      <div className={styles.blocks}>
        <h3 className={styles.title}>Параметры окон</h3>
        <div className={styles.itemsRow}>
          {windows.map((id) => (
            <AddRoomItem
              key={id}
              type="Окно"
              onRemove={() => handleRemove("window", id)}
            />
          ))}
          <AddBlock
            label="Добавить окно"
            onClick={() => handleAdd("window")}
          />
        </div>

        <h3 className={styles.title}>Параметры дверей</h3>
        <div className={styles.itemsRow}>
          {doors.map((id) => (
            <AddRoomItem
              key={id}
              type="Дверь"
              onRemove={() => handleRemove("door", id)}
            />
          ))}
          <AddBlock
            label="Добавить дверь"
            onClick={() => handleAdd("door")}
          />
        </div>
      </div>

      <div className={styles.calc}>
        <CalcButton
          onClick={() => console.log("рассчитать")}
          icon={magic_wand_icon}
          iconAlt="Magic wand icon"
        >
          Расчитать материалы
        </CalcButton>
      </div>
    </div>
  );
}
