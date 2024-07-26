import { useContext } from "react";
import { AuthContext } from "../../auth/context/AuthContext";
import { ButtonStyled } from "../StyledComponents";

export const SideMeny = () => {
  const { user, logout } = useContext(AuthContext);

  const cerrarsesion = () => {
    logout();
  };

  return (
    user && (
      <div className="text-white bg-slate-500 p-10 rounded-lg absolute top-32 right-10 z-10 w-[300px] shadow-2xl ">
        <div className="flex flex-col justify-center items-center gap-3 mb-10">
          <span>{user?.name}</span>
          <img
            src={
              user?.urlFoto ||
              "https://res.cloudinary.com/dppqkypts/image/upload/v1700685111/david_sanchez_oigkwg.png"
            }
            alt="Nombre de usuario"
            className=" w-16 h-16 rounded-full border-2 border-gray-300 hover:border-gray-500 cursor-pointer"
          />
          <span className="text-2xl">{user.name}</span>

          <ButtonStyled>Gestionar Perfil </ButtonStyled>
        </div>
        <hr />
        <span>Mi perfil</span>
        <hr />
        <span>Mis pedidos</span>
        <hr />
        <span
          onClick={() => {
            cerrarsesion();
          }}
        >
          Cerrar sesion
        </span>
      </div>
    )
  );
};
