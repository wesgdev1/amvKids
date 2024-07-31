import { ErrorMessage, Formik } from "formik";
import { Alert, Col, Form, Row, Spinner } from "react-bootstrap";
import { ButtonStyled } from "../StyledComponents";
import { useState } from "react";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { createModel } from "../../api/model/model";

const nameRqd = z.string({
  required_error: "El nombre del modelo es requerido",
});

const priceRqd = z.number({
  required_error: "El precio del modelo es requerido",
});

const imageRqd = z.any().optional();
const descriptionRqd = z.string({
  required_error: "La descripcion del modelo es requerida",
});

const referenceRqd = z.string({
  required_error: "La referencia del modelo es requerida",
});

const modelSchema = z.object({
  name: nameRqd,
  price: priceRqd,
  image: imageRqd,
  description: descriptionRqd,
  reference: referenceRqd,
});

export const ModelForm = () => {
  const params = useParams();
  const { idProduct } = params;

  const navigate = useNavigate();
  const initialValues = {
    name: "",
    price: "",
    image: "",
    description: "",
    reference: "",
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

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      setSubmitting(true);
      setError(false);
      setErrorMessage("");

      const formData = new FormData();
      formData.append("productId", idProduct);
      formData.append("name", values.name);
      formData.append("price", values.price);
      formData.append("description", values.description);
      formData.append("reference", values.reference);

      if (values.images && values.images.length > 0) {
        values.images.forEach((file) => {
          formData.append("images", file);
        });
      }

      await addModel(formData);
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
      <h4 className="pb-3">
        <i className="bi bi-box2-fill"> </i>Agregar un nuevo modelo
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
                <Form.Label>Referencia</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Escibe aqui la referencia"
                  name="reference"
                  style={{ width: "50%" }}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.reference}
                  className={
                    touched.reference && errors.reference ? "is-invalid" : ""
                  }
                />
                <ErrorMessage
                  name="reference"
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

              <Form.Group
                className="align-items-center"
                controlId="formProdFileIMG"
              >
                <Form.Label>Imagenes del modelo</Form.Label>
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
                    "Agregar modelo"
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
