import { ErrorMessage, Formik } from "formik";
import { Alert, Form, Modal, Spinner } from "react-bootstrap";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { ButtonProfile } from "../products/StyledComponents";
import Swal from "sweetalert2";
import { useState } from "react";
import { updateStock } from "../../api/stock/stock";

const sizeRqd = z.number({
  required_error: "El tamaño es requerido",
});

const quantityRqd = z.number({
  required_error: "La cantidad es requerida",
});

const stockSchema = z.object({
  size: sizeRqd,
  quantity: quantityRqd,
});

export const ModalUpdateStock = ({
  show,
  handleClose,
  stock,
  refresh,
  idModel,
}) => {
  const initialValues = {
    size: stock.size,
    quantity: 0,
  };
  const [error2, setError] = useState(false);

  const onSubmit = async (values, { setSubmitting }) => {
    // Mostrar alerta de confirmación primero
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: `Vas a añadir ${values.quantity} unidades a la talla ${values.size}. ¿Deseas continuar?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, actualizar",
      cancelButtonText: "No, cancelar",
    });

    // Si el usuario confirma, proceder con la actualización
    if (result.isConfirmed) {
      try {
        setSubmitting(true);

        // console.log(values, "values"); // Log opcional
        const response = await updateStock({ ...values, id: stock.id }); // Usar la llamada real a la API
        // console.log(response, "API response"); // Log opcional

        if (response) {
          // Asumiendo que la respuesta es exitosa si 'response' es truthy
          Swal.fire({
            icon: "success",
            title: "Stock Actualizado",
            text: "El stock se actualizó correctamente",
          });

          handleClose();
          if (typeof refresh === "function") {
            // Verificar si refresh es una función
            refresh(idModel);
          }
        } else {
          // Esto podría necesitar un manejo más específico si la API devuelve errores de forma distinta
          Swal.fire({
            icon: "error",
            title: "Stock no actualizado",
            text: "El stock no se actualizó correctamente, intenta nuevamente",
          });
        }
      } catch (error) {
        console.error("Error al actualizar stock:", error); // Es bueno loguear el error real
        const message =
          error?.response?.data?.message ||
          error?.message ||
          "Ocurrió un error desconocido";
        setError(true); // Establecer el estado de error local si es necesario
        Swal.fire({
          icon: "error",
          title: "Error al actualizar",
          text: message, // Mostrar mensaje de error más específico si es posible
        });
      } finally {
        setSubmitting(false); // Asegurarse de que isSubmitting se ponga en false
      }
    } else {
      // Si el usuario cancela, no hacer nada o mostrar un mensaje opcional
      setSubmitting(false); // Asegurar que el botón se reactive
      // Swal.fire("Cancelado", "La actualización del stock ha sido cancelada.", "info"); // Opcional
    }
  };
  return (
    <Modal
      show={show}
      onHide={handleClose}
      keyboard={false}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Actualizar Stock</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={toFormikValidationSchema(stockSchema)}
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
                style={{
                  width: "100%",
                  margin: "auto",
                  marginTop: "10px",
                }}
              >
                {/* {error && (
                  <Alert
                    variant="danger"
                    style={{
                      width: "75%",
                      margin: "auto",
                      marginTop: "10px",
                    }}
                  >
                    Hubo un error, intentalo nuevamente
                  </Alert>
                )} */}
                <Form.Group className="" controlId="formBasicNombreCompleto">
                  <Form.Label>Talla</Form.Label>
                  <Form.Control
                    disabled
                    type="number"
                    placeholder="Escibe aqui el talla del modelo"
                    name="size"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.size}
                    className={touched.size && errors.size ? "is-invalid" : ""}
                  />
                  <ErrorMessage
                    name="size"
                    component="div"
                    className="invalid-feedback"
                  />
                </Form.Group>
                <Form.Group className="" controlId="formBasicNombreCompleto">
                  <Form.Label>Cantidad a Sumar</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Escibe aqui la cantidad de unidades de esa talla"
                    name="quantity"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.quantity}
                    className={
                      touched.quantity && errors.quantity ? "is-invalid" : ""
                    }
                  />
                  <ErrorMessage
                    name="quantity"
                    component="div"
                    className="invalid-feedback"
                  />
                </Form.Group>

                <div className="d-flex justify-content-center">
                  <ButtonProfile
                    variant="primary"
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {!isSubmitting ? (
                      "Actualizar"
                    ) : (
                      <Spinner
                        as="span"
                        animation="grow"
                        role="status"
                        aria-hidden="true"
                      />
                    )}
                  </ButtonProfile>
                </div>
              </Form>
            </>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};
