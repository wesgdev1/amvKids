import { useParams } from "react-router-dom";
import { useModel } from "../../domain/models/useModel";
import { Alert, Button, Form, Image, Modal, Spinner } from "react-bootstrap";
import { StockTable } from "./StockTable";
import { ContainerImages } from "./StyledComponents";
import { ButtonProfile } from "../products/StyledComponents";
import { useState } from "react";
import { ErrorMessage, Formik } from "formik";
import { set, z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { ButtonCardStyled, ButtonStyled } from "../StyledComponents";
import Swal from "sweetalert2";
import { createStock } from "../../api/stock/stock";

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

export const ModelDetail = () => {
  const initialValues = {
    size: "",
    quantity: "",
  };
  const params = useParams();
  const { idModel } = params;
  const { data, loading, error, cargarModel: refresh } = useModel(idModel);
  const [show, setShow] = useState(false);

  const [error2, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      setSubmitting(true);
      const response = await createStock({ ...values, modelId: idModel });
      if (response) {
        Swal.fire({
          icon: "success",
          title: "Stock Creado",
          text: "El stock se creo correctamente",
        });

        handleClose();
        refresh(idModel);
      } else {
        Swal.fire({
          icon: "error",
          title: "Stock no creado",
          text: "El Stock no se creo correctamente, intenta nuevamente",
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
    <div className="pt-5 px-4">
      <Button
        className="mb-4"
        variant="light"
        onClick={() => {
          window.history.back();
        }}
      >
        Volver
      </Button>
      <h4 className="pb-3">
        <i className="bi bi-box"></i> Informacion del Modelo {data?.name}
      </h4>
      {loading && <Spinner animation="border" variant="info" />}
      {error && <Alert variant="danger">{error}</Alert>}
      {data && (
        <>
          <div>
            <p>
              <strong>Nombre del Modelo: </strong>
              <span>{data.name}</span>
            </p>
            <p>
              <strong>Color: </strong>
              <span>{data.color}</span>
            </p>
            <p>
              <strong>Precio Reventa: </strong>
              <span>${data.price}</span>
            </p>
            <p>
              <strong>Precio Normal: </strong>
              <span>${data.normalPrice}</span>
            </p>
            <p>
              <strong>Precio Aliado: </strong>
              <span>${data.alliancePrice}</span>
            </p>
            <p>
              <strong>Descripcion: </strong>
              <span>{data.description}</span>
            </p>
          </div>
          <ContainerImages>
            {data.images.map((image, index) => {
              return (
                <Image
                  key={index}
                  src={image.url}
                  alt={"amv_kid_shoe"}
                  width={150}
                  height={150}
                  rounded
                  className="hover:scale-110 hover:shadow-purple-600 hover:shadow-xl transition duration-300 ease-in-out border-1 border-purple-300 "
                />
              );
            })}
          </ContainerImages>

          <div>
            <div className="d-flex justify-content-start pb-3">
              <ButtonProfile onClick={handleShow}>Agregar Stock</ButtonProfile>
            </div>
          </div>

          <div>
            {data.stocks.length > 0 ? (
              <StockTable
                stocks={data.stocks}
                refresh={refresh}
                idModel={idModel}
              />
            ) : (
              <p>No hay stock disponible</p>
            )}
          </div>

          <Modal
            show={show}
            onHide={handleClose}
            keyboard={false}
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Agregar Stock</Modal.Title>
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
                        className=""
                        controlId="formBasicNombreCompleto"
                      >
                        <Form.Label>Talla</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Escibe aqui el talla del modelo"
                          name="size"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.size}
                          className={
                            touched.size && errors.size ? "is-invalid" : ""
                          }
                        />
                        <ErrorMessage
                          name="size"
                          component="div"
                          className="invalid-feedback"
                        />
                      </Form.Group>
                      <Form.Group
                        className=""
                        controlId="formBasicNombreCompleto"
                      >
                        <Form.Label>Cantidad</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Escibe aqui la cantidad de unidades de esa talla"
                          name="quantity"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.quantity}
                          className={
                            touched.quantity && errors.quantity
                              ? "is-invalid"
                              : ""
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
                            "Agregar"
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
        </>
      )}
    </div>
  );
};
