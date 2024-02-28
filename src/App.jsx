import { Route, Routes } from "react-router-dom";
import { AmvRoutes } from "./routes/AmvRoutes";
import { NavBarComponent } from "./components/header/NavBarComponent";
import { Login } from "./pages/Login";

function App() {
  return (
    <>
      <NavBarComponent />
      <Routes>
        <Route path="/*" element={<AmvRoutes />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/login" element={<Login />} />
      <Route path="/signUp" element={<SignUp />} /> */}
      </Routes>
    </>
  );
}

export default App;
