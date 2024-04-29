import { Col, Container, Row } from "react-bootstrap";
import { ShoeCard } from "../components/home/ShoeCard";
import { Filter } from "../components/product/Filter";

export const Products = () => {
  const products = [
    {
      id: 1,
      name: "Nike Air Max",
      price: 120,
      image: "https://via.placeholder.com/150",
      brand: "Nike",
      size: 30,
      color: "Red",
      stock: 10,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.",
    },
    {
      id: 2,
      name: "Adidas Superstar",
      price: 100,
      image: "https://via.placeholder.com/150",
      brand: "Adidas",
      size: 30,
      color: "Blue",
      stock: 10,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.",
    },
    {
      id: 3,
      name: "Puma Suede",
      price: 90,
      image: "https://via.placeholder.com/150",
      brand: "Puma",
      size: 30,
      color: "Green",
      stock: 10,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.",
    },
  ];
  return (
    <Container>
      <Row className="my-5 ">
        <div className="pt-8 mb-8">
          Aqui encontrararas todos los productos de nuestra tienda
        </div>
        <hr />
      </Row>
      <Row>
        <Col md={3}>
          <Filter products={products} />
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
