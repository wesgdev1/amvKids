/* eslint-disable react/prop-types */
import { useState } from "react";
import { Accordion, Form, Offcanvas } from "react-bootstrap";
import {
  ButtonStyled,
  FilterAccordion,
  FilterCheckbox,
  FilterContainer,
  FilterBadge,
} from "./StyledComponents";
import { OffcanvasBSfilter } from "../header/StyledComponents";

export const Filter = ({
  data,
  addFilter,
  deleteFilter,
  checkFilter,
  setCheckFilter,
  cargarModel,
}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Función para capitalizar cada palabra
  const capitalizeWords = (str) => {
    if (!str) return "";
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Capitalizar nombres de marcas
  const marcas = data.map((product) => capitalizeWords(product.product.name));
  const marcasUnicas = [...new Set(marcas)];

  const sizes = data.map((product) => {
    return product.stocks.map((stock) => stock.size);
  });

  const sizesUnidimensional = sizes.flat();
  const uniqueSizes = [...new Set(sizesUnidimensional)].sort();

  const genres = ["Hombre", "Mujer", "Niño", "Niña"];

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

  const basicColors = [
    "Amarillo",
    "Azul",
    "Beige",
    "Blanco",
    "Gris",
    "Marrón",
    "Magenta",
    "Morado",
    "Naranja",
    "Negro",
    "Rosa",
    "Rojo",
    "Talco",
    "Verde",
  ];

  const promociones = ["Promociones"];

  return (
    <>
      <ButtonStyled variant="primary" onClick={handleShow} className="me-2">
        <i className="bi bi-filter-circle-fill text-2xl "></i>
      </ButtonStyled>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Filtros</Offcanvas.Title>
        </Offcanvas.Header>
        <OffcanvasBSfilter>
          <FilterContainer>
            <FilterAccordion defaultActiveKey="1" className="mb-4">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Ofertas</Accordion.Header>
                <Accordion.Body>
                  <FilterCheckbox>
                    {promociones.map((marca) => (
                      <div
                        key={marca}
                        style={{
                          position: "relative",
                          display: "inline-block",
                          marginRight: "10px",
                        }}
                      >
                        <Form.Check
                          type={`checkbox`}
                          id={`default-${marca}`}
                          label={marca}
                          checked={checkFilter[marca] || false}
                          onChange={() => handleFilter(event, marca, "promo")}
                        />
                        <FilterBadge>Ofertas</FilterBadge>
                      </div>
                    ))}
                  </FilterCheckbox>
                </Accordion.Body>
              </Accordion.Item>
            </FilterAccordion>

            <FilterAccordion defaultActiveKey="1" className="mb-4">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Marca</Accordion.Header>
                <Accordion.Body>
                  <FilterCheckbox>
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
                  </FilterCheckbox>
                </Accordion.Body>
              </Accordion.Item>
            </FilterAccordion>

            <FilterAccordion>
              <Accordion.Item eventKey="1" className="mb-4">
                <Accordion.Header>Tallas</Accordion.Header>
                <Accordion.Body>
                  <FilterCheckbox>
                    {uniqueSizes.map((talla) => (
                      <Form.Check
                        key={talla}
                        type={`checkbox`}
                        id={`default-${talla}`}
                        label={talla}
                        checked={checkFilter[talla] || false}
                        onChange={() =>
                          handleFilter(event, talla.toString(), "talla")
                        }
                      />
                    ))}
                  </FilterCheckbox>
                </Accordion.Body>
              </Accordion.Item>
            </FilterAccordion>

            <FilterAccordion>
              <Accordion.Item eventKey="1" className="mb-4">
                <Accordion.Header>Color</Accordion.Header>
                <Accordion.Body>
                  <FilterCheckbox>
                    {basicColors.map((color) => (
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
                  </FilterCheckbox>
                </Accordion.Body>
              </Accordion.Item>
            </FilterAccordion>

            <FilterAccordion>
              <Accordion.Item eventKey="1" className="mb-4">
                <Accordion.Header>Genero</Accordion.Header>
                <Accordion.Body>
                  <FilterCheckbox>
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
                  </FilterCheckbox>
                </Accordion.Body>
              </Accordion.Item>
            </FilterAccordion>
          </FilterContainer>
        </OffcanvasBSfilter>
        <div className="d-flex justify-content-center mt-4 mb-4">
          <ButtonStyled
            variant="primary"
            onClick={() => {
              cargarModel();
              handleClose();
            }}
            style={{
              backgroundColor: "#007bff",
              borderColor: "#007bff",
              borderRadius: "20px",
              padding: "10px 20px",
              fontSize: "16px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              transition: "background-color 0.3s ease",
            }}
            className="hover:bg-blue-600"
          >
            Aplicar filtro
          </ButtonStyled>
        </div>
      </Offcanvas>
    </>
  );
};
