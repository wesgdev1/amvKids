import { Button, Card } from "react-bootstrap";
import { ButtonCardStyled, ShoesCardStyled } from "../StyledComponents";

export const ShoeCard = () => {
  return (
    <>
      <ShoesCardStyled>
        <Card.Img
          variant="top"
          src="https://res.cloudinary.com/dppqkypts/image/upload/v1709309601/Dise%C3%B1o_sin_t%C3%ADtulo_32_xuo2rc.png"
        />
        <Card.Body>
          <Card.Title>🔥Jordan Dub Zero🔥</Card.Title>
          <Card.Text>
            Las nuevas Air Jordan Dub Zero son uno de los nuevos hot drop de
            Foot Locker para este comienzo de 2024.
          </Card.Text>
          <Card.Text className="fs-4">$65.000</Card.Text>
          <div className="d-flex justify-center ">
            <ButtonCardStyled>Ver Detalle</ButtonCardStyled>
          </div>
        </Card.Body>
      </ShoesCardStyled>
    </>
  );
};
