import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import { AuthProvider } from "./context/AuthContext";
import ForgotPasswordPage from "./pages/ForgotPassword";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { VerifyEmailPage } from "./pages/VerifyEmailPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import PrivateRoutes from "./routes/PrivateRoutes";
import PublicRoutes from "./routes/PublicRoutes";

function App() {
  return (
    <AuthProvider>
      <div className="bg-white min-h-screen overflow-hidden bg-gradient-to-br from-cyan-950 ">
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route element={<PublicRoutes />}>
            <Route path="/login" element={<LoginPage />}/>
            <Route path="/register" element={<RegisterPage />}/>
            <Route path="/email/verify/:code" element={<VerifyEmailPage />}/>
            <Route path="/password/forgot" element={<ForgotPasswordPage/>}/>
            <Route path="/password/reset" element={<ResetPasswordPage />}/>
          </Route>
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
