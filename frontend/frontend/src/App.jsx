import { useEffect } from "react";
import Home from "./components/Home";
import getCurrentUser from "../features/getCurrentuser";
import { useDispatch } from "react-redux";
import { setUserData } from "./redux/userSlice";


const App = () => {
  const dispatch = useDispatch()

useEffect(() => {
  const getuser = async () => {
    const data = await getCurrentUser();

    console.log("Fetched User:", data);

    dispatch(setUserData(data));
  };

  getuser();
}, []);

  return (
    <>
      <Home></Home>
    </>
  );
};

export default App;