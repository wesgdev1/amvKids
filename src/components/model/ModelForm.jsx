import { ErrorMessage, Formik } from "formik";
import { Alert, Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { ButtonStyled } from "../StyledComponents";
import { useState } from "react";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import Swal from "sweetalert2";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { createModel } from "../../api/model/model";

const nameRqd = z.string({
  required_error: "El nombre del modelo es requerido",
});

const normalPrice = z.number({
  required_error: "El precio del modelo es requerido",
});

const priceRqd = z.number({
  required_error: "El precio del modelo es requerido",
});

const alliancePrice = z.number({
  required_error: "El precio del modelo es requerido",
});
const imageRqd = z.any().optional();
const descriptionRqd = z.string({
  required_error: "La descripcion del modelo es requerida",
});

const colorRqd = z.string({
  required_error: "El color del modelo es requerido",
});

const modelSchema = z.object({
  name: nameRqd,
  normalPrice: normalPrice,
  price: priceRqd,
  alliancePrice: alliancePrice,
  image: imageRqd,
  description: descriptionRqd,

  color: colorRqd,
});

export const ModelForm = () => {
  const params = useParams();
  const { idProduct } = params;
  const location = useLocation();
  const actionEdit = location.state?.modelo;

  const navigate = useNavigate();
  const initialValues = {
    name: "" || actionEdit?.name,
    normalPrice: "" || actionEdit?.normalPrice,
    price: "" || actionEdit?.price,
    alliancePrice: "" || actionEdit?.alliancePrice,
    image: "" || actionEdit?.image,
    description: "" || actionEdit?.description,
    color: "" || actionEdit?.color,
  };

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const addModel = async (values) => {
    try {
      const response = await createModel(values);
      if (response) {
        Swal.fire({
          icon: "success",
          title: "Modelo Creado",
          text: "El modelo se creo correctamente",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Modelo no creado",
          text: "El Modelo no se creo correctamente, intenta nuevamente",
        });
      }
      navigate("/profile/products", { replace: true });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Modelo no creado",
        text: "El Modelo no se creo correctamente, intenta nuevamente",
      });
    }
  };

  const editModel = async (values) => {
    try {
      const response = await createModel(values);
      if (response) {
        Swal.fire({
          icon: "success",
          title: "Modelo Editado",
          text: "El modelo se edito correctamente",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Modelo no editado",
          text: "El Modelo no se edito correctamente, intenta nuevamente",
        });
      }
      navigate("/profile/products", { replace: true });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Modelo no editado",
        text: "El Modelo no se edito correctamente, intenta nuevamente",
      });

      console.log("error", error);
    }
  };

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      setSubmitting(true);
      setError(false);
      setErrorMessage("");

      const formData = new FormData();
      formData.append("productId", idProduct);
      formData.append("name", values.name);
      formData.append("normalPrice", values.normalPrice);
      formData.append("price", values.price);
      formData.append("alliancePrice", values.alliancePrice);
      formData.append("description", values.description);
      formData.append("color", values.color);
      // formData.append("reference", values.reference);

      if (values.images && values.images.length > 0) {
        values.images.forEach((file) => {
          formData.append("images", file);
        });
      }

      // await addModel(formData);
      if (actionEdit) {
        // await editModel(formData);
        console.log("formData", formData);
      } else {
        await addModel(formData);
      }
      console.log("formData", formData);
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
          navigate(`/profile/products/${idProduct}/models`);
        }}
      >
        Volver
      </Button>
      <h4 className="pb-3">
        <i className="bi bi-box2-fill"> </i>
        {actionEdit ? "Editar Modelo" : "Agregar Modelo"}
      </h4>

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
                <Form.Label>Nombre del modelo</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Escibe aqui el nombre del modelo"
                  name="name"
                  style={{ width: "50%" }}
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
                <Form.Label>Color</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Escibe aqui el color"
                  name="color"
                  style={{ width: "50%" }}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.color}
                  className={touched.color && errors.color ? "is-invalid" : ""}
                />
                <ErrorMessage
                  name="color"
                  component="div"
                  className="invalid-feedback"
                />
              </Form.Group>

              <Form.Group className="" controlId="formBasicNombreCompleto">
                <Form.Label>Descripcion del modelo</Form.Label>
                <Form.Control
                  as={"textarea"}
                  role={2}
                  style={{ width: "50%" }}
                  placeholder="Escibe aqui la descripcion del modelo"
                  name="description"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.description}
                  className={
                    touched.description && errors.description
                      ? "is-invalid"
                      : ""
                  }
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="invalid-feedback"
                />
              </Form.Group>
              <Form.Group className="" controlId="formBasicNombreCompleto">
                <Form.Label>Precio del modelo</Form.Label>
                <Form.Control
                  type="number"
                  style={{ width: "50%" }}
                  placeholder="Escibe aqui el precio del modelo"
                  name="normalPrice"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.normalPrice}
                  className={
                    touched.normalPrice && errors.normalPrice
                      ? "is-invalid"
                      : ""
                  }
                />
                <ErrorMessage
                  name="normalPrice"
                  component="div"
                  className="invalid-feedback"
                />
              </Form.Group>

              <Form.Group className="" controlId="formBasicNombreCompleto">
                <Form.Label>Precio de reventa</Form.Label>
                <Form.Control
                  type="number"
                  style={{ width: "50%" }}
                  placeholder="Escibe aqui el precio del modelo"
                  name="price"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.price}
                  className={touched.price && errors.price ? "is-invalid" : ""}
                />
                <ErrorMessage
                  name="price"
                  component="div"
                  className="invalid-feedback"
                />
              </Form.Group>
              <Form.Group className="" controlId="formBasicNombreCompleto">
                <Form.Label>Precio para aliado</Form.Label>
                <Form.Control
                  type="number"
                  style={{ width: "50%" }}
                  placeholder="Escibe aqui el precio del modelo"
                  name="alliancePrice"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.alliancePrice}
                  className={
                    touched.alliancePrice && errors.alliancePrice
                      ? "is-invalid"
                      : ""
                  }
                />
                <ErrorMessage
                  name="alliancePrice"
                  component="div"
                  className="invalid-feedback"
                />
              </Form.Group>

              <Form.Group
                className="align-items-center"
                controlId="formProdFileIMG"
              >
                <Form.Label>Imagenes del modelo</Form.Label>
                {actionEdit?.images.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
                    {actionEdit.images.map((image) => (
                      <div
                        key={image.id}
                        className="relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                      >
                        <img
                          src={image.url}
                          alt={image.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                    ))}
                  </div>
                )}
                <p className="font-semibold text-purple-500">
                  Adjunta (3) o mas imagenes del modelo{" "}
                </p>
                <Form.Control
                  style={{ width: "50%" }}
                  type="file"
                  multiple
                  size="sm"
                  name="images"
                  accept=".jpg, .jpeg, .png"
                  onChange={(e) => {
                    // const file = e.currentTarget.files[0];
                    const file = Array.from(e.currentTarget.files);
                    setFieldValue("images", file);
                  }}
                  //onBlur={handleBlur}
                  // value={values.name}
                  className={
                    touched.images && errors.images ? "is-invalid" : ""
                  }
                />
                <ErrorMessage
                  name="images"
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
                      "Crear Modelo"
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
