import { useState } from "react";
import "./App.css";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Invoices from "./components/Invoices";
function App() {
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login setUser={setUser} />}></Route>
        <Route
          path="/invoices"
          element={
            user ? <Invoices user={user} /> : <Login setUser={setUser} />
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
