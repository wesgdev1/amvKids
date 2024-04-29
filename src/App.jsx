import { Route, Routes } from "react-router-dom";
import { AmvRoutes } from "./routes/AmvRoutes";
import { NavBarComponent } from "./components/header/NavBarComponent";
import { Login } from "./pages/Login";
import { Footer } from "./components/footer/Footer";
import { SignUp } from "./pages/SignUp";

function App() {
  return (
    <>
      <NavBarComponent />
      <Routes>
        <Route path="/*" element={<AmvRoutes />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
