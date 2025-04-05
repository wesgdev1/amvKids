import { useContext } from "react";
import { Formik, Form, Field } from "formik";
import { AuthContext } from "../../auth/context/AuthContext"; // Asegúrate de ajustar la ruta según tu estructura de archivos

const DatosPersonales = () => {
  const { user, setAuthState } = useContext(AuthContext);

  return (
    <div
      className="bg-white p-6 rounded-lg shadow-md"
      style={{ color: "var(--gray-2)" }}
    >
      <h5
        className="text-lg font-semibold mb-4"
        style={{ color: "var(--gray-1)" }}
      >
        Mis datos personales
      </h5>
      <Formik
        initialValues={user}
        onSubmit={(values) => {
          console.log("Datos actualizados:", values);
          setAuthState((prevState) => ({
            ...prevState,
            user: values,
          }));
        }}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit} className="space-y-4">
            <div className="mb-3">
              <label
                htmlFor="name"
                className="block text-sm font-medium"
                style={{ color: "var(--gray-1)" }}
              >
                Nombre
              </label>
              <Field
                name="name"
                className="form-control mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="email"
                className="block text-sm font-medium"
                style={{ color: "var(--gray-1)" }}
              >
                Email
              </label>
              <Field
                name="email"
                type="email"
                className="form-control mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
            >
              Actualizar
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default DatosPersonales;
