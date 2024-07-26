import { Form, Image, Spinner } from "react-bootstrap";
import { Zenitho } from "uvcanvas";

import { Formik, ErrorMessage, replace } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { z } from "zod";

{
  /*Defino el esquema */
}

const loginSchema = z.object({
  email: z
    .string({
      required_error: "El correo es requerido",
    })
    .email("El correo no es valido"),
  password: z
    .string({
      required_error: "La contraseña es requerida",
    })
    .min(8, "La contraseña debe tener al menos 8 caracteres"),
});

import {
  ButtonStyled,
  FormStyled,
  NavLinkStyled,
} from "../components/StyledComponents";
import { signIn } from "../api/auth/auth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useContext } from "react";
import { AuthContext } from "../auth/context/AuthContext";
import { setSession } from "../api/sessions";

export const Login = () => {
  const { login } = useContext(AuthContext);
  const { user } = useContext(AuthContext);

  const naviqate = useNavigate();
  if (user) {
    naviqate("/productos");
  }
  const initialValues = {
    email: "",
    password: "",
  };

  const onLogin = async (payload) => {
    try {
      const response = await signIn(payload);

      if (response) {
        const { data, meta } = response;
        login(data.user);
        setSession(meta.token);
        naviqate("/productos");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Usuario o contraseña incorrectos, por favor intente de nuevo",
        confirmButtonText: "Iniciar Sesion",
      }).then((result) => {
        if (result.isConfirmed) {
          naviqate("/login");
        }
      });
    }
  };

  const onSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    await onLogin(values);
    setSubmitting(false);
  };

  return (
    <div>
      <Zenitho />

      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={toFormikValidationSchema(loginSchema)}
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
          <FormStyled onSubmit={handleSubmit}>
            <div className="d-flex justify-center pb-3">
              <Image
                src="https://res.cloudinary.com/dppqkypts/image/upload/v1709156443/AMV_LOGO_1_nx3ofa.png"
                width={70}
              />
            </div>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Correo electronico</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingrese su Email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                className={touched.email && errors.email ? "is-invalid" : null}
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-white"
              />
              <Form.Text className="text-muted">
                Nunca compartiremos tu correo con nadie mas.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                className={
                  touched.password && errors.password ? "is-invalid" : null
                }
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-white"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Recordar contraseña" />
            </Form.Group>
            <div className="d-flex justify-center">
              <ButtonStyled
                variant="primary"
                type="submit"
                disabled={isSubmitting}
              >
                {
                  /*Si esta cargando, muestro el spinner */
                  !isSubmitting ? (
                    "Iniciar sesion"
                  ) : (
                    <Spinner animation="border" size="sm" />
                  )
                }
              </ButtonStyled>
            </div>
            <div>
              <p className="text-center pt-4">¿No tienes cuenta?</p>
              <div className="d-flex justify-center">
                <NavLinkStyled to={"/signup"}>
                  <p className="text-center">Registrate Aqui</p>
                </NavLinkStyled>
              </div>
            </div>
          </FormStyled>
        )}
      </Formik>
    </div>
  );
};
