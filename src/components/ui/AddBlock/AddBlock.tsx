import styles from "./AddBlock.module.css";

import art_board_icon from "../../../assets/icons/new-artboard.svg"

interface AddBlockProps {
  label: string;
  onClick?: () => void;
}

export function AddBlock({ label, onClick }: AddBlockProps) {
  return (
    <div className={styles.block} onClick={onClick} role="button" tabIndex={0}>
      <div className={styles.inner}>
        <div className={styles.icon}>
          <img src={art_board_icon} alt={label} />
        </div>
        <div className={styles.text}>{label}</div>
      </div>
    </div>
  );
}
