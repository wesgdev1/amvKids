import { useState } from "react";
import { Accordion, Form } from "react-bootstrap";

export const Filter = ({ data }) => {
  // aqui creo cada filtro por marca y talla

  const marcas = data.map((product) => product.product.name);
  // busco marcas unicas

  const sizes = data.map((product) => product.name);

  const [filters, setFilters] = useState([]);

  const handleFilter = (marca) => {
    setFilters([...filters, marca]);
    console.log(filters);
  };

  // por aqui hacer un useEffect para filtrar los productos cada vez que se cambie el estado de filters

  return (
    <div className="bg-gray-100 p-8 rounded-lg shadow-lg ">
      <Accordion defaultActiveKey="1">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Marca</Accordion.Header>
          <Accordion.Body>
            {marcas.map((marca) => (
              <Form.Check
                key={marca}
                type={`checkbox`}
                id={`default-${marca}`}
                label={marca}
                checked={false}
                onChange={() => handleFilter(marca)}
              />
            ))}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      {/* <Accordion>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Talla</Accordion.Header>
          <Accordion.Body>
            {sizes.map((size) => (
              <Form.Check
                key={size}
                type={`checkbox`}
                id={`default-${size}`}
                label={size}
                checked={false}
              />
            ))}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion> */}
    </div>
  );
};
