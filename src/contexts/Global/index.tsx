"use client";
import moment from "moment";
import "moment/locale/pt-br"; // import the pt-br locale
moment.locale("pt-br"); // set the locale to pt-br

import { createContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface GlobalContextData {
  transactions: Transaction[];
  addTransaction: (newTransaction: Transaction) => void;
  removeTransaction: (id: string) => void;
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
  
  filterType: string;
  setFilterType: React.Dispatch<React.SetStateAction<string>>;
  filterCategory: string;
  setFilterCategory: React.Dispatch<React.SetStateAction<string>>;
  filteredTransactions: Transaction[];
  uniqueCategories: string[];
}

interface Transaction {
  id: string;
  title: string;
  amount: string;
  type: string;
  category: string;
  date: string;
}

interface GlobalProviderProps {
  children: React.ReactNode;
}

// create a context for share data between components
export const GlobalContext = createContext({} as GlobalContextData);

// create a provider for share data between components
export function GlobalProvider({ children }: GlobalProviderProps) {
  const storedTransactions = localStorage.getItem("transactions");
  const initialTransactions: Transaction[] = storedTransactions
    ? JSON.parse(storedTransactions)
    : [];

  const [transactions, setTransactions] = useState<Transaction[]>(
    initialTransactions
  );

  function addTransaction(newTransaction: Transaction) {
    const updatedTransactions = [...transactions, newTransaction];
    setTransactions(updatedTransactions);
    localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
  }

  function removeTransaction(id: string) {
    const updatedTransactions = transactions.filter(
      (transaction) => transaction.id !== id
    );
    setTransactions(updatedTransactions);
    localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
  }

  // filters
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
        filterType,
        setFilterType,
        filterCategory,
        setFilterCategory,
        filteredTransactions,
        uniqueCategories,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
