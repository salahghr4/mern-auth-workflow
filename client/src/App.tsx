import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <div className="bg-white min-h-screen overflow-hidden ">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/register" element={<RegisterPage />}/>
      </Routes>
    </div>
  );
}

export default App;
