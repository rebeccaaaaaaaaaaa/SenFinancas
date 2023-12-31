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

  editTransaction: (id: string, newTitle: string, newCategory: string, newAmount: string) => void;
  handleEditSubmit: () => void;
  handleEditClick: (transaction: Transaction) => void
  editedTransaction: Transaction | null
  editedTitle: string
  editedCategory: string
  setEditedTitle: React.Dispatch<React.SetStateAction<string>>
  setEditedCategory: React.Dispatch<React.SetStateAction<string>>
  editedAmount: string
  setEditedAmount: React.Dispatch<React.SetStateAction<string>>
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
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const storedTransactions = localStorage.getItem("transactions");
    const initialData: Transaction[] = [
      {
        id: "1",
        title: "Transação de exemplo",
        amount: "100",
        type: "deposit",
        category: "Categoria Genérica",
        date: "29/12/2022",
      },
    ];

    const initialTransactions: Transaction[] = storedTransactions
      ? JSON.parse(storedTransactions)
      : initialData;

    setTransactions(initialTransactions);
  }, []); // Executado apenas quando o componente é montado

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

  function editTransaction(id: string, newTitle: string, newCategory: string, newAmount: string) {
    const updatedTransactions = transactions.map((transaction) => {
      if (transaction.id === id) {
        return {
          ...transaction,
          title: newTitle,
          category: newCategory,
          amount: newAmount
        };
      }
      return transaction;
    });

    setTransactions(updatedTransactions);
    localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
  }

  // edit

  // State to track edited transaction
  const [editedTransaction, setEditedTransaction] =
    useState<Transaction | null>(null);

  // State for temporary input values
  const [editedTitle, setEditedTitle] = useState("");
  const [editedCategory, setEditedCategory] = useState("");
  const [editedAmount, setEditedAmount] = useState("");

  const handleEditClick = (transaction: Transaction) => {
    setEditedTransaction(transaction);
    setEditedTitle(transaction.title); // Initialize the input with the current title
    setEditedCategory(transaction.category); // Initialize the input with the current category
    setEditedAmount(transaction.amount)
  };

  const handleEditSubmit = () => {
    if (editedTransaction) {
      editTransaction(editedTransaction.id, editedTitle, editedCategory, editedAmount);
      setEditedTransaction(null);
    }
  };

  // filters
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all"); // Estado para controlar a categoria do filtro

  const filteredTransactions = transactions.filter(
    (item: { type: string; category: string }) => {
      if (filterType === "all" || item.type === filterType) {
        // Se o tipo corresponder ou se todos forem selecionados, verifique a categoria
        return filterCategory === "all" || item.category === filterCategory;
      }
      return false;
    }
  );

  const uniqueCategories = [
    ...new Set(transactions.map((item: { category: string }) => item.category)),
  ]; // Obtém categorias únicas

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
        editTransaction,
        editedCategory,
        editedTitle,
        editedTransaction,
        handleEditClick,
        handleEditSubmit,
        setEditedCategory,
        setEditedTitle,
        editedAmount,
        setEditedAmount
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
