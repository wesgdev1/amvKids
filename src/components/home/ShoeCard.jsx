import { Button, Card } from "react-bootstrap";
import { ButtonCardStyled, ShoesCardStyled } from "../StyledComponents";
import { CardDescroptionStyle } from "./StyledComponents";

export const ShoeCard = ({ model }) => {
  return (
    <>
      <ShoesCardStyled>
        <Card.Img
          variant="top"
          src={model.images[0]?.url || "https://via.placeholder.com/150"}
        />
        <Card.Body>
          <Card.Title>{model.name}</Card.Title>
          <CardDescroptionStyle>{model.description}</CardDescroptionStyle>
          <Card.Text>{model.price} COP</Card.Text>
          <div className="d-flex justify-center ">
            <ButtonCardStyled>Ver Detalle</ButtonCardStyled>
          </div>
        </Card.Body>
      </ShoesCardStyled>
    </>
  );
};
