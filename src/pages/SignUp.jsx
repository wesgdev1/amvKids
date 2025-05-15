import { Form, Image, Spinner } from "react-bootstrap";
import { Zenitho } from "uvcanvas";

import { Formik, ErrorMessage } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { z } from "zod";
import {
  ButtonStyled,
  NavLinkStyled,
  LoginContainerStyled,
  LoginFormStyled,
} from "../components/StyledComponents";
import { signUp } from "../api/auth/auth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

{
  /*Defino el esquema */
}

const signUpSchema = z
  .object({
    name: z
      .string({
        required_error: "El nombre es requerido",
      })
      .min(3, "El nombre debe tener al menos 3 caracteres"),
    email: z
      .string({
        required_error: "El correo es requerido",
      })
      .email("El correo no es valido"),
    password: z
      .string({
        required_error: "La contraseña es requerida",
      })
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .max(20, "La contraseña debe tener menos de 20 caracteres"),
    confirmPassword: z.string({
      required_error: "La confirmacion de la contraseña es requerida",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export const SignUp = () => {
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const navigate = useNavigate();

  const onRegister = async (payload) => {
    try {
      delete payload.confirmPassword;
      const response = await signUp({
        ...payload,
        tipoUsuario: "Cliente",
      });

      const { data } = response;

      if (data) {
        Swal.fire({
          title: "Registro exitoso",
          text: "Usuario registrado correctamente",
          icon: "success",
          confirmButtonText: "Iniciar Sesion",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/login", { replace: true });
          }
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Tu Usuario no ha sido Creado",
        text: "Porfavor intenta de nuevo",
      });
    }
  };

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    await onRegister(values);
    setSubmitting(false);
    resetForm();
  };

  return (
    <LoginContainerStyled>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
          overflow: "hidden",
        }}
      >
        <Zenitho />
      </div>

      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={toFormikValidationSchema(signUpSchema)}
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
          <LoginFormStyled
            onSubmit={handleSubmit}
            style={{ paddingBottom: "2rem" }}
          >
            <div className="d-flex justify-center pb-3">
              <Image
                src="https://res.cloudinary.com/dppqkypts/image/upload/v1709156443/AMV_LOGO_1_nx3ofa.png"
                width={70}
              />
            </div>

            <div className="mb-3 text-center px-2">
              <p className="text-white" style={{ fontSize: "0.85rem" }}>
                <i className="bi bi-info-circle-fill me-2"></i>
                Este registro es para <strong>Clientes</strong>. Si deseas
                registrarte como <strong>Tienda Aliada</strong> o{" "}
                <strong>Reventa</strong>, por favor comunícate directamente con
                nuestras líneas de atención AMV.
              </p>
            </div>

            <Form.Group controlId="formBasicName">
              <Form.Label>Nombre Completo</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese su nombre"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                className={touched.name && errors.name ? "is-invalid" : ""}
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-danger"
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmailSignUp">
              <Form.Label>Correo electronico</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingrese su Email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                className={touched.email && errors.email ? "is-invalid" : ""}
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-danger"
              />
              <Form.Text className="text-white">
                Nunca compartiremos tu correo con nadie mas.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPasswordSignUp">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Tu contraseña (8-20 caracteres)"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                className={
                  touched.password && errors.password ? "is-invalid" : ""
                }
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-danger"
              />
            </Form.Group>
            <Form.Group controlId="formBasicConfirmPassword">
              <Form.Label>Confirmar contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirma tu contraseña"
                name="confirmPassword"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.confirmPassword}
                className={
                  touched.confirmPassword && errors.confirmPassword
                    ? "is-invalid"
                    : ""
                }
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-danger"
              />
            </Form.Group>

            <div className="d-flex justify-center">
              <ButtonStyled
                variant="primary"
                type="submit"
                disabled={isSubmitting}
              >
                {!isSubmitting ? (
                  "Registrarse"
                ) : (
                  <>
                    <Spinner animation="border" size="sm" />
                    <span className="ms-2">Cargando...</span>
                  </>
                )}
              </ButtonStyled>
            </div>
            <div>
              <p className="text-center pt-4 text-white">¿Ya tienes cuenta?</p>
              <div className="d-flex justify-center">
                <NavLinkStyled to={"/login"}>
                  <p className="text-center">Inicia sesion</p>
                </NavLinkStyled>
              </div>
            </div>
          </LoginFormStyled>
        )}
      </Formik>
    </LoginContainerStyled>
  );
};
