import { useParams } from "react-router-dom";
import { useOrder } from "../../domain/orders/useOrder";
import { Alert, Card, Form, Spinner } from "react-bootstrap";
import { z } from "zod";
import { ErrorMessage, Formik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useState } from "react";
import Swal from "sweetalert2";

import { ButtonProfile, ControlButton } from "../products/StyledComponents";
import { updateOrder } from "../../api/orders/orders";
import { da } from "date-fns/locale";
import { ShoesCardStyledPayment } from "../StyledComponents";

const imageRqd = z.any().optional();

export const OrdeDetail = () => {
  const copyToClipboardBC = () => {
    const accountNumber = "83200001513";
    navigator.clipboard.writeText(accountNumber).then(() => {
      console.log("Número de cuenta copiado al portapapeles");
    });
  };
  const copyToClipboardNe = () => {
    const accountNumber = "3123460008";
    navigator.clipboard.writeText(accountNumber).then(() => {
      console.log("Número de cuenta copiado al portapapeles");
    });
  };
  const copyToClipboardDa = () => {
    const accountNumber = "3108709900";
    navigator.clipboard.writeText(accountNumber).then(() => {
      console.log("Número de cuenta copiado al portapapeles");
    });
  };
  const params = useParams();
  const { id } = params;
  const { data, loading, error, cargarOrder: refresh } = useOrder(id);

  const initialValues = {
    images: "",
  };

  const modelSchema = z.object({
    images: imageRqd,
  });
  const [error2, setError2] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const updateOrderPayment = async (values) => {
    try {
      const response = await updateOrder(id, values);
      if (response) {
        Swal.fire({
          icon: "success",
          title: "Orden Actualizada",
          text: "La orden se actualizo correctamente",
        });
        refresh(id);
      }
    } catch (error) {
      const message = "Error";
      setError2(message);
      Swal.fire({
        icon: "error",
        title: "Orden no actualizada",
        text: "Ups, la orden no se actualizo correctamente, intenta nuevamente",
      });
    }
  };

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      setSubmitting(true);
      setError2(false);
      setErrorMessage("");

      const formData = new FormData();

      if (!values.images) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Debes adjuntar una imagen",
        });
      }

      if (values.images && values.images.length > 0) {
        values.images.forEach((file) => {
          formData.append("images", file);
        });
      }
      console.log("formData", formData);
      await updateOrderPayment(formData);
    } catch (error) {
      const message = "Error";
      setError2(message);
      Swal.fire({
        icon: "error",
        title: "Producto no creado",
        text: "El Producto no se creo correctamente, intenta nuevamente",
      });
    }
  };

  return (
    <div className="pt-5 px-4">
      <h4 className="pb-3">
        <i className="bi bi-receipt-cutoff"></i> Detalle de mi orden #{" "}
        {data?.codigoOrder}
      </h4>

      <div>
        {loading && <Spinner animation="border" variant="info" />}
        {error && <Alert variant="danger">{error}</Alert>}
        {data && (
          <ShoesCardStyledPayment>
            <Card.Header>
              Total: {data.total.toLocaleString("es-CO")} COP
            </Card.Header>
            <Card.Body>
              <Card.Title>Productos</Card.Title>
              <Card.Text>
                {data.orderItems.map((item) => (
                  <p key={item.id}>
                    {item.quantity} x {item.model.name} -{" "}
                    {item.model.price.toLocaleString("es-CO")} COP - talla:{" "}
                    {item.size}
                  </p>
                ))}
              </Card.Text>
            </Card.Body>
            <hr />
            <Card.Body>
              <div>
                <strong>
                  <p>Comentarios:</p>
                </strong>
                <p>{data.comments}</p>
              </div>

              <p>
                <strong>Estado del pedido: </strong>
                {data.state}
              </p>
            </Card.Body>
            <hr />
            {data.paymentUrl ? (
              <></>
            ) : (
              <Card.Body>
                <strong>Medio de pago</strong>
                <div className="pt-2">
                  <h5>AMV KIDS</h5>

                  <div className="flex flex-col items-start">
                    <ControlButton onClick={copyToClipboardBC}>
                      <p>Bancolombia - Ahorros: 83200001513</p>
                    </ControlButton>
                    <ControlButton onClick={copyToClipboardNe}>
                      <p>Nequi - Andres Moreno: 3123460008</p>
                    </ControlButton>
                    <ControlButton onClick={copyToClipboardDa}>
                      <p>DaviPlata - Carlos Becerra: 3108709900</p>
                    </ControlButton>
                  </div>
                </div>
              </Card.Body>
            )}

            {data.paymentUrl ? (
              <Card.Body>
                <span>Genial, ya realizaste el pago </span>
                <i className="bi bi-check-square-fill"></i>
              </Card.Body>
            ) : (
              <Card.Body>
                <span>Adjunta el soporte de pago</span>
                <Formik
                  initialValues={initialValues}
                  onSubmit={onSubmit}
                  validationSchema={toFormikValidationSchema(modelSchema)}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    setFieldValue,
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
                        {error && (
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
                        )}

                        <Form.Group
                          className="align-items-center"
                          controlId="formProdFileIMG"
                        >
                          <Form.Control
                            style={{ width: "50%" }}
                            type="file"
                            size="sm"
                            name="images"
                            // solo admitir 1 imagen
                            multiple={false}
                            accept=".jpg, .jpeg, .png"
                            onChange={(e) => {
                              // const file = e.currentTarget.files[0];
                              const file = Array.from(e.currentTarget.files);
                              setFieldValue("images", file);
                            }}
                            className={
                              touched.images && errors.images
                                ? "is-invalid"
                                : ""
                            }
                          />
                          <ErrorMessage
                            name="images"
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
                              "Subir el pago"
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
              </Card.Body>
            )}
          </ShoesCardStyledPayment>
        )}
      </div>
    </div>
  );
};
