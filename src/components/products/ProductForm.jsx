import Alert from "react-bootstrap/Alert";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import { useLocation, useNavigate } from "react-router-dom";
import { Formik, ErrorMessage } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { z } from "zod";
import { ButtonStyled } from "../StyledComponents";

import Swal from "sweetalert2";
import { createProduct, updateProduct } from "../../api/products/products";
import { Button } from "react-bootstrap";

const nombreCompletoRqd = z.string({
  required_error: "El nombre es requerido",
});

const productoSchema = z.object({
  name: nombreCompletoRqd,
});

export const ProductForm = () => {
  const navigate = useNavigate();

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const location = useLocation();
  const actionEdit = location.state?.producto;

  const onCreateProduct = async (formData) => {
    const response = await createProduct(formData);
    if (response) {
      Swal.fire({
        icon: "success",
        title: "Producto Creado",
        text: "El producto se creo correctamente",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Producto no creado",
        text: "El Producto no se creo correctamente, intenta nuevamente",
      });
    }
    navigate("/profile/products", { replace: true });
  };
  const initialValues = {
    name: "" || actionEdit?.name,
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
      setErrorMessage("");

      if (actionEdit) {
        await onUpdateProduct(values);
      } else {
        await onCreateProduct(values);
        setSubmitting(false);
      }
    } catch (error) {
      const message = "Error";
      setError(message);
      Swal.fire({
        icon: "error",
        title: "Producto no creado",
        text: "El Producto no se creo correctamente, intenta nuevamente",
      });
    }
  };

  return (
    <div className="pt-5 px-4">
      <div className="w-100 d-flex justify-content-start mb-4">
        <Button
          variant="light"
          onClick={() => {
            navigate(`/profile/products/`);
          }}
        >
          Volver
        </Button>
      </div>
      <h4 className="pb-3">
        <i className="bi bi-box"></i> Productos
      </h4>
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
                  {actionEdit ? "Actualizar datos" : "Nuevo producto"}
                </h3>
                <Form.Label>Nombre del producto</Form.Label>
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

              <div className="d-flex justify-content-center">
                <ButtonStyled
                  variant="primary"
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {!isSubmitting ? (
                    actionEdit ? (
                      "Actualizar"
                    ) : (
                      "Crear Producto"
                    )
                  ) : (
                    <Spinner
                      as="span"
                      animation="grow"
                      role="status"
                      aria-hidden="true"
                    />
                  )}
                </ButtonStyled>
              </div>
            </Form>
          </>
        )}
      </Formik>
    </div>
  );
};
