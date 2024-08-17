import { Alert, Col, Container, Row, Spinner } from "react-bootstrap";
import { ShoeCard } from "../components/home/ShoeCard";
import { Filter } from "../components/product/Filter";
import { useModels } from "../domain/models/useModels";
import { ProductListHome } from "../components/products/ProductListHome";

export const Products = () => {
  const { data, loading, error } = useModels();
  return (
    <Container>
      <Row className="my-5 ">
        <div className="pt-8 mb-8">
          Aqui encontrararas todos los productos de nuestra tienda
        </div>
        <hr />
      </Row>
      <Row>
        <Col md={3}>{data && <Filter data={data} />}</Col>
        <Col md={8}>
          <div>
            {loading && <Spinner animation="border" variant="info" />}
            {error && <Alert variant="danger">{error}</Alert>}

            {data?.length > 0 && <ProductListHome models={data} />}
          </div>
        </Col>
      </Row>
    </Container>
  );
};
