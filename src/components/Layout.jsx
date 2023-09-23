import { Link } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <>
      <div className="flex h-screen bg-gray-100">
        <aside className="z-20 hidden w-64 overflow-y-auto bg-white md:block flex-shrink-0">
          <div className="py-4 text-gray-500">
            <a className="ml-6 text-lg font-bold text-gray-800" href="#">
              Kanban Board
            </a>
            <ul className="mt-6">
              <li className="relative px-2">
                <Link
                  className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800"
                  to="/board"
                >
                  <span className="ml-4">Board</span>
                </Link>
              </li>
            </ul>
          </div>
        </aside>
        <main className="h-full w-full pb-16 px-6 mt-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </>
  );
};

export default Layout;
