"use client";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useGlobal } from "@/src/hooks/useGlobal";

export function TableContent() {
  const { removeTransaction, transactions } = useGlobal();
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all"); // Estado para controlar a categoria do filtro

  const filteredTransactions = transactions.filter((item: { type: string; category: string; }) => {
    if (filterType === "all" || item.type === filterType) {
      // Se o tipo corresponder ou se todos forem selecionados, verifique a categoria
      return filterCategory === "all" || item.category === filterCategory;
    }
    return false;
  });

  const uniqueCategories = [...new Set(transactions.map((item: { category: string }) => item.category))]; // Obtém categorias únicas

  return (
    <div className={styles.container}>
      <div className={styles.filterButtons}>
        <button onClick={() => setFilterType("all")}>Todos</button>
        <button onClick={() => setFilterType("deposit")}>Entrada</button>
        <button onClick={() => setFilterType("withdraw")}>Saída</button>
      </div>
      <div className={styles.filterCategories}>
      <select
        value={filterCategory}
        onChange={event => setFilterCategory(event.target.value)}
      >
        <option value="all">Todas as categorias</option>
        {uniqueCategories.map((category: any, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>
      </div>
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

