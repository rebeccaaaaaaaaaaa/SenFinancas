import Image from "next/image";
import styles from "./styles.module.scss";

interface CardsProps {
  title: string;
  value: any;
  icon?: any;
  class?: React.CSSProperties;
}

export function Cards({ title, value, icon }: CardsProps) {
  return (
    <div>
      <div
        className={
          title === "Entradas"
            ? styles.card
            : title === "Saidas"
            ? styles.card
            : styles.cardSaldo
        }
      >
        <header
          className={
            title === "Entradas"
              ? styles.headerCard
              : title === "Saidas"
              ? styles.headerCard
              : styles.headerSaldo
          }
        >
          <h1 className={styles.headerCard_title}>{title}</h1>
          {icon}
        </header>
        <div>
          <strong
            className={
              title === "Entradas"
                ? styles.values
                : title === "Saidas"
                ? styles.values
                : styles.valuesSaldo
            }
          >
            {Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(value)}
          </strong>
        </div>
      </div>
    </div>
  );
}
