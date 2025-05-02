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

export const ProductDetailCurva2 = ({ data }) => {
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
      {data && (
        <>
          <GridRowStyled className="justify-content-center mb-5">
            <GridColStyled md={10} lg={8}>
              <HeadingStyled as="h4" className="mb-3 text-secondary">
                Detalles de la Curva Hombre
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
              Curva Hombre
            </ButtonPrimaryStyled>
          </div>
        </>
      )}
    </PageContainerStyled>
  );
};
