/* eslint-disable @next/next/no-img-element */
"use client";
import { Filters } from "../Filters/index,";
import styles from "./styles.module.scss";
import { useGlobal } from "@/src/hooks/useGlobal";


export function TableContent() {
  const { removeTransaction, filteredTransactions } = useGlobal();
  return (
    <div className={styles.container}>
      <Filters />
      <table className={styles.table}>
        <thead>
          <tr className={styles.trHead}>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map((item: any, index: number) => (
            <tr className={styles.trBody} key={index}>
              <td className={styles.pl_16}>{item.title}</td>
              <td
                className={
                  item.type === "deposit" ? styles.deposit : styles.withdraw
                }
              >
                R$ {item.amount}
              </td>
              <td>{item.category}</td>
              <td>{item.date}</td>
              <td
                className={styles.deleteButton}
                onClick={() => {
                  removeTransaction(item.id);
                  console.log(item.id);
                }}
              >
                <img src="/assets/delete.png" alt="Excluir transação" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

