import { useState } from "react";
import DatosPersonales from "./DatosPersonales";
import Contrasena from "./Contrasena";
import FotoPerfil from "./FotoPerfil";
import {
  ProfileContainer,
  ProfileHeader,
  ProfileTabsContainer,
  ProfileTab,
  ProfileContent,
} from "./StyledComponentes";

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
      <ProfileContainer>
        <ProfileHeader>
          <i className="bi bi-person-circle"></i>
          <h4>Mi Perfil</h4>
        </ProfileHeader>

        <ProfileTabsContainer>
          <ProfileTab
            active={activeTab === "datos"}
            onClick={() => setActiveTab("datos")}
          >
            <i className="bi bi-person me-2"></i>
            Datos Personales
          </ProfileTab>

          <ProfileTab
            active={activeTab === "contraseña"}
            onClick={() => setActiveTab("contraseña")}
          >
            <i className="bi bi-lock me-2"></i>
            Contraseña
          </ProfileTab>

          <ProfileTab
            active={activeTab === "foto"}
            onClick={() => setActiveTab("foto")}
          >
            <i className="bi bi-camera me-2"></i>
            Foto de Perfil
          </ProfileTab>
        </ProfileTabsContainer>

        <ProfileContent>{renderContent()}</ProfileContent>
      </ProfileContainer>
    </div>
  );
};
