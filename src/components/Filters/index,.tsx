import { useGlobal } from "@/src/hooks/useGlobal";
import styles from "./styles.module.scss";

export function Filters() {
  const { filterCategory, setFilterCategory, setFilterType, uniqueCategories } = useGlobal();

  return (
    <div className={styles.filterContainer}>
      <div className={styles.filterButtons}>
        <button
          className={styles.filterType === "all" ? styles.active : ""}
          onClick={() => setFilterType("all")}
        >
          Todos
        </button>
        <button
          className={styles.filterType === "deposit" ? styles.active : ""}
          onClick={() => setFilterType("deposit")}
        >
          Entrada
        </button>
        <button
          className={styles.filterType === "withdraw" ? styles.active : ""}
          onClick={() => setFilterType("withdraw")}
        >
          Saída
        </button>
      </div>
      <div className={styles.filterCategories}>
        <select
          value={filterCategory}
          onChange={(event) => setFilterCategory(event.target.value)}
        >
          <option value="all">Todas as categorias</option>
          {uniqueCategories.map((category: any, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
