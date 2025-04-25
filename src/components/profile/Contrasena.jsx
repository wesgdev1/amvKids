import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormButton } from "./StyledComponentes"; // Reutilizar el botón estilizado

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
        onSubmit={(values, { setSubmitting, resetForm }) => {
          console.log("Datos del formulario de contraseña:", values);
          // Aquí iría la lógica para llamar a la API y cambiar la contraseña
          // Simulación:
          setTimeout(() => {
            alert("Contraseña actualizada (simulación)");
            resetForm(); // Limpiar el formulario después de enviar
            setSubmitting(false);
          }, 500);
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
