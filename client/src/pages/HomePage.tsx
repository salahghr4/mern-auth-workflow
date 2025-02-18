import Home from "../components/Home";
import useAuth from "../hooks/useAuth";

const HomePage = () => {
  const { isLoading } = useAuth();
  return isLoading ? <h1 className="text-2xl animate-pulse">Loading ....</h1>: <Home />;
};

export default HomePage;
