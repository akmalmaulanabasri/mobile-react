import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/layout/Layout";
import Login from "./pages/Login";
import Home from "./pages/Home/Home";
import Index from "./pages/Order/Index";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {!sessionStorage.getItem("auth_token") ? (
            <Route index element={<Login />} />
          ) : (
            <Route index element={<Home />} />
          )}
          <Route path="/order" element={<Index />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
