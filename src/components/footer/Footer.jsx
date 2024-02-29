import { Container } from "react-bootstrap";

export const Footer = () => {
  return (
    <>
      <div className="pt-10">
        <div
          style={{
            height: "100px",
            width: "100%",
            backgroundImage:
              "url('https://res.cloudinary.com/dppqkypts/image/upload/v1709176003/Dise%C3%B1o_sin_t%C3%ADtulo_31_vtsmze.png')",
          }}
        ></div>
        <Container>
          <div className="d-flex justify-content-center gap-3 pt-10 align-items-center">
            <div>
              <h4>AMV</h4>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Maecenas ac massa sem. Etiam in diam auctor, porttitor ex id,
                luctus libero.
              </p>
            </div>
            <div>
              <h4>Redes Sociales</h4>
              <ul>
                <li>Facebook</li>
                <li>Twitter</li>
                <li>Instagram</li>
              </ul>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};
