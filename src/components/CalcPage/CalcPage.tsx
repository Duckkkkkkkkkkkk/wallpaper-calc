import { useState, useEffect } from "react";
import { RoomParams } from "../RoomParams/RoomParams";
import { OptionGroup } from "../ui/OptionGroup/OptionGroup";
import { AddBlock } from "../ui/AddBlock/AddBlock";
import { AddRoomItem } from "../ui/AddRoomItem/AddRoomItem";
import { CalcButton } from "../СalcButton/CalcButton";
import { useWallpaperCalculator } from "../../hooks/useWallpaperCalculator";

import styles from "./CalcPage.module.css";

import magic_wand_icon from "../../assets/icons/magic-wand.svg"

interface RoomData {
  length: string;
  width: string;
  height: string;
}

interface OpeningData {
  id: string;
  width: string;
  height: string;
}

export function CalcPage() {
  const [roomData, setRoomData] = useState<RoomData>({ length: "", width: "", height: "" });
  const [rollType, setRollType] = useState("1.06 x 10м");
  const [rapport, setRapport] = useState("0");
  const [windows, setWindows] = useState<OpeningData[]>([]);
  const [doors, setDoors] = useState<OpeningData[]>([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);

  const { calculation, calculate } = useWallpaperCalculator();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 480);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Обработчик для данных комнаты
  const handleRoomDataChange = (newData: RoomData) => {
    setRoomData(newData);
  };

  const handleAdd = (type: "window" | "door") => {
    const newItem: OpeningData = {
      id: crypto.randomUUID(),
      width: "",
      height: ""
    };

    if (type === "window") {
      setWindows((s) => s.length === 0 ? [newItem, { ...newItem, id: crypto.randomUUID() }] : [...s, newItem]);
    } else {
      setDoors((s) => s.length === 0 ? [newItem, { ...newItem, id: crypto.randomUUID() }] : [...s, newItem]);
    }
  };

  const handleRemove = (type: "window" | "door", id: string) => {
    if (type === "window") setWindows((s) => s.filter((w) => w.id !== id));
    else setDoors((s) => s.filter((d) => d.id !== id));
  };

  // Обновление данных окон/дверей
  const handleOpeningChange = (type: "window" | "door", id: string, field: "width" | "height", value: string) => {
    const setter = type === "window" ? setWindows : setDoors;
    setter(prev => prev.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  // Функция расчета
  const handleCalculate = () => {
    const result = calculate(
      roomData,
      rollType,
      rapport,
      windows,
      doors
    );

    console.log("Результаты расчета:", result);
    // Здесь можно добавить отображение результатов в UI
    alert(`Результаты расчета:\nРулоны: ${result.rolls} шт.\nПлощадь обоев: ${result.wallpaperArea} м²\nПлощадь оклейки: ${result.wallArea} м²`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.topRow}>
        <RoomParams onDataChange={handleRoomDataChange} />
      </div>

      <div className={styles.row}>
        <OptionGroup
          title="Параметры рулона"
          options={["1.06 x 10м", "1.06 x 25м"]}
          widths={{ desktop: [142, 180], mobile: [118, 148] }}
          defaultValue="1.06 x 10м"
          onChange={setRollType}
        />
        <OptionGroup
          title="Раппорт"
          options={["0", "0.32м", "0.64м"]}
          widths={{ desktop: [74, 142, 180], mobile: [50, 118, 148] }}
          defaultValue="0"
          onChange={setRapport}
        />
      </div>

      <div className={styles.blocks}>
        <h3 className={styles.title}>Параметры окон</h3>
        <div className={styles.itemsRow}>
          {windows.map((window) => (
            <AddRoomItem
              key={window.id}
              type="Окно"
              onRemove={() => handleRemove("window", window.id)}
              onDataChange={(field, value) => handleOpeningChange("window", window.id, field, value)}
              data={window}
            />
          ))}
          <AddBlock
            label="Добавить окно"
            onClick={() => handleAdd("window")}
          />
        </div>

        <h3 className={styles.title}>Параметры дверей</h3>
        <div className={styles.itemsRow}>
          {doors.map((door) => (
            <AddRoomItem
              key={door.id}
              type="Дверь"
              onRemove={() => handleRemove("door", door.id)}
              onDataChange={(field, value) => handleOpeningChange("door", door.id, field, value)}
              data={door}
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
          onClick={handleCalculate}
          icon={magic_wand_icon}
          iconAlt="Magic wand icon"
        >
          {isMobile ? "Рассчитать материалы" : "Рассчитать кол-во материалов"}
        </CalcButton>
      </div>

      {calculation && (
        <div className={styles.results}>
          <h3>Результаты расчета:</h3>
          <p>Рулоны: {calculation.rolls} шт.</p>
          <p>Площадь обоев: {calculation.wallpaperArea} м²</p>
          <p>Площадь оклейки: {calculation.wallArea} м²</p>
        </div>
      )}
    </div>
  );
}
