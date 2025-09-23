import { useNavigate } from "react-router-dom";
import { CalcButton } from "../СalcButton/CalcButton";
import styles from "./WelcomePage.module.css";

import magic_wand_icon from "../../assets/icons/magic-wand.svg"

export function WelcomePage() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/calc");
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Калькулятор обоев</h1>
        <p className={styles.text}>Онлайн-калькулятор расчета обоев по поможет вам определить число рулонов, требуемых для оклеивания, с учетом окон и дверей. Чтобы получить точные результаты, просто укажите параметры помещения и размеры в специальной таблице. Наша программа также берет в учет повторение рисунка (раппорт), что позволяет оптимизировать расходы на материалы и клей.</p>
        <CalcButton
          onClick={handleClick}
          icon={magic_wand_icon}
          iconAlt="Magic wand icon"
        >
          Начать расчет материалов
        </CalcButton>
      </div>
    </div>
  );
}
