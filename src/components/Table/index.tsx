/* eslint-disable @next/next/no-img-element */
"use client";
import { Filters } from "../Filters/index,";
import { useGlobal } from "@/src/hooks/useGlobal";
import { EmptyTableWarning } from "../EmptyTable";
import styles from "./styles.module.scss";

export function TableContent() {
  const { removeTransaction, 
          filteredTransactions, 
          editedTransaction, 
          editedTitle, 
          editedCategory,
          setEditedTitle,
          setEditedCategory,
          handleEditSubmit,
          handleEditClick,
          editedAmount,
          setEditedAmount
  } = useGlobal();
  return (
    <div className={styles.container}>
      <Filters />
      {
        filteredTransactions.length === 0 ? (
          <EmptyTableWarning />
        ) : (
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
            {
              filteredTransactions.map((item: any, index: number) => (
                <tr className={styles.trBody} key={index}>
                  <td className={styles.pl_16}>
                      {/* Show input field when transaction is being edited */}
                      {editedTransaction && editedTransaction.id === item.id ? (
                        <input
                          type="text"
                          value={editedTitle}
                          onChange={(e) => setEditedTitle(e.target.value)}
                        />
                      ) : (
                        item.title
                      )}
                    </td>
                  <td
                    className={
                      item.type === "deposit" ? styles.deposit : styles.withdraw
                    }
                  >
                   {/* Show input field when transaction is being edited */}
                   {editedTransaction && editedTransaction.id === item.id ? (
                        <input
                          type="text"
                          value={editedAmount}
                          onChange={(e) => setEditedAmount(e.target.value)}
                        />
                      ) : (
                        <> 
                         R$ {item.amount}
                        </>
                      )}
                  </td>
                  <td>
                      {/* Show input field when transaction is being edited */}
                      {editedTransaction && editedTransaction.id === item.id ? (
                        <input
                          type="text"
                          value={editedCategory}
                          onChange={(e) => setEditedCategory(e.target.value)}
                        />
                      ) : (
                        item.category
                      )}
                    </td>
                  <td>{item.date}</td>
                  <td className={styles.editButton}>
                      {editedTransaction && editedTransaction.id === item.id ? (
                        <div style={{ cursor: "pointer"}} onClick={() => {
                          handleEditSubmit()
                        }}>
                          <img src="/assets/ok.png" alt="Editar transação" width="16px" />
                        </div>
                      ) : (
                        <div style={{ cursor: "pointer"}}  onClick={() => handleEditClick(item)}>
                          <img src="/assets/edit.png" alt="Editar transação" width="16px" />
                        </div>
                      )}
                    </td>
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
              ))
            }
          </tbody>
        </table>
        )
      }
    </div>
  );
}
