import SuperAdmin from "./pages/SuperAdmin/SuperAdmin";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/SuperAdmin/components/Dashboard";
import Users from "./pages/SuperAdmin/components/Users";


function App() {
  return (
    <div>
      <Routes>
        <Route path="/super-admin" element={<SuperAdmin />}>
          <Route path="dashboard" element={<Dashboard/>} />
          <Route path="users" element={<Users/>} />
          <Route path="remove" element={<h1>remove</h1>} />
          <Route path="edit" element={<h1>edit</h1>} />
        </Route>
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </div>
  );
}

export default App;
