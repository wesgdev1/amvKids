import { useContext } from "react";
import { AuthContext } from "../../auth/context/AuthContext";
import { ButtonCardStyled, ButtonStyled } from "../StyledComponents";
import { ButtonProfile } from "../products/StyledComponents";
import { useNavigate } from "react-router-dom";

export const SideMeny = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const cerrarsesion = () => {
    logout();
  };

  return (
    user && (
      <div className="text-white bg-slate-500 p-10 rounded-lg absolute top-32 right-10 z-10 w-[300px] shadow-2xl ">
        <div className="flex flex-col justify-center items-center gap-3 mb-10">
          <img
            src={
              user?.urlFoto ||
              "https://res.cloudinary.com/dppqkypts/image/upload/v1700685111/david_sanchez_oigkwg.png"
            }
            alt="Nombre de usuario"
            className=" w-16 h-16 rounded-full border-2 border-gray-300 hover:border-gray-500 cursor-pointer"
          />
          <span className="text-2xl">{user.name}</span>

          {/* <ButtonCardStyled>Gestionar Perfil </ButtonCardStyled> */}
        </div>
        <hr />
        <span
          onClick={() => {
            navigate("/profile");
          }}
          className="cursor-pointer hover:text-blue-800 hover:text-xl"
        >
          Mi perfil
        </span>
        <hr />

        <span
          className="cursor-pointer hover:text-blue-800 hover:text-xl"
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
