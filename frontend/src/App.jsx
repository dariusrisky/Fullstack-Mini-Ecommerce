import { Outlet } from "react-router-dom";
import NavbarComponent from "./components/NavbarComponent";

function App() {  
  return (
    <>
      <NavbarComponent />
        <Outlet />
    </>
  );
}

export default App;
