import { useParams } from "react-router-dom";
import { useModel } from "../domain/models/useModel";
import { Alert, Carousel, Image, Modal } from "react-bootstrap";
import {} from "../components/products/StyledComponents";
import { ControlProduct } from "../components/products/ControlProduct";
import { ContainerMov } from "../components/home/StyledComponents";
import { useState } from "react";
import { CustomLoader } from "../components/common/CustomLoader";
import { ProductDetailCurva2 } from "./ProductDetailCurva2";
import { ProductDetailCurvawomen } from "./ProductDetailCurvawomen";

// Función para verificar la curva de hombre (Curva2)
// Requiere: 1x37, 2x38, 3x39, 2x40, 2x41, 1x42, 1x43
const checkMenCurve = (stocks) => {
  const requiredCurve = {
    37: 1,
    38: 2,
    39: 3,
    40: 2,
    41: 2,
    42: 1,
    43: 1,
  };
  // const requiredSizeCount = Object.keys(requiredCurve).length;

  if (!stocks || stocks.length === 0) {
    // Solo verificar si hay stocks
    console.log("Men curve check failed: Null or empty stocks array.");
    return false;
  }
  // Eliminamos la comprobación estricta de longitud: stocks.length !== requiredSizeCount

  const stockMap = stocks.reduce((acc, stock) => {
    const size = Number(stock.size);
    const quantity = Number(stock.quantity);
    if (!isNaN(size) && !isNaN(quantity)) {
      acc[size] = (acc[size] || 0) + quantity;
    }
    return acc;
  }, {});

  console.log("Men Stock Map (Relaxed Check):", stockMap);
  console.log("Required Men Curve:", requiredCurve);

  // Verificar si todas las tallas requeridas existen con la cantidad correcta
  for (const size in requiredCurve) {
    if (!(size in stockMap) || stockMap[size] < requiredCurve[size]) {
      // Cambiado a >= para flexibilidad, o mantenemos === si debe ser exacto?
      // Mantendremos la comprobación exacta !== por ahora, según la solicitud original.
      if (stockMap[size] !== requiredCurve[size]) {
        console.log(
          `Men curve check failed: Mismatch for size ${size}. Expected ${
            requiredCurve[size]
          }, got ${stockMap[size] || 0}`
        );
        return false;
      }
    }
  }

  // Eliminamos la verificación de tallas extra: stockMapSizeCount !== requiredSizeCount

  console.log("Men curve check passed (Relaxed Check).");
  return true;
};

// Función para verificar la curva de mujer (Curvawomen)
// Requiere: 2x35, 2x36, 3x37, 2x38, 2x39, 1x40
const checkWomenCurve = (stocks) => {
  const requiredCurve = {
    35: 2,
    36: 2,
    37: 3,
    38: 2,
    39: 2,
    40: 1,
  };
  // const requiredSizeCount = Object.keys(requiredCurve).length;

  if (!stocks || stocks.length === 0) {
    // Solo verificar si hay stocks
    console.log("Women curve check failed: Null or empty stocks array.");
    return false;
  }
  // Eliminamos la comprobación estricta de longitud: stocks.length !== requiredSizeCount

  const stockMap = stocks.reduce((acc, stock) => {
    const size = Number(stock.size);
    const quantity = Number(stock.quantity);
    if (!isNaN(size) && !isNaN(quantity)) {
      acc[size] = (acc[size] || 0) + quantity;
    }
    return acc;
  }, {});

  console.log("Women Stock Map (Relaxed Check):", stockMap);
  console.log("Required Women Curve:", requiredCurve);

  // Verificar si todas las tallas requeridas existen con la cantidad correcta
  for (const size in requiredCurve) {
    if (!(size in stockMap) || stockMap[size] < requiredCurve[size]) {
      // Cambiado a >= para flexibilidad, o mantenemos === si debe ser exacto?
      // Mantendremos la comprobación exacta !== por ahora, según la solicitud original.
      if (stockMap[size] !== requiredCurve[size]) {
        console.log(
          `Women curve check failed: Mismatch for size ${size}. Expected ${
            requiredCurve[size]
          }, got ${stockMap[size] || 0}`
        );
        return false;
      }
    }
  }

  // Eliminamos la verificación de tallas extra: stockMapSizeCount !== requiredSizeCount

  console.log("Women curve check passed (Relaxed Check).");
  return true;
};

export const ProductDetail = () => {
  const params = useParams();
  const { id } = params;

  const { data, loading, error } = useModel(id);

  const [showModal, setShowModal] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [zoomedIndexModal, setZoomedIndexModal] = useState(-1);
  const [zoomCoordsModal, setZoomCoordsModal] = useState({ x: 0, y: 0 });

  const [zoomedIndexMain, setZoomedIndexMain] = useState(-1);
  const [zoomCoordsMain, setZoomCoordsMain] = useState({ x: 0, y: 0 });

  // Determinar si las curvas están disponibles SOLO cuando data esté cargada
  const isMenCurveAvailable =
    data && data.stocks ? checkMenCurve(data.stocks) : false;
  const isWomenCurveAvailable =
    data && data.stocks ? checkWomenCurve(data.stocks) : false;

  // Log para depuración
  // useEffect(() => {
  //   if (data) {
  //     console.log("Data loaded:", data);
  //     console.log("Stocks:", data.stocks);
  //     console.log("Is Men Curve Available?", isMenCurveAvailable);
  //     console.log("Is Women Curve Available?", isWomenCurveAvailable);
  //   }
  // }, [data, isMenCurveAvailable, isWomenCurveAvailable]);

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedImageIndex(null);
    setZoomedIndexModal(-1);
  };

  const handleMouseMoveMain = (e, index) => {
    if (zoomedIndexMain === index) {
      const { left, top, width, height } = e.target.getBoundingClientRect();
      const x = ((e.clientX - left) / width) * 100;
      const y = ((e.clientY - top) / height) * 100;
      setZoomCoordsMain({ x, y });
    }
  };

  const handleMouseEnterMain = (index) => {
    setZoomedIndexMain(index);
  };

  const handleMouseLeaveMain = () => {
    setZoomedIndexMain(-1);
  };

  const handleMouseMoveModal = (e, index) => {
    if (zoomedIndexModal === index) {
      const { left, top, width, height } = e.target.getBoundingClientRect();
      const x = ((e.clientX - left) / width) * 100;
      const y = ((e.clientY - top) / height) * 100;
      setZoomCoordsModal({ x, y });
    }
  };

  const handleMouseEnterModal = (index) => {
    setZoomedIndexModal(index);
  };

  const handleMouseLeaveModal = () => {
    setZoomedIndexModal(-1);
  };

  return (
    <>
      {loading && <CustomLoader />}
      {error && <Alert variant="danger">{error}</Alert>}
      {data && (
        <ContainerMov className="pt-5 px-5 pb-3">
          <h4 className="pb-3">
            <i className="bi bi-box"></i> {data?.name}
          </h4>
          <hr />

          <div className="flex gap-5  flex-row flex-wrap justify-center pt-3 ">
            <Carousel
              interval={null}
              style={{
                width: "450px",
                height: "450px",
                borderRadius: "60px",
                boxShadow: "0 0 5px rgba(0,0,0,1)",
              }}
            >
              {data?.images.map((image, index) => (
                <Carousel.Item key={index}>
                  <div
                    style={{
                      width: "100%",
                      height: "450px",
                      borderRadius: "60px",
                      overflow: "hidden",
                      cursor: "pointer",
                    }}
                    onMouseEnter={() => handleMouseEnterMain(index)}
                    onMouseLeave={handleMouseLeaveMain}
                    onMouseMove={(e) => handleMouseMoveMain(e, index)}
                    onClick={() => handleImageClick(index)}
                  >
                    <Image
                      src={image.url}
                      alt={data?.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "60px",
                        transition: "transform 0.2s ease-out",
                        transform:
                          zoomedIndexMain === index
                            ? "scale(1.75)"
                            : "scale(1)",
                        transformOrigin:
                          zoomedIndexMain === index
                            ? `${zoomCoordsMain.x}% ${zoomCoordsMain.y}%`
                            : "center center",
                      }}
                    />
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
            <div className="flex flex-col items-center px-4 gap-2 ">
              <ControlProduct data={data} />
              <div className="mt-8 p-6 bg-gradient-to-br from-purple-50 to-indigo-100 rounded-xl shadow-lg text-gray-800 max-w-3xl mx-auto ">
                <h5 className="text-xl font-bold mb-3 text-indigo-800 border-b border-indigo-200 pb-2">
                  <i className="bi bi-info-circle-fill mr-2"></i>Descripción del
                  Producto
                </h5>
                <p className="text-base leading-relaxed text-justify">
                  {data?.description}
                </p>
              </div>
            </div>
          </div>

          {/* Descripción estilizada */}

          <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
            <Modal.Header closeButton>
              <Modal.Title>{data?.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedImageIndex !== null && (
                <Carousel
                  activeIndex={selectedImageIndex}
                  onSelect={(selectedIndex) =>
                    setSelectedImageIndex(selectedIndex)
                  }
                  interval={null}
                  indicators={false}
                  fade
                >
                  {data?.images.map((image, index) => (
                    <Carousel.Item key={index}>
                      <div
                        style={{
                          width: "100%",
                          overflow: "hidden",
                          cursor: "zoom-in",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          background: "#f8f9fa",
                        }}
                        onMouseEnter={() => handleMouseEnterModal(index)}
                        onMouseLeave={handleMouseLeaveModal}
                        onMouseMove={(e) => handleMouseMoveModal(e, index)}
                      >
                        <Image
                          src={image.url}
                          alt={`${data?.name} - Imagen ${index + 1}`}
                          style={{
                            maxWidth: "100%",
                            objectFit: "contain",
                            transition: "transform 0.2s ease-out",
                            transform:
                              zoomedIndexModal === index
                                ? "scale(1.75)"
                                : "scale(1)",
                            transformOrigin:
                              zoomedIndexModal === index
                                ? `${zoomCoordsModal.x}% ${zoomCoordsModal.y}%`
                                : "center center",
                          }}
                        />
                      </div>
                    </Carousel.Item>
                  ))}
                </Carousel>
              )}
            </Modal.Body>
          </Modal>

          <hr className=" mt-8 mb-4" />
          <div className="d-flex flex-column align-items-center text-center mb-4">
            <h5 className="mb-3">
              <i className="bi bi-images"></i> Curvas disponibles
            </h5>
            <p
              className="text-muted small fst-italic"
              style={{ maxWidth: "600px" }}
            >
              ¡Exclusivo para mayoristas! Nuestras curvas predefinidas optimizan
              tu inventario con las tallas de mayor rotación. Ahorra tiempo,
              maximiza ganancias y asegura disponibilidad con estos paquetes
              listos para vender. ¡La compra inteligente para tu negocio!
            </p>
          </div>

          {isMenCurveAvailable ? (
            <ProductDetailCurva2 data={data} />
          ) : (
            <Alert variant="light" className="text-center text-muted border-0">
              {" "}
              <i className="bi bi-emoji-frown"></i> No hay curvas de hombre
              disponibles para este modelo.
            </Alert>
          )}

          {isWomenCurveAvailable ? (
            <ProductDetailCurvawomen data={data} />
          ) : (
            <Alert variant="light" className="text-center text-muted border-0">
              <i className="bi bi-emoji-frown"></i> No hay curvas de mujer
              disponibles para este modelo.
            </Alert>
          )}
        </ContainerMov>
      )}
    </>
  );
};
