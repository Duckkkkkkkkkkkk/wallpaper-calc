import { useState, useEffect } from "react";
import styles from "./OptionGroup.module.css";
import { OptionPill } from "../OptionPill/OptionPill";

interface OptionGroupProps {
  title: string;
  options: string[];
  widths?: {
    desktop: number[];
    mobile: number[];
  };
  defaultValue?: string;
  onChange?: (value: string) => void;
}

export function OptionGroup({ title, options, widths, defaultValue, onChange }: OptionGroupProps) {
  const [selected, setSelected] = useState(defaultValue ?? options[0]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth <= 480);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  const currentWidths = isMobile ? widths?.mobile : widths?.desktop;

  const handleSelect = (value: string) => {
    setSelected(value);
    onChange?.(value);
  };

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.pills}>
        {options.map((o, i) => (
          <OptionPill
            key={o}
            value={o}
            selected={o === selected}
            onClick={() => handleSelect(o)}
            style={{ width: currentWidths?.[i] ? `${currentWidths[i]}px` : "auto" }}
          />
        ))}
      </div>
    </div>
  );
}
