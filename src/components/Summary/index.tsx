"use client";
import Image from "next/image";
import { useGlobal } from "@/src/hooks/useGlobal";
import { Cards } from "../Cards";
import styles from "./styles.module.scss";

export function Summary() {
  const { totalIncome, totalOutcome, total } = useGlobal();
  return (
    <div className={styles.container}>
      <Cards
        icon={
          <Image
            src="/assets/entradas.png"
            alt="Entrada"
            width={19}
            height={19}
          />
        }
        title="Entradas"
        value={totalIncome}
      />
      <Cards
        icon={
          <Image src="/assets/saida.png" alt="Saida" width={19} height={19} />
        }
        title="Saidas"
        value={totalOutcome}
      />
      <Cards title="Saldo Total" value={total} />
    </div>
  );
}
