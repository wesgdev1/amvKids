import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormButton } from "./StyledComponentes"; // Reutilizar el botón estilizado
import { updatePassword } from "../../api/auth/auth";
import Swal from "sweetalert2"; // Importar SweetAlert
import { useContext } from "react";
import { AuthContext } from "../../auth/context/AuthContext";

// Añadir validación básica (opcional pero recomendado)

const validateForm = (values) => {
  const errors = {};
  if (!values.password) {
    errors.password = "La contraseña actual es requerida";
  }
  if (!values.newPassword) {
    errors.newPassword = "La nueva contraseña es requerida";
  } else if (values.newPassword.length < 6) {
    errors.newPassword = "La nueva contraseña debe tener al menos 6 caracteres";
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = "Debes confirmar la nueva contraseña";
  } else if (values.newPassword !== values.confirmPassword) {
    errors.confirmPassword = "Las contraseñas nuevas no coinciden";
  }
  return errors;
};

const Contrasena = () => {
  const { user, logout } = useContext(AuthContext);
  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-gray-700">
      <h5 className="text-lg font-semibold mb-6 text-gray-800 border-b pb-2">
        <i className="bi bi-shield-lock-fill mr-2"></i>Cambiar mi contraseña
      </h5>

      <Formik
        initialValues={{
          password: "",
          newPassword: "",
          confirmPassword: "",
        }}
        validate={validateForm} // Añadir la función de validación
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            await updatePassword(values); // Llamar sin asignar a 'response'
            // Asumiendo que 'updatePassword' lanza un error en caso de fallo
            // o devuelve algo que indique éxito/fallo.
            // Aquí asumimos éxito si no hay error.

            Swal.fire({
              title: "¡Éxito!",
              text: "Tu contraseña ha sido actualizada correctamente.",
              icon: "success",
              confirmButtonText: "Ok",
            });
            resetForm(); // Resetear el formulario en caso de éxito
            logout(); // Llamar a logout para cerrar sesión

            // redireccionar al login y borrar localStorage
          } catch (error) {
            // Intentar obtener un mensaje de error más específico si está disponible
            const errorMessage =
              error?.response?.data?.message ||
              error.message ||
              "Hubo un problema al actualizar tu contraseña. Inténtalo de nuevo.";

            Swal.fire({
              title: "Error",
              text: errorMessage,
              icon: "error",
              confirmButtonText: "Ok",
            });
          } finally {
            // Formik maneja setSubmitting(false) automáticamente al resolver/rechazar la promesa
            // setSubmitting(false); // Descomentar si es necesario control manual
          }
        }}
      >
        {({ handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit} className="space-y-5">
            {/* Contraseña Actual */}
            <div className="mb-3">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                Contraseña Actual
              </label>
              <Field
                name="password"
                type="password"
                className="form-control mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Ingresa tu contraseña actual"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-600 text-xs mt-1"
              />
            </div>

            {/* Nueva Contraseña */}
            <div className="mb-3">
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                Nueva Contraseña
              </label>
              <Field
                name="newPassword"
                type="password"
                className="form-control mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Mínimo 6 caracteres"
              />
              <ErrorMessage
                name="newPassword"
                component="div"
                className="text-red-600 text-xs mt-1"
              />
            </div>

            {/* Confirmar Nueva Contraseña */}
            <div className="mb-3">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                Confirmar Nueva Contraseña
              </label>
              <Field
                name="confirmPassword"
                type="password"
                className="form-control mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Vuelve a escribir la nueva contraseña"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-red-600 text-xs mt-1"
              />
            </div>

            {/* Botón de envío */}
            <div className="pt-3">
              <FormButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Actualizando..." : "Actualizar Contraseña"}
              </FormButton>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Contrasena;
