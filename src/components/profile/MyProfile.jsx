import { useState } from "react";
import DatosPersonales from "./DatosPersonales";
import Contrasena from "./Contrasena";
import FotoPerfil from "./FotoPerfil";

export const MyProfile = () => {
  const [activeTab, setActiveTab] = useState("datos");

  const renderContent = () => {
    switch (activeTab) {
      case "datos":
        return <DatosPersonales />;
      case "contraseña":
        return <Contrasena />;
      case "foto":
        return <FotoPerfil />;
      default:
        return null;
    }
  };

  return (
    <div className="pt-5 px-4">
      <h4 className="pb-3">
        <i className="bi bi-person-square"></i> Mi perfil
      </h4>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "datos" ? "active" : ""}`}
            onClick={() => setActiveTab("datos")}
          >
            Mis datos personales
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "contraseña" ? "active" : ""}`}
            onClick={() => setActiveTab("contraseña")}
          >
            Mi contraseña
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "foto" ? "active" : ""}`}
            onClick={() => setActiveTab("foto")}
          >
            Foto de perfil
          </button>
        </li>
      </ul>
      <div className="tab-content pt-3">{renderContent()}</div>
    </div>
  );
};
