"use client";
import moment from "moment";
import "moment/locale/pt-br"; // import the pt-br locale
moment.locale("pt-br"); // set the locale to pt-br

import { createContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface GlobalContextData {
  transactions: any;
  addTransaction: (newTransaction: any) => void;
  removeTransaction: (id: any) => void;
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
  title: string;
  amount: string;
  type: string;
  category: string;
  handleNameChange: (event: any) => void;
  handleamountChange: (event: any) => void;
  handleTypeChange: any;
  handleCategoryChange: (event: any) => void;
  handleSubmit: (event: { preventDefault: () => void }) => void;

  totalIncome: number;
  totalOutcome: number;
  total: number;
}

interface GlobalProviderProps {
  children: React.ReactNode;
}

// create a context for share data between components
export const GlobalContext = createContext({} as GlobalContextData);

// create a provider for share data between components
export function GlobalProvider({ children }: GlobalProviderProps) {
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      title: "Desenvolvimento de website",
      type: "deposit",
      category: "Venda",
      amount: 5000,
      date: "13/04/2021 às 14:30",
    },
    {
      id: 2,
      title: "Hamburgueria Pizzy",
      type: "withdraw",
      category: "Alimentação",
      amount: 59,
      date: "10/04/2021 às 14:30",
    },
  ]);

  function addTransaction(newTransaction: any) {
    setTransactions([...transactions, newTransaction]);
  }

  function removeTransaction(id: any) {
    setTransactions(
      transactions.filter((transaction: { id: any }) => transaction.id !== id)
    );
  }

  // modal
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setTitle("");
    setAmount("");
    setType("");
    setCategory("");
  };

  // inset new transaction
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");

  const handleNameChange = (event: any) => {
    setTitle(event.target.value);
  };

  const handleamountChange = (event: any) => {
    setAmount(event.target.value);
  };

  const handleTypeChange = (type: string) => {
    setType(type);
  };

  const handleCategoryChange = (event: any) => {
    setCategory(event.target.value);
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const transaction = {
      id: uuidv4(),
      title,
      amount,
      type,
      category,
      date: moment().format("l") + " às " + moment().format("LT"),
    };
    addTransaction(transaction);
    handleCloseModal();
  };

  // summary

  const totalIncome = transactions.reduce((acc: number, transaction: any) => {
    if (transaction.type === "deposit") {
      return acc + Number(transaction.amount);
    }
    return acc;
  }, 0);

  const totalOutcome = transactions.reduce((acc: number, transaction: any) => {
    if (transaction.type === "withdraw") {
      return acc + Number(transaction.amount);
    }
    return acc;
  }, 0);

  const total = totalIncome - totalOutcome;

  useEffect(() => {
    console.log(transactions);
  }, [transactions]);

  return (
    <GlobalContext.Provider
      value={{
        transactions,
        addTransaction,
        removeTransaction,
        showModal,
        setShowModal,
        handleOpenModal,
        handleCloseModal,
        title,
        amount,
        type,
        category,
        handleNameChange,
        handleamountChange,
        handleTypeChange,
        handleCategoryChange,
        handleSubmit,
        totalIncome,
        totalOutcome,
        total,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
