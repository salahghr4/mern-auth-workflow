import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { AuthProvider } from "./context/AuthContext";
import { VerifyEmailPage } from "./pages/VerifyEmailPage";

function App() {
  return (
    <AuthProvider>
      <div className="bg-white min-h-screen overflow-hidden bg-gradient-to-br from-cyan-950 ">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/register" element={<RegisterPage />}/>
          <Route path="/email/verify/:code" element={<VerifyEmailPage />}/>
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
