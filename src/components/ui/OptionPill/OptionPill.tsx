import styles from "./OptionPill.module.css";

interface OptionPillProps {
  id?: string;
  value: string;
  selected?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export function OptionPill({ id, value, selected = false, onClick, style }: OptionPillProps) {
  return (
    <button
      id={id}
      type="button"
      className={`${styles.pill} ${selected ? styles.active : ""}`}
      onClick={onClick}
      style={style}
    >
      {value}
    </button>
  );
}