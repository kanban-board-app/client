import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BoardContext } from "../contexts/BoardContext";
import Cookies from "js-cookie";
import axios from "axios";

const BoardDetail = () => {
  const { board, setBoard } = useContext(BoardContext);
  const { boardId } = useParams();
  const [isForm, setIsForm] = useState(false);
  const [input, setInput] = useState({
    group: "",
  });

  const [task, setTask] = useState({
    task: "",
    description: "",
    status: "progress",
  });

  const [currentId, setCurrentId] = useState(0);
  const [groupId, setGroupId] = useState(0);

  const [isTask, setIsTask] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/boards/${boardId}`, {
        headers: {
          authorization: "Bearer " + Cookies.get("token"),
        },
      })
      .then((res) => {
        setBoard({ ...res.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isForm, currentId, isTask]);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (currentId == 0) {
      axios
        .post(`http://localhost:8000/api/boards/${boardId}/group`, input, {
          headers: { Authorization: "Bearer " + Cookies.get("token") },
        })
        .then((res) => {
          console.log(res.data.message);
          setIsForm(false);
          setInput({ group: "" });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .put(
          `http://localhost:8000/api/boards/${boardId}/group/${currentId}`,
          input,
          {
            headers: { Authorization: "Bearer " + Cookies.get("token") },
          }
        )
        .then((res) => {
          console.log(res.data.message);
          setIsForm(false);
          setCurrentId(0);
          setInput({ group: "" });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8000/api/boards/${boardId}/group/${id}`, {
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

  const handleDeleteTask = (group, id) => {
    axios
      .delete(`http://localhost:8000/api/groups/${group}/task/${id}`, {
        headers: { Authorization: "Bearer " + Cookies.get("token") },
      })
      .then((res) => {
        console.log(res.data.message);
        setCurrentId(0);
        setGroupId(0);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmitTask = (event) => {
    event.preventDefault();
    if (currentId === 0) {
      axios
        .post(`http://localhost:8000/api/groups/${groupId}/task`, task, {
          headers: { Authorization: "Bearer " + Cookies.get("token") },
        })
        .then((res) => {
          console.log(res.data.message);
          setTask({ task: "", description: "", status: "progress" });
          setIsTask(false);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .put(
          `http://localhost:8000/api/groups/${groupId}/task/${currentId}`,
          task,
          {
            headers: { Authorization: "Bearer " + Cookies.get("token") },
          }
        )
        .then((res) => {
          console.log(res.data.message);
          setTask({ task: "", description: "", status: "progress" });
          setIsTask(false);
          setCurrentId(0);
          setGroupId(0);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">
        {board.board} Board
      </h2>
      {!isForm && (
        <button
          className="px-2 py-1 mb-3 text-xs font-medium text-white bg-green-600 border border-transparent rounded-md active:bg-green-600 hover:bg-green-700 focus:outline-none focus:shadow-outline-green"
          onClick={() => {
            setIsForm(true);
          }}
        >
          Add Group
        </button>
      )}
      {isTask && (
        <div className="bg-gray-200 rounded-lg shadow-sm px-4 pt-4 pb-4 mb-4">
          <form onSubmit={handleSubmitTask}>
            <input
              type="text"
              name="task"
              value={task.task}
              onChange={handleChange}
              className="mb-3 block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
              placeholder="Task"
            />
            <input
              type="text"
              name="description"
              value={task.description}
              onChange={handleChange}
              className="mb-3 block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
              placeholder="Description"
            />
            <button
              type="submit"
              className="px-2 py-1 mr-1 text-xs font-medium text-white bg-indigo-600 border border-transparent rounded-md active:bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:shadow-outline-indigo"
            >
              Submit
            </button>
            <button
              onClick={() => {
                setIsTask(false);
                setGroupId(0);
                setTask({
                  task: "",
                  description: "",
                  status: "progress",
                });
              }}
              className="px-2 py-1 text-xs font-medium text-white bg-red-600 border border-transparent rounded-md active:bg-red-600 hover:bg-red-700 focus:outline-none focus:shadow-outline-red"
            >
              Cancel
            </button>
          </form>
        </div>
      )}
      {isForm && (
        <div className="grid grid-cols-1 grid-flow-col gap-2">
          <div className="bg-white rounded-lg shadow-sm px-4 pt-4 pb-4 mb-4">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="board"
                value={input.group}
                onChange={(event) => {
                  setInput({ group: event.target.value });
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
                  setInput({ group: "" });
                }}
                className="px-2 py-1 text-xs font-medium text-white bg-red-600 border border-transparent rounded-md active:bg-red-600 hover:bg-red-700 focus:outline-none focus:shadow-outline-red"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
      <div className="grid grid-cols-3 grid-flow-row gap-2">
        {board.Groups?.map((group) => {
          return (
            <div
              className="bg-white rounded-lg shadow-sm px-4 pt-2 pb-4"
              key={group.id}
            >
              <div className="flex gap-1 items-center mb-2">
                <h1 className="uppercase font-bold mb-2">{group.group}</h1>
                <button
                  className="px-2 py-1 text-xs font-medium text-white bg-yellow-400 border border-transparent rounded-md active:bg-yellow-500 hover:bg-yellow-500 focus:outline-none focus:shadow-outline-yellow"
                  onClick={() => {
                    setIsForm(true);
                    setCurrentId(group.id);
                    setInput({ group: group.group });
                  }}
                >
                  Edit
                </button>
                <button
                  className="px-2 py-1 text-xs font-medium text-white bg-red-600 border border-transparent rounded-md active:bg-red-600 hover:bg-red-700 focus:outline-none focus:shadow-outline-red"
                  onClick={() => {
                    setCurrentId(group.id);
                    handleDelete(group.id);
                  }}
                >
                  Delete
                </button>
              </div>
              {group.Tasks?.map((task) => {
                return (
                  <div
                    className="bg-gray-100 rounded-lg shadow-sm px-4 pt-2 pb-4 mb-2"
                    key={task.id}
                  >
                    <h1 className="font-bold">{task.task}</h1>
                    <p className="text-xs">{task.description}</p>
                    <button
                      className="px-2 py-1 mr-1 text-xs font-medium text-white bg-yellow-400 border border-transparent rounded-md active:bg-yellow-500 hover:bg-yellow-500 focus:outline-none focus:shadow-outline-yellow"
                      onClick={() => {
                        setIsTask(true);
                        setCurrentId(task.id);
                        setGroupId(group.id);
                        setTask({
                          task: task.task,
                          description: task.description,
                          status: "progress",
                        });
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="px-2 py-1 text-xs font-medium text-white bg-red-600 border border-transparent rounded-md active:bg-red-600 hover:bg-red-700 focus:outline-none focus:shadow-outline-red"
                      onClick={() => {
                        setCurrentId(task.id);
                        setGroupId(group.id);
                        handleDeleteTask(group.id, task.id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                );
              })}
              {!isTask && (
                <button
                  className="px-2 py-1 mb-3 text-xs font-medium text-white bg-green-600 border border-transparent rounded-md active:bg-green-600 hover:bg-green-700 focus:outline-none focus:shadow-outline-green"
                  onClick={() => {
                    setIsTask(true);
                    setGroupId(group.id);
                  }}
                >
                  Add Task
                </button>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default BoardDetail;
