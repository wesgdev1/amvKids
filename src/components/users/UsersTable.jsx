import { useState } from "react";
import { Image, Table, OverlayTrigger, Popover } from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import { Paginator } from "../paginator/Paginator";
import { ControlButton } from "../products/StyledComponents";
import { useUsers } from "../../domain/auth/useUsers";
import Swal from "sweetalert2";
import { editUser } from "../../api/users/users";

export const UsersTable = ({ users, cargarUsuarios }) => {
  const [productosBypage, setProductosByPage] = useState(10);
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
      <Table striped bordered hover style={{ fontSize: "0.8rem" }}>
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
                        <Popover.Body className="p-1">
                          <Image
                            src={
                              user.urlFoto
                                ? user.urlFoto
                                : "https://res.cloudinary.com/dppqkypts/image/upload/v1701901417/Dise%C3%B1o_sin_t%C3%ADtulo_11_r8jfvs.png"
                            }
                            alt={user.name}
                            style={{ maxWidth: "150px", height: "auto" }}
                          />
                        </Popover.Body>
                      </Popover>
                    }
                  >
                    <Image
                      src={
                        user.urlFoto
                          ? user.urlFoto
                          : "https://res.cloudinary.com/dppqkypts/image/upload/v1701901417/Dise%C3%B1o_sin_t%C3%ADtulo_11_r8jfvs.png"
                      }
                      alt={user.name}
                      width="30"
                      height="30"
                      roundedCircle
                      style={{ cursor: "pointer" }}
                    />
                  </OverlayTrigger>
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.celular}</td>
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

                <td>{user.numeroMultas}</td>
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
