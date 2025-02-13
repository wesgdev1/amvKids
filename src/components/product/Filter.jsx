/* eslint-disable react/prop-types */
import { useState } from "react";
import { Accordion, Form } from "react-bootstrap";

export const Filter = ({ data }) => {
  const marcas = data.map((product) => product.product.name);
  const marcasUnicas = [...new Set(marcas)];

  const colors = data.map((product) => product.color);
  const uniqueCol = [...new Set(colors)];

  const sizes = data.map((product) => {
    return product.stocks.map((stock) => stock.size);
  });

  const sizesUnidimensional = sizes.flat();
  const uniqueSizes = [...new Set(sizesUnidimensional)].sort();

  const genres = ["Hombre", "Mujer", "Niño", "Niña"];

  const [filters, setFilters] = useState([]);

  const handleFilter = (marca) => {
    setFilters([...filters, marca]);
    console.log(filters);
  };

  // por aqui hacer un useEffect para filtrar los productos cada vez que se cambie el estado de filters

  return (
    <div className="bg-gray-100 p-8 rounded-lg shadow-lg ">
      <Accordion defaultActiveKey="1" className="mb-4">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Marca</Accordion.Header>
          <Accordion.Body>
            {marcasUnicas.map((marca) => (
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

      <Accordion>
        <Accordion.Item eventKey="1" className="mb-4">
          <Accordion.Header>Tallas</Accordion.Header>
          <Accordion.Body>
            {uniqueSizes.map((color) => (
              <Form.Check
                key={color}
                type={`checkbox`}
                id={`default-${color}`}
                label={color}
                checked={false}
              />
            ))}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <Accordion>
        <Accordion.Item eventKey="1" className="mb-4">
          <Accordion.Header>Color</Accordion.Header>
          <Accordion.Body>
            {uniqueCol.map((color) => (
              <Form.Check
                key={color}
                type={`checkbox`}
                id={`default-${color}`}
                label={color}
                checked={false}
              />
            ))}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <Accordion>
        <Accordion.Item eventKey="1" className="mb-4">
          <Accordion.Header>Genero</Accordion.Header>
          <Accordion.Body>
            {genres.map((gender) => (
              <Form.Check
                key={gender}
                type={`checkbox`}
                id={`default-${gender}`}
                label={gender}
                checked={false}
              />
            ))}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};
