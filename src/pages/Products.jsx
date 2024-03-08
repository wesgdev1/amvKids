import { Accordion, Col, Container, Row } from "react-bootstrap";
import { ShoeCard } from "../components/home/ShoeCard";

export const Products = () => {
  return (
    <Container>
      <Row className="my-5 ">
        <div className="pt-8 mb-8">Productos</div>
        <hr />
      </Row>
      <Row>
        <Col md={4}>
          <div
            style={{
              backgroundColor: "red",
              height: "100%",
            }}
          >
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Accordion Item #1</Accordion.Header>
                <Accordion.Body>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Accordion Item #2</Accordion.Header>
                <Accordion.Body>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </Col>
        <Col md={8}>
          <div
            style={{}}
            className="d-flex gap-3 flex-wrap justify-content-center aligns-items-center p-8"
          >
            <ShoeCard />
            <ShoeCard />
            <ShoeCard />
            <ShoeCard />
            <ShoeCard />
            <ShoeCard />
          </div>
        </Col>
      </Row>
    </Container>
  );
};
