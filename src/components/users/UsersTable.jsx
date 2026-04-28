import { useState } from "react";
import { Badge, Image, Table, OverlayTrigger, Popover } from "react-bootstrap";
import PropTypes from "prop-types";

import { useNavigate } from "react-router-dom";
import { Paginator } from "../paginator/Paginator";
import { ControlButton } from "../products/StyledComponents";
import Swal from "sweetalert2";
import { editUser } from "../../api/users/users";

const AVATAR_GRADIENTS = [
  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
  "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
  "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
  "linear-gradient(135deg, #f77062 0%, #fe5196 100%)",
  "linear-gradient(135deg, #0fd850 0%, #f9f047 100%)",
];

const getAvatarGradient = (name) => {
  const idx = name ? name.charCodeAt(0) % AVATAR_GRADIENTS.length : 0;
  return AVATAR_GRADIENTS[idx];
};

const UserAvatar = ({ name, size = 30 }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: "50%",
      background: getAvatarGradient(name),
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#fff",
      fontWeight: "700",
      fontSize: size * 0.38,
      cursor: "pointer",
      boxShadow: "0 3px 10px rgba(0,0,0,0.22)",
      border: "2px solid rgba(255,255,255,0.85)",
      userSelect: "none",
      letterSpacing: "0.5px",
      flexShrink: 0,
    }}
  >
    {name ? name.charAt(0).toUpperCase() : "?"}
  </div>
);

export const UsersTable = ({ users, cargarUsuarios }) => {
  const [productosBypage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const totalProductos = users.length;
  const lastIndex = currentPage * productosBypage;
  const firstIndex = lastIndex - productosBypage;
  const navigate = useNavigate();

  const viewOrdersByUser = (user) => {
    navigate(`/profile/users/${user.id}/orders`);
  };

  const updateUser = (user) => {
    Swal.fire({
      title: "¿Estas seguro?",
      text: `¿Quieres ${user.state ? "bloquear" : "desbloquear"} al usuario ${
        user.name
      }?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await editUser(user.id, {
          state: !user.state,
        });

        if (response.status === 200) {
          Swal.fire(
            "Usuario Actualizado!",
            `El usuario ${user.name} ha sido ${
              user.state ? "bloqueado" : "desbloqueado"
            }`,
            "success"
          );
          cargarUsuarios();
        } else {
          Swal.fire(
            "Error!",
            "Hubo un error al actualizar los datos del usuario.",
            "error"
          );
        }
      }
    });
  };
  return (
    <div className="pt-4">
      {" "}
      <Table
        responsive="sm"
        striped
        bordered
        hover
        style={{ fontSize: "0.8rem" }}
      >
        <thead>
          <tr>
            <th>Codigo</th>
            <th>Foto</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Telefono</th>
            <th>Tipo de Usuario</th>
            <th>Numero de multas</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users
            .map((user) => (
              <tr key={user.id}>
                <td>{user.codigo}</td>
                <td className="text-center">
                  <OverlayTrigger
                    placement="right"
                    delay={{ show: 250, hide: 400 }}
                    overlay={
                      <Popover id={`popover-image-${user.id}`}>
                        <Popover.Body className="p-2 d-flex align-items-center justify-content-center">
                          {user.urlFoto ? (
                            <Image
                              src={user.urlFoto}
                              alt={user.name}
                              style={{ maxWidth: "120px", height: "auto", borderRadius: "8px" }}
                            />
                          ) : (
                            <UserAvatar name={user.name} size={100} />
                          )}
                        </Popover.Body>
                      </Popover>
                    }
                  >
                    <span className="d-inline-flex">
                      {user.urlFoto ? (
                        <Image
                          src={user.urlFoto}
                          alt={user.name}
                          width="30"
                          height="30"
                          roundedCircle
                          style={{ cursor: "pointer" }}
                        />
                      ) : (
                        <UserAvatar name={user.name} size={30} />
                      )}
                    </span>
                  </OverlayTrigger>
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.celular ? (
                    user.celular
                  ) : (
                    <span className="text-muted fst-italic" style={{ fontSize: "0.75rem" }}>
                      Sin datos
                    </span>
                  )}
                </td>
                <td>
                  <div className="flex  gap-3">
                    {{
                      Admin: <i className="bi bi-person-check-fill"></i>,
                      Reventa: <i className="bi bi-person-badge-fill"></i>,
                      Cliente: <i className="bi bi-person-fill"></i>,
                      Whatsapp: <i className="bi bi-whatsapp"></i>,
                      "Tienda Aliada": <i className="bi bi-shop"></i>,
                    }[user.tipoUsuario] || <i className="bi bi-person"></i>}

                    {user.tipoUsuario}
                  </div>
                </td>

                <td>
                  {user.numeroMultas ? (
                    <Badge bg="danger" pill>
                      {user.numeroMultas}
                    </Badge>
                  ) : (
                    <Badge bg="success" pill style={{ fontSize: "0.7rem" }}>
                      Sin multas
                    </Badge>
                  )}
                </td>
                <td>{user.state ? "Activo" : "Bloqueado"}</td>
                <td>
                  <div className="flex justify-center gap-2">
                    <ControlButton onClick={() => viewOrdersByUser(user)}>
                      <i className="bi bi-eye-fill"></i>
                    </ControlButton>
                    {user.state ? (
                      <ControlButton onClick={() => updateUser(user)}>
                        <i className="bi bi-toggle2-on"></i>
                      </ControlButton>
                    ) : (
                      <ControlButton onClick={() => updateUser(user)}>
                        <i className="bi bi-toggle2-off"></i>
                      </ControlButton>
                    )}
                  </div>
                </td>
              </tr>
            ))
            .slice(firstIndex, lastIndex)}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3">
              <strong>Total Usuarios: {users.length}</strong>
            </td>
          </tr>
        </tfoot>
      </Table>
      <Paginator
        byPage={productosBypage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        total={totalProductos}
      />
    </div>
  );
};

UsersTable.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      codigo: PropTypes.string,
      urlFoto: PropTypes.string,
      name: PropTypes.string,
      email: PropTypes.string,
      celular: PropTypes.string,
      tipoUsuario: PropTypes.string,
      numeroMultas: PropTypes.number,
      state: PropTypes.bool,
    })
  ).isRequired,
  cargarUsuarios: PropTypes.func.isRequired,
};
