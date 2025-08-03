import { Outlet } from "react-router-dom";
import NavbarComponent from "./components/NavbarComponent";

function App() {
  console.log(import.meta.env.VITE_API_URL);
  
  return (
    <>
      <NavbarComponent />
        <Outlet />
    </>
  );
}

export default App;
