import { useContext } from "react";
import { Formik, Form, Field } from "formik";
import { AuthContext } from "../../auth/context/AuthContext";
import { FormButton } from "./StyledComponentes"; // Importar el botón estilizado

import Swal from "sweetalert2"; // Importar SweetAlert
import { editUser } from "../../api/users/users";

const DatosPersonales = () => {
  const { user, actualizarDatosPersonales } = useContext(AuthContext); // Eliminar setAuthState

  // Valores iniciales asegurando que no haya null/undefined
  const initialValues = {
    name: user?.name || "",
    email: user?.email || "N/A",
    celular: user?.celular || "", // Asumiendo que 'celular' existe en user
    tipoUsuario: user?.tipoUsuario || "N/A", // Asumiendo que 'tipoUsuario' existe en user
    numeroMultas: user?.numeroMultas ?? "N/A", // Usar ?? para manejar 0 correctamente
    codigo: user?.codigo || "N/A", // Asumiendo que 'codigo' existe en user
  };

  return (
    <div
      className="bg-white p-6 rounded-lg shadow-md text-gray-700"
      // style={{ color: "var(--gray-2)" }} // Quitando estilos inline si usamos Tailwind
    >
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, { setSubmitting }) => {
          // Aquí iría la lógica para enviar solo los datos modificables
          const updatedData = {
            name: values.name,
            celular: values.celular,
          };

          try {
            const response = await editUser(user?.id, updatedData);
            actualizarDatosPersonales(response.data);

            Swal.fire({
              title: "¡Éxito!",
              text: "Tus datos han sido actualizados correctamente.",
              icon: "success",
              confirmButtonText: "Ok",
            });

            // Opcional: Actualizar el contexto de usuario si editUser no lo hace automáticamente
            // Aquí podrías llamar a una función `refreshUser()` o similar del AuthContext
          } catch (error) {
            const errorMessage =
              error?.response?.data?.message ||
              error.message ||
              "Hubo un problema al actualizar tus datos. Inténtalo de nuevo.";

            Swal.fire({
              title: "Error",
              text: errorMessage,
              icon: "error",
              confirmButtonText: "Ok",
            });
          } finally {
            // Formik maneja setSubmitting(false) automáticamente
          }
        }}
        enableReinitialize // Para actualizar si el user cambia
      >
        {({ handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit} className="space-y-5">
            {/* Campo Nombre (Editable) */}
            <div className="mb-3">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                Nombre Completo
              </label>
              <Field
                name="name"
                className="form-control mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Ingresa tu nombre completo"
              />
            </div>

            {/* Campo Email (No Editable) */}
            <div className="mb-3">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                Email
              </label>
              <Field
                name="email"
                type="email"
                className="form-control mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-500 sm:text-sm cursor-not-allowed"
                readOnly // Hacerlo de solo lectura
              />
            </div>

            {/* Campo Celular (Editable) */}
            <div className="mb-3">
              <label
                htmlFor="celular"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                Celular
              </label>
              <Field
                name="celular"
                type="tel" // Tipo adecuado para teléfono
                className="form-control mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Ej: +51 987654321"
              />
            </div>

            {/* Campo Tipo Usuario (No Editable) */}
            <div className="mb-3">
              <label
                htmlFor="tipoUsuario"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                Tipo de Usuario
              </label>
              <Field
                name="tipoUsuario"
                className="form-control mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-500 sm:text-sm cursor-not-allowed"
                readOnly
              />
            </div>

            {/* Campo Número Multas (No Editable) */}
            <div className="mb-3">
              <label
                htmlFor="numeroMultas"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                Número de Multas
              </label>
              <Field
                name="numeroMultas"
                type="number" // Tipo número
                className="form-control mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-500 sm:text-sm cursor-not-allowed"
                readOnly
              />
            </div>

            {/* Campo Código (No Editable) */}
            <div className="mb-3">
              <label
                htmlFor="codigo"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                Código de Usuario
              </label>
              <Field
                name="codigo"
                className="form-control mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-500 sm:text-sm cursor-not-allowed"
                readOnly
              />
            </div>

            {/* Usar el botón estilizado */}
            <div className="pt-3">
              <FormButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Actualizando..." : "Actualizar Datos"}
              </FormButton>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default DatosPersonales;
