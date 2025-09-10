import { Alert, Col, Container, Row } from "react-bootstrap";
import { Filter } from "../components/product/Filter";
import { useModels, useModelsFilter } from "../domain/models/useModels";
import { ProductListHome } from "../components/products/ProductListHome";
import { useFilter } from "../hooks/useFilter";
import { useLocation, useParams } from "react-router-dom";
import { CustomLoader } from "../components/common/CustomLoader";

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
    setFiltrosSeleccionadosAgrupados,
  } = useFilter();
  const { data, loading, error, cargarModel } = useModels(
    filtrosSeleccionadosAgrupados,
    searchValue,
    setFiltrosSeleccionadosAgrupados
  );
  const { data: dataforFilter } = useModelsFilter();

  const location = useLocation();

  return (
    <Container>
      <Row className="">
        {/* <div className="pt-8 mb-8">
          Aqui encontrararas todos los productos de nuestra tienda
        </div> */}
        {/* <hr /> */}
        <div className="relative w-full h-12 mb-6 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 overflow-hidden flex items-center rounded-lg shadow-lg border border-purple-200/20">
          {/* Efecto de brillo superpuesto */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-pulse"></div>

          {/* Contenido del marquee */}
          <div className="absolute whitespace-nowrap animate-marquee text-white text-sm font-semibold tracking-wide">
            <span className="inline-flex items-center mx-8">
              <span className="w-2 h-2 bg-yellow-300 rounded-full mr-2 animate-pulse"></span>
              Pagos con Addi ✨
            </span>
            <span className="mx-4 text-purple-200">●</span>
            <span className="inline-flex items-center mx-8">
              <span className="w-2 h-2 bg-blue-300 rounded-full mr-2 animate-pulse"></span>
              Transferencias (Nequi/Bancolombia) 🏦
            </span>
            <span className="mx-4 text-purple-200">●</span>
            <span className="inline-flex items-center mx-8">
              <span className="w-2 h-2 bg-green-300 rounded-full mr-2 animate-pulse"></span>
              Efectivo (Efecty/Baloto) 💵
            </span>
            <span className="mx-4 text-purple-200">●</span>
            <span className="inline-flex items-center mx-8">
              <span className="w-2 h-2 bg-pink-300 rounded-full mr-2 animate-pulse"></span>
              Tarjetas Débito/Crédito 💳
            </span>
            <span className="mx-4 text-purple-200">●</span>
            <span className="inline-flex items-center mx-8">
              <span className="w-2 h-2 bg-yellow-300 rounded-full mr-2 animate-pulse"></span>
              Pagos con Addi ✨
            </span>
            <span className="mx-4 text-purple-200">●</span>
            <span className="inline-flex items-center mx-8">
              <span className="w-2 h-2 bg-blue-300 rounded-full mr-2 animate-pulse"></span>
              Transferencias (Nequi/Bancolombia) 🏦
            </span>
            <span className="mx-4 text-purple-200">●</span>
            <span className="inline-flex items-center mx-8">
              <span className="w-2 h-2 bg-green-300 rounded-full mr-2 animate-pulse"></span>
              Efectivo (Efecty/Baloto) 💵
            </span>
            <span className="mx-4 text-purple-200">●</span>
            <span className="inline-flex items-center mx-8">
              <span className="w-2 h-2 bg-pink-300 rounded-full mr-2 animate-pulse"></span>
              Tarjetas Débito/Crédito 💳
            </span>
            <span className="mx-4 text-purple-200">●</span>
          </div>

          {/* Efectos de borde brillante */}
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
        </div>
        {/* si la location contiene /productos/search/ tengo boton de borrar busqueda que me redirige a products  */}
        {location.pathname.includes("/productos/search/") && (
          <Col className="flex justify-end ">
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
        <div className="flex justify-end mt-5 flex-wrap">
          {selectedFilters.length > 0 && (
            <div>
              <h4>Filtros aplicados:</h4>
              <div>
                {selectedFilters.map((filter) => (
                  <span key={filter} className="badge bg-primary me-2">
                    {filter}
                  </span>
                ))}
                <span
                  className="badge bg-danger me-2 hover:cursor-pointer "
                  onClick={() => {
                    clean();
                    //recargar la pagina
                    window.location.reload(); // mientras mientras
                  }}
                >
                  Eliminar filtros
                </span>
              </div>
            </div>
          )}
        </div>
      </Row>
      <Row>
        <div className="flex justify-end mb-5">
          <div>
            {dataforFilter && (
              <Filter
                data={dataforFilter}
                addFilter={addFilter}
                deleteFilter={deleteFilter}
                clean={clean}
                checkFilter={checkFilter}
                setCheckFilter={setCheckFilter}
                cargarModel={cargarModel}
              />
            )}
          </div>
        </div>
      </Row>
      <Row>
        {/* <Col md={3}>
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
        </Col> */}
        <Col md={12}>
          <div>
            {loading && <CustomLoader />}
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
