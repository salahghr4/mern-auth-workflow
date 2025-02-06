import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";

function App() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center  overflow-hidden relative">
      <Routes>
        <Route path="/" element={<Home />}
        />
      </Routes>
    </div>
  );
}

export default App;
