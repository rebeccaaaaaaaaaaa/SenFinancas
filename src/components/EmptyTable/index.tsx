import styles from "./styles.module.scss";

export function EmptyTableWarning() {
    return (
        <>
         <h1 className={styles.container}> Não há nada para mostrar. Adicione uma transação para iniciar o gerenciamento das suas finanças.</h1>
        </>
    )
}