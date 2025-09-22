import { useState } from "react";
import styles from "./OptionGroup.module.css";
import { OptionPill } from "../OptionPill/OptionPill";

interface OptionGroupProps {
  title: string;
  options: string[];
  widths?: number[];
  defaultValue?: string;
  onChange?: (value: string) => void;
}

export function OptionGroup({ title, options, widths, defaultValue, onChange }: OptionGroupProps) {
  const [selected, setSelected] = useState(defaultValue ?? options[0]);

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
            style={{ width: widths?.[i] ? `${widths[i]}px` : 'auto' }}
          />
        ))}
      </div>
    </div>
  );
}
