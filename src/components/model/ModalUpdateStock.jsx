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
    quantity: stock.quantity,
  };
  const [error2, setError] = useState(false);

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      console.log("ingres por el submit");
      setSubmitting(true);
      const response = await updateStock({ ...values, id: stock.id });
      console.log(response, "jeje");

      if (response) {
        Swal.fire({
          icon: "success",
          title: "Stock Actualizado",
          text: "El stock se actualizo correctamente",
        });

        handleClose();
        refresh(idModel);
      } else {
        Swal.fire({
          icon: "error",
          title: "Stock no actualizado",
          text: "Stock no se actualizo correctamente, intenta nuevamente",
        });
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
                  <Form.Label>Cantidad</Form.Label>
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
