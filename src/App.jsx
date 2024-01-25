import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Sitio en Construcción</h1>
      <img
        src="https://res.cloudinary.com/dppqkypts/image/upload/v1706219895/AMV_LOGO_w8oxo5.png"
        alt=""
        style={{ width: "50%", height: "50%" }}
      />
    </>
  );
}

export default App;
