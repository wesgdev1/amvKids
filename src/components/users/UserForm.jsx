import Alert from "react-bootstrap/Alert";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import { useLocation, useNavigate } from "react-router-dom";
import { Formik, ErrorMessage } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { z } from "zod";

import Swal from "sweetalert2";
import { updateProduct } from "../../api/products/products";
import { ButtonCardStyled } from "../StyledComponents";
import { createUsers } from "../../api/auth/auth";

const nombreCompletoRqd = z.string({
  required_error: "El nombre es requerido",
});

const emailRqd = z.string({
  required_error: "El email es requerido",
});

const tipoUsuarioRqd = z.string({
  required_error: "El tipo de usuario es requerido",
});

const telefonoRqd = z.string({
  required_error: "El telefono es requerido",
});
const productoSchema = z.object({
  name: nombreCompletoRqd,
  email: emailRqd,
  tipoUsuario: tipoUsuarioRqd,
  celular: telefonoRqd,
});

export const UserForm = () => {
  const navigate = useNavigate();

  const [error, setError] = useState(false);

  const tiposdeUsuario = [
    "Admin",
    "Reventa",
    "Cliente",
    "Tienda Aliada",
    "Preparador",
  ];
  const location = useLocation();
  const actionEdit = location.state?.producto;

  const onCreateUser = async (formData) => {
    const response = await createUsers(formData);
    if (response) {
      Swal.fire({
        icon: "success",
        title: "Usuario creado",
        text: "El usuario se creo correctamente",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Usuario no creado",
        text: "El usuario no se creo correctamente, intenta nuevamente",
      });
    }
    navigate("/profile/users", { replace: true });
  };
  const initialValues = {
    name: "" || actionEdit?.name,
    email: "" || actionEdit?.email,
    tipoUsuario: "" || actionEdit?.tipoUsuario,
    celular: "" || actionEdit?.celular,
  };

  const onUpdateProduct = async (formData) => {
    Swal.fire({
      title: "Esta seguro de actualizar los datos del producto?",
      text: "¡Los cambios seran inmediatos!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",

      confirmButtonText: "Si, Actualizar!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await updateProduct(actionEdit.id, formData);

        if (response) {
          Swal.fire(
            "Actualizado!",
            "Los datos del producto han sido actualizados.",
            "success"
          );
          navigate("/profile/products", { replace: true });
        } else
          Swal.fire(
            "Error!",
            "Hubo un error al actualizar los datos del producto.",
            "error"
          );
      }
    });
  };

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      setSubmitting(true);
      setError(false);

      if (actionEdit) {
        await onUpdateProduct(values);
      } else {
        console.log(values);
        await onCreateUser(values);

        setSubmitting(false);
      }
    } catch (error) {
      const message = "Error";
      setError(message);
      Swal.fire({
        icon: "error",
        title: "Usuario no creado",
        text: "El usuario no se creo correctamente, intenta nuevamente",
      });
    }
  };

  return (
    <div className="pt-5 px-4">
      <h4 className="pb-3">
        <i className="bi bi-box"></i> Crear Usuario
      </h4>
      <p className="text-muted small mb-4">
        Este formulario permite crear un nuevo usuario especificando su rol
        (Tipo de Usuario). Una vez creado, se enviará un correo electrónico a la
        dirección proporcionada con una contraseña temporal y los pasos
        necesarios para iniciar sesión por primera vez.
      </p>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={toFormikValidationSchema(productoSchema)}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <>
            <Form
              className="d-flex flex-column gap-4 "
              onSubmit={handleSubmit}
              style={{ width: "100%", margin: "auto", marginTop: "10px" }}
            >
              {error && (
                <Alert
                  variant="danger"
                  style={{ width: "75%", margin: "auto", marginTop: "10px" }}
                >
                  Hubo un error, intentalo nuevamente
                </Alert>
              )}
              <Form.Group className="" controlId="formBasicNombreCompleto">
                <h3 className="pt-2 pb-3">
                  {actionEdit ? "Actualizar datos" : "Nuevo usuario"}
                </h3>
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Escibe aqui el nombre del producto"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  className={touched.name && errors.name ? "is-invalid" : ""}
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="invalid-feedback"
                />
              </Form.Group>
              <Form.Group className="" controlId="formBasicNombreCompleto">
                <Form.Label>Telefono</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Escibe el telefono del usuario"
                  name="celular"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.celular}
                  className={
                    touched.celular && errors.celular ? "is-invalid" : ""
                  }
                />
                <ErrorMessage
                  name="celular"
                  component="div"
                  className="invalid-feedback"
                />
              </Form.Group>
              <Form.Group className="" controlId="formBasicNombreCompleto">
                <Form.Label>Correo</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Escibe aqui el nombre del producto"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  className={touched.email && errors.email ? "is-invalid" : ""}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="invalid-feedback"
                />
              </Form.Group>

              <Form.Group className="" controlId="formBasicNombreCompleto">
                <Form.Label>Tipo de Usuario</Form.Label>
                <Form.Control
                  as="select"
                  name="tipoUsuario"
                  onBlur={handleBlur}
                  value={values.tipoUsuario}
                  onChange={handleChange}
                  className={
                    touched.tipoUsuario && errors.tipoUsuario
                      ? "is-invalid"
                      : ""
                  }
                >
                  <option value="">Selecciona un tipo de usuario</option>
                  {tiposdeUsuario.map((tipo) => (
                    <option key={tipo} value={tipo}>
                      {tipo}
                    </option>
                  ))}
                </Form.Control>

                <ErrorMessage
                  name="tipoUsuario"
                  component="div"
                  className="invalid-feedback"
                />
              </Form.Group>

              <div className="d-flex justify-content-center pt-5">
                <ButtonCardStyled
                  variant="primary"
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {!isSubmitting ? (
                    actionEdit ? (
                      "Actualizar"
                    ) : (
                      "Crear Usuario"
                    )
                  ) : (
                    <Spinner
                      as="span"
                      animation="grow"
                      role="status"
                      aria-hidden="true"
                    />
                  )}
                </ButtonCardStyled>
              </div>
            </Form>
          </>
        )}
      </Formik>
    </div>
  );
};
