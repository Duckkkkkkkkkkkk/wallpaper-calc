import emailjs from "emailjs-com";
import { useState, useEffect, useRef} from "react";
import { RoomParams } from "../../components/RoomParams/RoomParams";
import { OptionGroup } from "../../components/ui/OptionGroup/OptionGroup";
import { AddBlock } from "../../components/ui/AddBlock/AddBlock";
import { AddRoomItem } from "../../components/AddRoomItem/AddRoomItem";
import { CalcButton } from "../../components/СalcButton/CalcButton";
import { useWallpaperCalculator } from "../../hooks/useWallpaperCalculator";
import { CalcResults } from "../../components/CalcResults/CalcResults";
import { EmailModal } from "../../components/EmailModal/EmailModal";
import type { RoomData } from "../../components/RoomParams/RoomParams";

import styles from "./CalcPage.module.css";

import magic_wand_icon from "../../assets/icons/magic-wand.svg"

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
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  const { calculation, calculate, reset } = useWallpaperCalculator();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 480);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const inputRefs = {
    length: useRef<HTMLInputElement>(null),
    width: useRef<HTMLInputElement>(null),
    height: useRef<HTMLInputElement>(null),
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!roomData.length) newErrors.length = "Вы не заполнили это поле";
    if (!roomData.width) newErrors.width = "Вы не заполнили это поле";
    if (!roomData.height) newErrors.height = "Вы не заполнили это поле";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      const firstKey = Object.keys(newErrors)[0] as keyof typeof inputRefs;
      inputRefs[firstKey].current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      inputRefs[firstKey].current?.focus();
      return false;
    }
    return true;
  };

  const clearError = (field: keyof RoomData) => {
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  };
  
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
      setWindows((s) => [...s, newItem]);
    } else {
      setDoors((s) => [...s, newItem]);
    }
  };

  const handleRemove = (type: "window" | "door", id: string) => {
    if (type === "window") setWindows((s) => s.filter((w) => w.id !== id));
    else setDoors((s) => s.filter((d) => d.id !== id));
  };

  const handleOpeningChange = (type: "window" | "door", id: string, field: "width" | "height", value: string) => {
    const setter = type === "window" ? setWindows : setDoors;
    setter(prev => prev.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const handleCalculate = () => {
    if (!validate()) {
      reset();
      return;
    }

    const result = calculate(
      roomData,
      rollType,
      rapport,
      windows,
      doors
    );

    console.log("Результаты расчета:", result);
  };

  const handleSendEmail = async (email: string) => {
    if (!calculation) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("Некорректный email");
    }

    try {
      await emailjs.send(
        "service_9av9e6n",
        "template_kbexyrv",
        {
          user_email: email,
          rolls: calculation.rolls,
          wallpaperArea: calculation.wallpaperArea,
          wallArea: calculation.wallArea,
        },
        "wlkvlrGpoUcLo--Eu"
      );
    } catch (error) {
      console.error(error);
      throw new Error("Не удалось отправить письмо");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.topRow}>
        <RoomParams 
          roomData={roomData}
          onDataChange={handleRoomDataChange}
          errors={errors}
          inputRefs={inputRefs}
          onClearError={clearError}
        />
      </div>

      <div className={styles.row}>
        <OptionGroup
          title="Параметры рулона"
          options={["1.06 x 10м", "1.06 x 25м"]}
          widths={{ desktop: [142, 180], mobile: [118, 148] }}
          value={rollType}
          onChange={setRollType}
        />
        <OptionGroup
          title="Раппорт"
          options={["0", "0.32м", "0.64м"]}
          widths={{ desktop: [74, 142, 180], mobile: [50, 118, 148] }}
          value={rapport}
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

      {!calculation && (
      <div className={styles.calc}>
        <CalcButton
          onClick={handleCalculate}
          icon={magic_wand_icon}
          iconAlt="Magic wand icon"
        >
          {isMobile ? "Рассчитать материалы" : "Рассчитать кол-во материалов"}
        </CalcButton>
      </div>

      )}
      {calculation && (
        <CalcResults
          rolls={calculation.rolls}
          wallpaperArea={calculation.wallpaperArea}
          wallArea={calculation.wallArea}
          onReset={() => {
            setRoomData({ length: "", width: "", height: "" });
            setRollType("1.06 x 10м");
            setRapport("0");
            setWindows([]);
            setDoors([]);
            reset();
          }}
          onGoToCatalog={() => console.log("Переход в каталог")}
          onSendEmail={() => setIsEmailModalOpen(true)}
        />
      )}

      <EmailModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        onSend={handleSendEmail}
        results={calculation || { rolls: 0, wallpaperArea: 0, wallArea: 0 }}
      />
    </div>
  );
}
