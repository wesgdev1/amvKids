/* eslint-disable react/prop-types */
import { useState } from "react";
import { Accordion, Form } from "react-bootstrap";

export const Filter = ({
  data,
  addFilter,
  clena,
  deleteFilter,
  checkFilter,
  setCheckFilter,
}) => {
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

  const handleFilter = (event, marca, type) => {
    // Esto para que se actualice el estado de los filtros en el check
    if (event.target.checked) {
      addFilter(marca, type);
    } else {
      console.log("borrando check");
      console.log("marca", marca);
      console.log("type", type);
      deleteFilter(marca, type);
    }
    setCheckFilter({ ...checkFilter, [marca]: !checkFilter[marca] });
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
                checked={checkFilter[marca] || false}
                onChange={() => handleFilter(event, marca, "marca")}
              />
            ))}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <Accordion>
        <Accordion.Item eventKey="1" className="mb-4">
          <Accordion.Header>Tallas</Accordion.Header>
          <Accordion.Body>
            {uniqueSizes.map((talla) => (
              <Form.Check
                key={talla}
                type={`checkbox`}
                id={`default-${talla}`}
                label={talla}
                checked={checkFilter[talla] || false}
                onChange={() => handleFilter(event, talla.toString(), "talla")}
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
                checked={
                  checkFilter[color] ||
                  checkFilter[color.toLowerCase()] ||
                  false
                }
                onChange={() => handleFilter(event, color, "color")}
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
                checked={checkFilter[gender] || false}
                onChange={() => handleFilter(event, gender, "genero")}
              />
            ))}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};
