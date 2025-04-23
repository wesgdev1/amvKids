import { useParams } from "react-router-dom";
import { useModel } from "../../domain/models/useModel";
import { Alert, Button, Form, Image, Modal, Spinner } from "react-bootstrap";
import { StockTable } from "./StockTable";
import { ContainerImages, ImageWrapper } from "./StyledComponents";
import { ButtonProfile } from "../products/StyledComponents";
import { useState } from "react";
import { ErrorMessage, Formik } from "formik";
import { set, z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { ButtonCardStyled, ButtonStyled } from "../StyledComponents";
import Swal from "sweetalert2";
import { createStock } from "../../api/stock/stock";
import {
  addPhotoModel,
  deletePhotoModel,
  updatePhotoModel,
} from "../../api/model/model";

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

  const handleButtonClick = async (image) => {
    // busca en las otras imaagenes si hay una imagen principal definida , si la y muestro un alert donde diga que primero debe desmarcar la imagen principal
    const isPrimary = data.images.some(
      (img) => img.isPrimary && img.id !== image.id
    );
    if (isPrimary) {
      Swal.fire({
        icon: "warning",
        title: "Imagen Principal",
        text: "Primero debes desmarcar la imagen principal",
      });
    } else {
      try {
        const response = await updatePhotoModel(image.id, {
          isPrimary: !image.isPrimary,
        });
        if (response) {
          Swal.fire({
            icon: "success",
            title: "Imagen Principal Actualizada",
            text: "La imagen principal se actualizo correctamente",
          });
          refresh(idModel);
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "No se pudo actualizar la imagen principal",
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

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

  const handleUploadImages = async (formData) => {
    try {
      Swal.fire({
        title: "Cargando...",
        text: "Por favor espera mientras se cargan las imágenes.",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const response = await addPhotoModel(formData);
      Swal.close();

      if (response) {
        Swal.fire({
          icon: "success",
          title: "Imágenes Cargadas",
          text: "Las imágenes se han cargado correctamente.",
        });
        refresh(idModel);
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudieron cargar las imágenes. Intenta nuevamente.",
        });
      }
    } catch (error) {
      Swal.close();
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un error al cargar las imágenes. Intenta nuevamente.",
      });
      console.log(error);
    }
  };

  const handleDeleteClick = (image) => {
    Swal.fire({
      title: "Eliminar Imagen",
      text: "¿Estás seguro de que deseas eliminar esta imagen?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await deletePhotoModel(image.id);
          if (response) {
            Swal.fire({
              icon: "success",
              title: "Imagen Eliminada",
              text: "La imagen se ha eliminado correctamente.",
            });
            refresh(idModel);
          } else {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "No se pudo eliminar la imagen. Intenta nuevamente.",
            });
          }
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Ocurrió un error al eliminar la imagen. Intenta nuevamente.",
          });
        }
      }
    });
  };

  const handleRecommendClick = async (image) => {
    const isRecommended = data.images.some(
      (img) => img.isRecommended && img.id !== image.id
    );
    if (isRecommended) {
      Swal.fire({
        icon: "warning",
        title: "Imagen Recomendada",
        text: "Primero debes desmarcar la imagen recomendada",
      });
    } else {
      try {
        const response = await updatePhotoModel(image.id, {
          isRecommended: !image.isRecommended,
        });
        if (response) {
          Swal.fire({
            icon: "success",
            title: "Imagen Recomendada Actualizada",
            text: "La imagen recomendada se actualizo correctamente",
          });
          refresh(idModel);
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "No se pudo actualizar la imagen recomendada",
          });
        }
      } catch (error) {
        console.log(error);
      }
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
          {!data.images.some((image) => image.isPrimary) && (
            <Alert variant="warning">
              No hay ninguna imagen de portada, por defecto se colocará de
              manera aleatoria.
            </Alert>
          )}
          <ContainerImages>
            {data.images.map((image, index) => {
              return (
                <ImageWrapper key={index}>
                  <Image
                    src={image.url}
                    alt={"amv_kid_shoe"}
                    width={150}
                    height={150}
                    rounded
                    className={`hover:scale-110 transition duration-300 ease-in-out border-1 ${
                      image.isPrimary
                        ? "border-green-500 shadow-green-500"
                        : "border-red-500 shadow-red-500"
                    }`}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: "5px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      display: "flex",
                      gap: "5px",
                    }}
                  >
                    <Button
                      variant="light"
                      onClick={() => handleButtonClick(image)}
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                        fontSize: "0.7em",
                        padding: "0.2em 0.5em",
                      }}
                    >
                      {image.isPrimary ? (
                        <i className="bi bi-eye-slash"></i>
                      ) : (
                        <i className="bi bi-eye-fill"></i>
                      )}
                    </Button>
                    <Button
                      variant="light"
                      onClick={() => handleDeleteClick(image)}
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                        fontSize: "0.7em",
                        padding: "0.2em 0.5em",
                      }}
                    >
                      <i className="bi bi-trash"></i>
                    </Button>
                    <Button
                      variant="light"
                      onClick={() => handleRecommendClick(image)}
                      style={{
                        backgroundColor: image.isRecommended
                          ? "yellow"
                          : "rgba(255, 255, 255, 0.8)",
                        fontSize: "0.7em",
                        padding: "0.2em 0.5em",
                      }}
                    >
                      <i className="bi bi-star"></i>
                    </Button>
                  </div>
                </ImageWrapper>
              );
            })}
            <ImageWrapper
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px dashed #ccc",
                cursor: "pointer",
                width: "150px",
                height: "150px",
              }}
            >
              <input
                //type de fotos
                type="file"
                accept="image/*"
                multiple
                style={{ display: "none" }}
                id="upload-images"
                onChange={(e) => {
                  const files = e.target.files;
                  const formData = new FormData();
                  for (let i = 0; i < files.length; i++) {
                    formData.append("images", files[i]);
                  }
                  //imprimir la primera posicion del formData
                  formData.append("idModel", idModel);

                  handleUploadImages(formData);
                }}
              />
              <label
                htmlFor="upload-images"
                style={{
                  cursor: "pointer",
                  padding: "10px",
                  textAlign: "center",
                }}
              >
                <i
                  className="bi bi-upload"
                  style={{ fontSize: "2em", color: "#ccc" }}
                ></i>
                <p style={{ margin: 0, fontSize: "0.9em", color: "#666" }}>
                  Subir imágenes
                </p>
              </label>
            </ImageWrapper>
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
