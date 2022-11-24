import "bootstrap/dist/css/bootstrap.min.css"; //NOTE - BOOTSTRAP INIT
import { useSelector } from "react-redux";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import AppRouter from "./config/AppRouter";
function App() {
  const dataFromStore = useSelector((state) => state.loginReducer);
  console.log(dataFromStore);
  return (
    <>
      <AppRouter />
    </>
  );
}

export default App;
