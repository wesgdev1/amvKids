import { Button, Card } from "react-bootstrap";
import { ButtonCardStyled, ShoesCardStyled } from "../StyledComponents";
import { CardDescroptionStyle } from "./StyledComponents";
import { useNavigate } from "react-router-dom";

export const ShoeCard = ({ model }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/productos/${model.id}`);
  };

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
          <Card.Text
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.7)",
            }}
            className="text-center"
          >
            {model.price.toLocaleString("es-CO")} COP
          </Card.Text>
          <div className="d-flex justify-center ">
            <ButtonCardStyled onClick={handleClick}>
              Ver Detalle
            </ButtonCardStyled>
          </div>
        </Card.Body>
      </ShoesCardStyled>
    </>
  );
};
