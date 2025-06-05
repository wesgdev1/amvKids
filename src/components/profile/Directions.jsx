import { useContext, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Modal, Table, Button } from "react-bootstrap";
import { AuthContext } from "../../auth/context/AuthContext";
import { FormButton } from "./StyledComponentes";
import Swal from "sweetalert2";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import {
  deleteDirection,
  editUserCreateDirection,
} from "../../api/users/users";

// Esquema de validación para direcciones
const addressSchema = z.object({
  address: z.string().min(5, "La dirección debe tener al menos 5 caracteres"),
  city: z.string().min(2, "La ciudad debe tener al menos 2 caracteres"),
  state: z.string().min(2, "El estado debe tener al menos 2 caracteres"),
  zipCode: z.string().optional(),
});

const Directions = () => {
  const { user, actualizarDirecciones, eliminarDireccion } =
    useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);

  // Valores iniciales del formulario
  const initialValues = {
    address: "",
    city: "",
    state: "",
    zipCode: "",
  };

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      console.log("Datos de nueva dirección:", values);

      const response = await editUserCreateDirection({
        ...values,
        userId: user?.id,
      });

      console.log(response.data);

      actualizarDirecciones(response.data);

      // Aquí iría la llamada a la API para agregar la dirección
      // Por ahora solo hacemos console.log como solicitado

      Swal.fire({
        title: "¡Éxito!",
        text: "Dirección agregada correctamente.",
        icon: "success",
        confirmButtonText: "Ok",
      });

      resetForm();
      handleCloseModal();
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al agregar la dirección. Inténtalo de nuevo.",
        icon: "error",
        confirmButtonText: "Ok",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteDirection = async (directionIndex) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esta acción",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        console.log("Eliminar dirección en índice:", directionIndex);
        await deleteDirection(directionIndex);
        eliminarDireccion(directionIndex);

        // actualizar el contexto de direcciones
        // Aquí iría la llamada a la API para eliminar la dirección
        // Por ahora solo hacemos console.log como solicitado

        Swal.fire("¡Eliminado!", "La dirección ha sido eliminada.", "success");
      }
    });
  };

  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow-md text-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-800">
            Mis Direcciones
          </h3>
          <FormButton onClick={handleShowModal}>
            <i className="bi bi-plus-lg me-2"></i>
            Agregar Dirección
          </FormButton>
        </div>

        {user?.directions && user.directions.length > 0 ? (
          <div className="overflow-x-auto">
            <Table striped bordered hover responsive className="mb-0">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-sm font-medium text-gray-600 px-3 py-3">
                    Dirección
                  </th>
                  <th className="text-sm font-medium text-gray-600 px-3 py-3">
                    Ciudad
                  </th>
                  <th className="text-sm font-medium text-gray-600 px-3 py-3">
                    Estado
                  </th>
                  <th className="text-sm font-medium text-gray-600 px-3 py-3">
                    Código Postal
                  </th>
                  <th className="text-sm font-medium text-gray-600 px-3 py-3 text-center">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {user.directions.map((direction) => (
                  <tr key={direction.id} className="hover:bg-gray-50">
                    <td className="px-3 py-3 text-sm text-gray-700">
                      {direction.address}
                    </td>
                    <td className="px-3 py-3 text-sm text-gray-700">
                      {direction.city}
                    </td>
                    <td className="px-3 py-3 text-sm text-gray-700">
                      {direction.state}
                    </td>
                    <td className="px-3 py-3 text-sm text-gray-700">
                      {direction.zipCode}
                    </td>
                    <td className="px-3 py-3 text-center">
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleDeleteDirection(direction.id)}
                        className="hover:bg-red-500 hover:text-white transition-colors"
                      >
                        <i className="bi bi-trash"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <i className="bi bi-geo-alt text-4xl text-gray-400 mb-3"></i>
            <p className="text-gray-500 text-lg mb-4">
              No tienes direcciones registradas
            </p>
            <FormButton onClick={handleShowModal}>
              <i className="bi bi-plus-lg me-2"></i>
              Agregar Primera Dirección
            </FormButton>
          </div>
        )}
      </div>

      {/* Modal para agregar dirección */}
      <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
        <Modal.Header closeButton className="bg-indigo-600 text-white">
          <Modal.Title>
            <i className="bi bi-geo-alt-fill me-2"></i>
            Agregar Nueva Dirección
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="p-4">
          <Formik
            initialValues={initialValues}
            validationSchema={toFormikValidationSchema(addressSchema)}
            onSubmit={handleSubmit}
          >
            {({ handleSubmit, isSubmitting }) => (
              <Form onSubmit={handleSubmit} className="space-y-4">
                <div className="mb-4">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-600 mb-2"
                  >
                    Dirección Completa *
                  </label>
                  <Field
                    name="address"
                    className="form-control mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Ej: Calle 123 #45-67"
                  />
                  <ErrorMessage
                    name="address"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="row">
                  <div className="col-md-6 mb-4">
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-gray-600 mb-2"
                    >
                      Ciudad *
                    </label>
                    <Field
                      name="city"
                      className="form-control mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Ej: Bogotá"
                    />
                    <ErrorMessage
                      name="city"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div className="col-md-6 mb-4">
                    <label
                      htmlFor="state"
                      className="block text-sm font-medium text-gray-600 mb-2"
                    >
                      Estado/Departamento *
                    </label>
                    <Field
                      name="state"
                      className="form-control mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Ej: Cundinamarca"
                    />
                    <ErrorMessage
                      name="state"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="zipCode"
                    className="block text-sm font-medium text-gray-600 mb-2"
                  >
                    Código Postal
                  </label>
                  <Field
                    name="zipCode"
                    className="form-control mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Ej: 110111"
                  />
                  <ErrorMessage
                    name="zipCode"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="d-flex gap-2 justify-content-end pt-3">
                  <Button
                    variant="secondary"
                    onClick={handleCloseModal}
                    disabled={isSubmitting}
                  >
                    Cancelar
                  </Button>
                  <FormButton type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Guardando..." : "Guardar Dirección"}
                  </FormButton>
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Directions;
