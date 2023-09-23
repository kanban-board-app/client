import { createContext, useState } from "react";

export const BoardContext = createContext();

export const BoardProvider = ({ children }) => {
  const [boards, setBoards] = useState([]);
  const [board, setBoard] = useState({});
  const [isForm, setIsForm] = useState(false);
  const [currentId, setCurrentId] = useState(0);

  const values = {
    boards,
    setBoards,
    board,
    setBoard,
    isForm,
    setIsForm,
    currentId,
    setCurrentId,
  };
  return (
    <BoardContext.Provider value={values}>{children}</BoardContext.Provider>
  );
};
