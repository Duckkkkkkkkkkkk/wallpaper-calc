import styles from "./CalcButton.module.css";

interface CalcButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  icon?: string;
  iconAlt?: string;
}

export function CalcButton({ onClick, children, icon, iconAlt }: CalcButtonProps) {
  return (
    <button className={styles.button} onClick={onClick}>
      {icon && <img src={icon} alt={iconAlt} className={styles.icon} />}
      {children}
    </button>
  );
}
