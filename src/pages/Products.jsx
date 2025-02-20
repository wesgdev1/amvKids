import { Alert, Col, Container, Row, Spinner } from "react-bootstrap";
import { ShoeCard } from "../components/home/ShoeCard";
import { Filter } from "../components/product/Filter";
import { useModels, useModelsFilter } from "../domain/models/useModels";
import { ProductListHome } from "../components/products/ProductListHome";
import { use } from "react";
import { useFilter } from "../hooks/useFilter";
import { useLocation, useParams } from "react-router-dom";

export const Products = () => {
  const { searchValue } = useParams();

  const {
    addFilter,
    deleteFilter,
    clean,
    checkFilter,
    setCheckFilter,
    selectedFilters,
    filtrosSeleccionadosAgrupados,
  } = useFilter();
  const { data, loading, error } = useModels(
    filtrosSeleccionadosAgrupados,
    searchValue
  );
  // const { data: dataforFilter } = useModels();
  const { data: dataforFilter } = useModelsFilter();

  const location = useLocation();

  return (
    <Container>
      <Row className="my-5 ">
        <div className="pt-8 mb-8">
          Aqui encontrararas todos los productos de nuestra tienda
        </div>
        <hr />
        {/* si la location contiene /productos/search/ tengo boton de borrar busqueda que me redirige a products  */}
        {location.pathname.includes("/productos/search/") && (
          <Col className="flex justify-end">
            <button
              className="btn btn-danger
              ali
              
              "
              onClick={() => {
                window.location.href = "/productos";
              }}
            >
              Borrar busqueda
            </button>
          </Col>
        )}
        <div className="flex justify-end mt-5">
          {selectedFilters.length > 0 && (
            <div>
              <h4>Filtros aplicados:</h4>
              <div>
                {selectedFilters.map((filter) => (
                  <span key={filter} className="badge bg-primary me-2">
                    {filter}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </Row>
      <Row>
        <Col md={3}>
          {dataforFilter && (
            <Filter
              data={dataforFilter}
              addFilter={addFilter}
              deleteFilter={deleteFilter}
              clean={clean}
              checkFilter={checkFilter}
              setCheckFilter={setCheckFilter}
            />
          )}
        </Col>
        <Col md={8}>
          <div>
            {loading && <Spinner animation="border" variant="info" />}
            {error && <Alert variant="danger">{error}</Alert>}
            {data?.length > 0 ? (
              <ProductListHome models={data} />
            ) : (
              <h2 className="text-center mt-8 mb-8">
                No hay productos que mostrar
              </h2>
            )}

            {/* {data?.length > 0 && <ProductListHome models={data} />} */}
          </div>
        </Col>
      </Row>
    </Container>
  );
};
