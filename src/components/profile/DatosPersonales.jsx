import { useContext } from "react";
import { Formik, Form, Field } from "formik";
import { AuthContext } from "../../auth/context/AuthContext";
import { FormButton } from "./StyledComponentes"; // Importar el botón estilizado

const DatosPersonales = () => {
  const { user } = useContext(AuthContext); // Eliminar setAuthState

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
      <h5
        className="text-lg font-semibold mb-6 text-gray-800 border-b pb-2"
        // style={{ color: "var(--gray-1)" }} // Quitando estilos inline
      >
        <i className="bi bi-person-badge mr-2"></i>Mis datos personales
      </h5>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) => {
          // Aquí iría la lógica para enviar solo los datos modificables
          const updatedData = {
            name: values.name,
            celular: values.celular,
          };
          console.log("Datos a actualizar:", updatedData);
          // Simular llamada a API
          setTimeout(() => {
            alert(JSON.stringify(updatedData, null, 2));
            setSubmitting(false);
          }, 400);
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
