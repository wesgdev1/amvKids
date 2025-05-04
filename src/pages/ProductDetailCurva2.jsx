/* eslint-disable react/prop-types */
import {
  PageContainerStyled,
  GridRowStyled,
  GridColStyled,
  TableStyled,
  ButtonPrimaryStyled,
  HeadingStyled,
  IconStyled,
} from "../components/StyledComponents";
import { useCartCurvas } from "../store/curvas";
import Swal from "sweetalert2";

export const ProductDetailCurva2 = ({ data }) => {
  const totalPares = 12;
  const stockDetailsString = "1/37, 2/38, 3/39, 2/40, 2/41, 1/42, 1/43";
  let pricePerPair = 0; // Precio por par
  let finalCurvePrice = 0; // Precio final con descuento
  const { dispatch } = useCartCurvas();

  if (data) {
    pricePerPair = data.price || 0;
    if (pricePerPair > 0) {
      finalCurvePrice = pricePerPair * totalPares * 0.9; // Aplicar 10% descuento
    }
  }

  const handleAgregarClick = () => {
    if (!data) return;

    const itemCurva = {
      id: data.id,
      name: data.name,
      color: data.color,
      tipoCurva: "Hombre",
      precioCurva: finalCurvePrice,
      detalleCurva: stockDetailsString,
      imageUrl:
        data.images && data.images.length > 0 ? data.images[0].url : null,
    };

    dispatch({
      type: "ADD_TO_CART",
      payload: {
        item: itemCurva,
        quantity: 1,
      },
    });

    Swal.fire({
      icon: "success",
      title: "¡Curva Agregada!",
      text: `Se agregó la curva ${itemCurva.name} (${itemCurva.color}) al carrito.`,
      timer: 1500,
      showConfirmButton: false,
    });
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
              disabled={!data || finalCurvePrice <= 0}
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
