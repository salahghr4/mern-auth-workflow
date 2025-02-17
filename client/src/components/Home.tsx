import useAuth from "../hooks/useAuth";
import Alert from "./Alert";
import Button from "./Button";

const Home = () => {
  const { user, logOut, isLoading } = useAuth();
  return (
    <div className="h-full justify-center items-center flex mt-30">
      <div className="bg-white p-5 rounded-2xl shadow-lg w-80 text-center flex flex-col justify-center items-center gap-7">
        {!user?.verified && (
          <Alert status="error">Please verify your email</Alert>
        )}
        <h1 className="text-xl font-bold text-gray-900">
          Welcome back{" "}
          <span className="text-cyan-500 underline">{user?.username}</span>
        </h1>
        <Button
          isLoading={isLoading}
          onClick={logOut}
        >
          Log out
        </Button>
      </div>
    </div>
  );
};

export default Home;
