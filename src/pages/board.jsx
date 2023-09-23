import { useContext, useEffect, useState } from "react";
import { BoardContext } from "../contexts/BoardContext";
import axios from "axios";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

const Board = () => {
  const { boards, setBoards, isForm, setIsForm, currentId, setCurrentId } =
    useContext(BoardContext);
  const [input, setInput] = useState({
    board: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/boards", {
        headers: { Authorization: "Bearer " + Cookies.get("token") },
      })
      .then((res) => {
        setBoards([...res.data]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isForm, currentId]);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8000/api/boards/${id}`, {
        headers: { Authorization: "Bearer " + Cookies.get("token") },
      })
      .then((res) => {
        console.log(res.data.message);
        setCurrentId(0);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (currentId == 0) {
      axios
        .post("http://localhost:8000/api/boards", input, {
          headers: { Authorization: "Bearer " + Cookies.get("token") },
        })
        .then((res) => {
          console.log(res.data.message);
          setIsForm(false);
          setInput({ board: "" });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .put(`http://localhost:8000/api/boards/${currentId}`, input, {
          headers: { Authorization: "Bearer " + Cookies.get("token") },
        })
        .then((res) => {
          console.log(res.data.message);
          setIsForm(false);
          setCurrentId(0);
          setInput({ board: "" });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">Board</h2>
      {!isForm && (
        <>
          <button
            className="px-2 py-1 mb-3 text-xs font-medium text-white bg-green-600 border border-transparent rounded-md active:bg-green-600 hover:bg-green-700 focus:outline-none focus:shadow-outline-green"
            onClick={() => {
              setIsForm(true);
            }}
          >
            Add
          </button>
          <div className="grid grid-cols-3 grid-flow-row gap-2">
            {boards.map((board) => {
              return (
                <div
                  className="bg-white rounded-lg shadow-sm px-4 pt-2 pb-4"
                  key={board.id}
                >
                  <h1 className="uppercase font-bold mb-2">{board.board}</h1>
                  <Link
                    to={`/board/${board.id}`}
                    className="px-2 py-1 mr-1 text-xs font-medium text-white bg-indigo-600 border border-transparent rounded-md active:bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:shadow-outline-indigo"
                  >
                    Detail
                  </Link>
                  <button
                    className="px-2 py-1 mr-1 text-xs font-medium text-white bg-yellow-400 border border-transparent rounded-md active:bg-yellow-500 hover:bg-yellow-500 focus:outline-none focus:shadow-outline-yellow"
                    onClick={() => {
                      setIsForm(true);
                      setCurrentId(board.id);
                      setInput({ board: board.board });
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="px-2 py-1 mr-1 text-xs font-medium text-white bg-red-600 border border-transparent rounded-md active:bg-red-600 hover:bg-red-700 focus:outline-none focus:shadow-outline-red"
                    onClick={() => {
                      setCurrentId(board.id);
                      handleDelete(board.id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              );
            })}
          </div>
        </>
      )}
      {isForm && (
        <div className="grid grid-cols-1 grid-flow-col gap-2">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="board"
              value={input.board}
              onChange={(event) => {
                setInput({ board: event.target.value });
              }}
              className="mb-3 block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <button
              type="submit"
              className="px-2 py-1 mr-1 text-xs font-medium text-white bg-indigo-600 border border-transparent rounded-md active:bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:shadow-outline-indigo"
            >
              Submit
            </button>
            <button
              onClick={() => {
                setIsForm(false);
                setCurrentId(0);
                setInput({ board: "" });
              }}
              className="px-2 py-1 text-xs font-medium text-white bg-red-600 border border-transparent rounded-md active:bg-red-600 hover:bg-red-700 focus:outline-none focus:shadow-outline-red"
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Board;
