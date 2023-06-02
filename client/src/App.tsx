import SuperAdmin from "./pages/SuperAdmin/SuperAdmin";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/SuperAdmin/components/Dashboard";
import Users from "./pages/SuperAdmin/components/Users";
import ErrorBoundary from "./components/ErrorBoundary";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <div>
      <ToastContainer />
      <Provider store={store}>
        <Routes>
          <Route path="/super-admin" element={<SuperAdmin />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route
              path="users"
              element={
                <ErrorBoundary>
                  {" "}
                  <Users />
                </ErrorBoundary>
              }
            />
            <Route path="remove" element={<h1>remove</h1>} />
            <Route path="edit" element={<h1>edit</h1>} />
          </Route>
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </Provider>
    </div>
  );
}

export default App;
