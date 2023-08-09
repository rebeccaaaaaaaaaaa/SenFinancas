import Image from "next/image";
import Close from "../../../public/assets/close.svg";
import Income from "../../../public/assets/ENTRADA.svg";
import Outcome from "../../../public/assets/SAIDA.svg";
import { useGlobal } from "@/src/hooks/useGlobal";
import styles from "../Header/styles.module.scss";

export function Modal() {
  const {
    handleCloseModal,
    handleOpenModal,
    showModal,
    title,
    handleNameChange,
    amount,
    handleamountChange,
    type,
    handleTypeChange,
    category,
    handleCategoryChange,
    handleSubmit,
  } = useGlobal();
  return (
    <>
      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <button className={styles.close} onClick={handleCloseModal}>
              <Image src={Close} alt="Close" />
            </button>
            <h1 className={styles.contentTitle}> Cadastro transação</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Nome"
                value={title}
                onChange={handleNameChange}
              />
              <input
                type="number"
                placeholder="Preço"
                value={amount}
                onChange={handleamountChange}
              />
              <div className={styles.type}>
                <button
                  type="button"
                  className={
                    type === "deposit" ? styles.active : styles.inactive
                  }
                  name="income"
                  onClick={() => handleTypeChange("deposit")}
                >
                  <Image src={Income} alt="income" />
                  <span> Entrada </span>
                </button>
                <button
                  type="button"
                  className={
                    type === "withdraw" ? styles.active : styles.inactive
                  }
                  name="withdraw"
                  onClick={() => handleTypeChange("withdraw")}
                >
                  <Image src={Outcome} alt="Outcome" />
                  <span> Saída </span>
                </button>
              </div>
              <input
                type="text"
                placeholder="Categoria"
                value={category}
                onChange={handleCategoryChange}
              />
              <button type="submit" className={styles.buttonRegister}>
                Cadastrar
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
