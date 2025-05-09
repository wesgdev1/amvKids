import { ErrorMessage, Formik } from "formik";
import { Alert, Button, Form, Spinner } from "react-bootstrap";
import { ButtonStyled } from "../StyledComponents";
import { useState } from "react";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import Swal from "sweetalert2";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { createModel, updateModel } from "../../api/model/model";
import {
  FormContainer,
  FormGroup,
  FormWrapper,
  ImagePreviewContainer,
  ImagePreview,
  SectionTitle,
} from "./StyledComponents";

const nameRqd = z.string({
  required_error: "El nombre del modelo es requerido",
});

const normalPrice = z
  .number({
    required_error: "El precio del modelo es requerido",
    invalid_type_error: "El precio debe ser un número",
  })
  .positive({ message: "El precio debe ser un número positivo" });

const priceRqd = z
  .number({
    required_error: "El precio del modelo es requerido",
    invalid_type_error: "El precio de reventa debe ser un número",
  })
  .positive({ message: "El precio de reventa debe ser un número positivo" });

const basePrice = z
  .number({
    required_error: "El precio del modelo a nivel de fabricante es requerido",
    invalid_type_error: "El precio fabricante debe ser un número",
  })
  .positive({ message: "El precio de reventa debe ser un número positivo" });

const alliancePrice = z
  .number({
    required_error: "El precio del modelo es requerido",
    invalid_type_error: "El precio para aliado debe ser un número",
  })
  .positive({ message: "El precio para aliado debe ser un número positivo" });

const imageRqd = z.any().optional();
const descriptionRqd = z.string({
  required_error: "La descripcion del modelo es requerida",
});

const colorRqd = z.string({
  required_error: "El color del modelo es requerido",
});

const modelSchema = z
  .object({
    name: nameRqd,
    normalPrice: normalPrice,
    price: priceRqd,
    alliancePrice: alliancePrice,
    image: imageRqd,
    description: descriptionRqd,
    color: colorRqd,
    isPromoted: z.boolean().optional().default(false),
    pricePromoted: z
      .number({
        invalid_type_error: "El precio de promoción debe ser un número",
      })
      .positive({ message: "El precio de promoción debe ser mayor a cero" })
      .optional(),
    basePrice: basePrice,
  })
  .superRefine((data, ctx) => {
    if (
      data.isPromoted &&
      (data.pricePromoted === undefined ||
        data.pricePromoted === null ||
        data.pricePromoted <= 0)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "El precio de promoción es requerido y debe ser mayor a cero si el modelo está promocionado.",
        path: ["pricePromoted"],
      });
    }
    // Opcional: si no está promocionado y hay un precio, se podría limpiar,
    // pero Zod ya lo marca como opcional, y la lógica de UI lo oculta.
  });

export const ModelForm = () => {
  const params = useParams();
  const { idProduct } = params;
  const location = useLocation();
  const actionEdit = location.state?.modelo;

  const navigate = useNavigate();
  const initialValues = {
    name: actionEdit?.name || "",
    normalPrice: actionEdit?.normalPrice || "",
    price: actionEdit?.price || "",
    alliancePrice: actionEdit?.alliancePrice || "",
    images: [],
    description: actionEdit?.description || "",
    color: actionEdit?.color || "",
    isPromoted: actionEdit?.isPromoted || false,
    pricePromoted: actionEdit?.pricePromoted || "",
    basePrice: actionEdit?.basePrice || "",
  };

  const [error, setError] = useState(false);
  // eslint-disable-next-line no-unused-vars
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
      navigate(`/profile/products/${idProduct}/models`, { replace: true });
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
      const response = await updateModel(actionEdit.id, values);

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
      navigate(`/profile/products/${idProduct}/models`, { replace: true });
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
      formData.append("basePrice", values.basePrice);

      // Manejo de isPromoted y pricePromoted
      formData.append("isPromoted", String(values.isPromoted)); // Enviar como string "true" o "false"
      if (values.isPromoted && values.pricePromoted) {
        formData.append("pricePromoted", values.pricePromoted);
      } else if (!values.isPromoted) {
        // Opcional: Si no está promocionado, explícitamente no enviar pricePromoted o enviar null
        // Actualmente, si no está en el if, simplemente no se añade, lo cual es usualmente correcto.
      }

      if (values.images && values.images.length > 0) {
        values.images.forEach((file) => {
          formData.append("images", file);
        });
      }

      if (actionEdit) {
        await editModel(formData);
      } else {
        await addModel(formData);
      }
    } catch (error) {
      const message =
        error.message || "Ocurrió un error al procesar el modelo.";
      setError(true); // Marcar que hubo un error para mostrar la alerta genérica
      setErrorMessage(message); // Guardar mensaje específico si se quiere mostrar
      Swal.fire({
        icon: "error",
        title: actionEdit ? "Modelo no editado" : "Modelo no creado",
        text: message, // Mostrar mensaje más específico del error si es posible
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <FormContainer>
      <div className="w-100 d-flex flex-column align-items-center">
        <div className="w-100 d-flex justify-content-start mb-4">
          <Button
            variant="outline-secondary"
            onClick={() => {
              navigate(`/profile/products/${idProduct}/models`);
            }}
          >
            <i className="bi bi-arrow-left me-2"></i>Volver
          </Button>
        </div>
        <h4 className="pb-3 text-center">
          <i
            className={`bi ${
              actionEdit ? "bi-pencil-square" : "bi-box2-fill"
            } me-2`}
          ></i>
          {actionEdit ? "Editar Modelo" : "Agregar Modelo"}
        </h4>

        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={toFormikValidationSchema(modelSchema)}
          enableReinitialize
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
            <FormWrapper>
              <Form
                className="d-flex flex-column w-100 align-items-center"
                onSubmit={handleSubmit}
              >
                {error && (
                  <Alert
                    variant="danger"
                    className="mb-4 w-100 mx-auto"
                    style={{ maxWidth: "800px" }}
                  >
                    {errorMessage ||
                      "Hubo un error, por favor inténtalo nuevamente."}
                  </Alert>
                )}
                <FormGroup controlId="formBasicNombreCompleto">
                  <Form.Label>Nombre del modelo</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Escibe aqui el nombre del modelo"
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
                </FormGroup>

                <FormGroup controlId="formBasicColor">
                  <Form.Label>Color</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Escibe aqui el color"
                    name="color"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.color}
                    className={
                      touched.color && errors.color ? "is-invalid" : ""
                    }
                  />
                  <ErrorMessage
                    name="color"
                    component="div"
                    className="invalid-feedback"
                  />
                </FormGroup>

                <FormGroup controlId="formBasicDescripcion">
                  <Form.Label>Descripcion del modelo</Form.Label>
                  <Form.Control
                    as={"textarea"}
                    rows={3}
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
                </FormGroup>

                <FormGroup controlId="formBasicPrecioFabricante">
                  <Form.Label>Precio fabricante</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Ej: 50000"
                    name="basePrice"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.basePrice}
                    className={
                      touched.basePrice && errors.basePrice ? "is-invalid" : ""
                    }
                  />
                  <ErrorMessage
                    name="basePrice"
                    component="div"
                    className="invalid-feedback"
                  />
                </FormGroup>
                <FormGroup controlId="formBasicPrecioNormal">
                  <Form.Label>Precio del modelo (Minorista)</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Ej: 70000"
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
                </FormGroup>

                <FormGroup controlId="formBasicPrecioReventa">
                  <Form.Label>Precio de reventa</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Ej: 65000"
                    name="price"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.price}
                    className={
                      touched.price && errors.price ? "is-invalid" : ""
                    }
                  />
                  <ErrorMessage
                    name="price"
                    component="div"
                    className="invalid-feedback"
                  />
                </FormGroup>
                <FormGroup controlId="formBasicPrecioAliado">
                  <Form.Label>Precio para aliado</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Ej: 60000"
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
                </FormGroup>

                {actionEdit && (
                  <>
                    <hr className="my-4 w-100" />
                    <SectionTitle>Configuración de Promoción</SectionTitle>
                    <FormGroup controlId="formIsPromoted" className="mb-3">
                      <Form.Check
                        type="switch"
                        id="isPromoted-switch"
                        label="¿Modelo en promoción?"
                        name="isPromoted"
                        checked={values.isPromoted}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                          touched.isPromoted && errors.isPromoted
                            ? "is-invalid"
                            : ""
                        }
                      />
                      <ErrorMessage
                        name="isPromoted"
                        component="div"
                        className="invalid-feedback"
                      />
                    </FormGroup>

                    {values.isPromoted && (
                      <FormGroup controlId="formPricePromoted">
                        <Form.Label>Precio de Promoción</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Ej: 55000"
                          name="pricePromoted"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.pricePromoted}
                          className={
                            touched.pricePromoted && errors.pricePromoted
                              ? "is-invalid"
                              : ""
                          }
                        />
                        <ErrorMessage
                          name="pricePromoted"
                          component="div"
                          className="invalid-feedback"
                        />
                      </FormGroup>
                    )}
                    <hr className="my-4 w-100" />
                  </>
                )}

                <SectionTitle>Imágenes del Modelo</SectionTitle>
                <FormGroup controlId="formProdFileIMG">
                  {actionEdit?.images?.length > 0 && (
                    <ImagePreviewContainer>
                      {actionEdit.images.map((image) => (
                        <ImagePreview key={image.id}>
                          <img src={image.url} alt={image.name || image.id} />
                        </ImagePreview>
                      ))}
                    </ImagePreviewContainer>
                  )}

                  <p className="text-muted mt-3 mb-2 small">
                    {actionEdit
                      ? "Reemplazar o añadir imágenes (3 o más recomendadas)."
                      : "Adjunta (3) o más imagenes del modelo."}
                  </p>
                  <Form.Control
                    type="file"
                    multiple
                    size="sm"
                    name="images"
                    accept=".jpg, .jpeg, .png, .webp"
                    onChange={(e) => {
                      const files = Array.from(e.currentTarget.files);
                      setFieldValue("images", files);
                    }}
                    className={
                      touched.images && errors.images ? "is-invalid" : ""
                    }
                  />
                  <ErrorMessage
                    name="images"
                    component="div"
                    className="invalid-feedback"
                  />
                </FormGroup>

                <div className="d-flex justify-content-center mt-5 mb-3">
                  <ButtonStyled
                    variant="primary"
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="px-5 py-2"
                  >
                    {!isSubmitting ? (
                      actionEdit ? (
                        <>
                          <i className="bi bi-check-lg me-2"></i>Actualizar
                          Modelo
                        </>
                      ) : (
                        <>
                          <i className="bi bi-plus-lg me-2"></i>Crear Modelo
                        </>
                      )
                    ) : (
                      <Spinner
                        as="span"
                        animation="grow"
                        role="status"
                        aria-hidden="true"
                        size="sm"
                      />
                    )}
                  </ButtonStyled>
                </div>
              </Form>
            </FormWrapper>
          )}
        </Formik>
      </div>
    </FormContainer>
  );
};
