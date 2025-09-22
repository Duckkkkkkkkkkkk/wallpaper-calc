import { useState, useEffect } from "react";
import styles from "./InputField.module.css";

interface InputFieldProps {
  id?: string;
  label?: string;
  placeholder?: string;
  value?: string | number;
  type?: string;
  onChange?: (value: string) => void;
  style?: React.CSSProperties;
}

export function InputField({ 
  id, 
  label, 
  placeholder, 
  value, 
  onChange,
  style
}: InputFieldProps) {
  const [displayValue, setDisplayValue] = useState("");

  useEffect(() => {
    if (value === undefined || value === "") {
      setDisplayValue("");
    } else {
      const stringValue = String(value);
      setDisplayValue(stringValue.replace(",", "."));
    }
  }, [value]);

  const hasValue = displayValue !== "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;
    
    inputValue = inputValue.replace(/[^\d.,-]/g, "");
    
    const normalizedValue = inputValue.replace(/,/g, ".");
    
    if (normalizedValue === "" || normalizedValue === "-" || /^-?\d*\.?\d*$/.test(normalizedValue)) {
      setDisplayValue(inputValue);
      onChange?.(normalizedValue);
    }
  };

  const handleBlur = () => {
    if (displayValue) {
      const normalized = displayValue.replace(/,/g, ".");
      setDisplayValue(normalized);
    }
  };

  return (
    <label className={styles.wrapper} htmlFor={id}>
      {label && <span className={styles.label}>{label}</span>}
      <input
        id={id}
        type="text"
        inputMode="decimal"
        className={`${styles.input} ${hasValue ? styles.filled : ""}`}
        placeholder={placeholder}
        value={displayValue}
        onChange={handleChange}
        onBlur={handleBlur}
        style={style}
      />
    </label>
  );
}