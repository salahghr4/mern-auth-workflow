import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <div className="bg-white min-h-screen overflow-hidden bg-gradient-to-br from-cyan-500 to-light-blue-500">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/register" element={<RegisterPage />}/>
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
