"use client";
import Image from "next/image";
import Logo from "../../../public/assets/logo.svg";
import styles from "./styles.module.scss";
import { useGlobal } from "@/src/hooks/useGlobal";
import { Modal } from "../Modal";

export function Header() {
  const { handleOpenModal } = useGlobal();

  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <Image src={Logo} alt="Logo" />
          <button className={styles.button} onClick={handleOpenModal}>
            NOVA TRANSAÇÃO
          </button>
          <Modal />
        </div>
      </div>
    </>
  );
}
