import { Form, Image } from "react-bootstrap";
import { Zenitho } from "uvcanvas";
import {
  ButtonStyled,
  FormStyled,
  NavLinkStyled,
} from "../components/StyledComponents";

export const Login = () => {
  return (
    <div>
      <Zenitho />
      <FormStyled>
        <div className="d-flex justify-center pb-3">
          <Image
            src="https://res.cloudinary.com/dppqkypts/image/upload/v1709156443/AMV_LOGO_1_nx3ofa.png"
            width={70}
          />
        </div>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Correo electronico</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            Nunca compartiremos tu correo con nadie mas.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Recordar contraseña" />
        </Form.Group>
        <div className="d-flex justify-center">
          <ButtonStyled variant="primary" type="submit">
            Iniciar sesion
          </ButtonStyled>
        </div>
        <div>
          <p className="text-center pt-4">¿No tienes cuenta?</p>
          <div className="d-flex justify-center">
            <NavLinkStyled to={"/signup"}>
              <p className="text-center">Registrate Aqui</p>
            </NavLinkStyled>
          </div>
        </div>
      </FormStyled>
    </div>
  );
};
