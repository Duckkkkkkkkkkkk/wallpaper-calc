import styles from "./CalcResults.module.css";

import share_icon from "../../assets/icons/share.svg"

interface CalcResultsProps {
  rolls: number;
  wallpaperArea: number;
  wallArea: number;
  onReset: () => void;
  onGoToCatalog: () => void;
  onSendEmail: () => void;
}

export function CalcResults({ rolls, wallpaperArea, wallArea, onReset, onGoToCatalog, onSendEmail }: CalcResultsProps) {
  return (
    <section className={styles.results}>
      <div className={styles.inner}>
        <h3 className={styles.title}>Результаты</h3>

        <div className={styles.valuesRow}>
          <div className={styles.valueBlock}>
            <p className={styles.value}>{rolls}</p>
            <span className={styles.label}>Кол-во рулонов</span>
          </div>
          <div className={styles.valueBlock}>
            <p className={styles.value}>{wallpaperArea} м²</p>
            <span className={styles.label}>Кол-во m2 обоев</span>
          </div>
          <div className={styles.valueBlock}>
            <p className={styles.value}>{wallArea} м²</p>
            <span className={styles.label}>Площадь оклейки</span>
          </div>
        </div>

        <div className={styles.buttonsRow}>
          <button className={`${styles.button} ${styles.reset}`} onClick={onReset}>
            Сбросить параметры
          </button>
          <button className={`${styles.button} ${styles.catalog}`} onClick={onGoToCatalog}>
            Перейти в каталог
          </button>
          <button className={`${styles.button} ${styles.email}`} onClick={onSendEmail}>
            <img src={share_icon} alt="Поделиться" />
            Поделиться
          </button>
        </div>
      </div>
    </section>
  );
}
