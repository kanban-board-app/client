import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Board from "./pages/board";
import Layout from "./components/Layout";
import { BoardProvider } from "./contexts/BoardContext";
import BoardDetail from "./pages/board-detail";

export default function App() {
  return (
    <Router>
      <BoardProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/board"
            element={
              <Layout>
                <Board />
              </Layout>
            }
          />
          <Route
            path="/board/:boardId"
            element={
              <Layout>
                <BoardDetail />
              </Layout>
            }
          />
        </Routes>
      </BoardProvider>
    </Router>
  );
}
