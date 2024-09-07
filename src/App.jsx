import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/layout/Layout";
import Home from "./pages/Home/Home";
import User from "./pages/Home/User";
import AddTask from "./pages/Home/AddTask";
import AddUser from "./pages/Home/AddUser";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/detailUser/:user_id" element={<User />} />
          <Route path="/newTask/:user_id" element={<AddTask />} />
          <Route path="/addUser" element={<AddUser />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
