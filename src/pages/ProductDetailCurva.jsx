import { useParams, useNavigate } from "react-router-dom";
import { useModel } from "../domain/models/useModel";
import {
  PageContainerStyled,
  GridRowStyled,
  GridColStyled,
  ImageStyled,
  TableStyled,
  AlertStyled,
  ButtonPrimaryStyled,
  ButtonSecondaryStyled,
  HeadingStyled,
  IconStyled,
} from "../components/StyledComponents";
import { CustomLoader } from "../components/common/CustomLoader";

export const ProductDetailCurva = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { id } = params;

  const { data, loading, error } = useModel(id);

  const totalPares = 12;
  const stockDetailsString = "1/37, 2/38, 3/39, 2/40, 2/41, 1/42, 1/43";
  let descripcion = "Sin descripción.";
  let pricePerPair = 0; // Precio por par
  let finalCurvePrice = 0; // Precio final con descuento

  if (data) {
    descripcion = data.description || "Sin descripción.";
    // Asumiendo que data.price es el precio por par para la curva
    pricePerPair = data.price || 0;
    if (pricePerPair > 0) {
      finalCurvePrice = pricePerPair * totalPares * 0.9; // Aplicar 10% descuento
    }
  }

  const handleAgregarClick = () => {
    console.log(`Agregar curva ID: ${data?.id}, Nombre: ${data?.name}`);
  };

  return (
    <PageContainerStyled className="py-5">
      <ButtonSecondaryStyled
        onClick={() => navigate(-1)}
        className="mb-4 d-inline-flex align-items-center"
      >
        <IconStyled className="bi bi-arrow-left"></IconStyled> Volver
      </ButtonSecondaryStyled>

      {loading && <CustomLoader />}
      {error && <AlertStyled variant="danger">{error}</AlertStyled>}

      {data && (
        <>
          <HeadingStyled as="h2" className="mb-4">
            {data.name}
          </HeadingStyled>

          <GridRowStyled className="g-3 mb-5 justify-content-center">
            {data.images && data.images.length > 0 ? (
              data.images.map((image) => (
                <GridColStyled xs={6} sm={4} md={3} key={image.id || image.url}>
                  <ImageStyled
                    src={image.url}
                    alt={`Imagen de ${data.name}`}
                    fluid
                    thumbnail
                    className="h-100 object-fit-contain"
                    style={{ aspectRatio: "1 / 1" }}
                  />
                </GridColStyled>
              ))
            ) : (
              <GridColStyled xs={12}>
                <AlertStyled variant="secondary">
                  No hay imágenes disponibles.
                </AlertStyled>
              </GridColStyled>
            )}
          </GridRowStyled>

          <GridRowStyled className="justify-content-center mb-5">
            <GridColStyled md={10} lg={8}>
              <HeadingStyled as="h4" className="mb-3 text-secondary">
                Detalles de la Curva
              </HeadingStyled>
              <TableStyled bordered hover responsive>
                <tbody>
                  <tr>
                    <td className="fw-semibold" style={{ width: "35%" }}>
                      <IconStyled className="bi bi-box-fill"></IconStyled>Total
                      Pares
                    </td>
                    <td>{totalPares}</td>
                  </tr>
                  <tr>
                    <td className="fw-semibold">
                      <IconStyled className="bi bi-list-ol"></IconStyled>Detalle
                      (Cantidad/Talla)
                    </td>
                    <td>{stockDetailsString}</td>
                  </tr>
                  <tr>
                    <td className="fw-semibold">
                      <IconStyled className="bi bi-tag-fill"></IconStyled>Precio
                      por Par
                    </td>
                    <td>
                      {pricePerPair.toLocaleString("es-CO", {
                        style: "currency",
                        currency: "COP",
                        minimumFractionDigits: 0,
                      })}
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-semibold">
                      <IconStyled className="bi bi-cash-coin"></IconStyled>
                      Precio Curva (10% Desc.)
                    </td>
                    <td className="fw-bold text-success">
                      {finalCurvePrice.toLocaleString("es-CO", {
                        style: "currency",
                        currency: "COP",
                        minimumFractionDigits: 0,
                      })}
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-semibold">
                      <IconStyled className="bi bi-info-circle-fill"></IconStyled>
                      Descripción
                    </td>
                    <td>{descripcion}</td>
                  </tr>
                </tbody>
              </TableStyled>
            </GridColStyled>
          </GridRowStyled>

          <div className="text-center mt-4">
            <ButtonPrimaryStyled
              size="lg"
              onClick={handleAgregarClick}
              className="px-5 py-2 d-inline-flex align-items-center"
            >
              <IconStyled className="bi bi-cart-plus-fill"></IconStyled> Agregar
              Curva
            </ButtonPrimaryStyled>
          </div>
        </>
      )}
    </PageContainerStyled>
  );
};
