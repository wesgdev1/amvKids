import { useParams } from "react-router-dom";
import { useModel } from "../domain/models/useModel";
import { Alert, Carousel, Image, Modal } from "react-bootstrap";
import {} from "../components/products/StyledComponents";
import { ControlProduct } from "../components/products/ControlProduct";
import { ContainerMov } from "../components/home/StyledComponents";
import { useState } from "react";
import { CustomLoader } from "../components/common/CustomLoader";

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

          <div className="flex gap-5 flex-row flex-wrap justify-center pt-3 ">
            <Carousel
              interval={null}
              style={{
                width: "320px",
                height: "320px",
                borderRadius: "60px",
                boxShadow: "0 0 5px rgba(0,0,0,1)",
              }}
            >
              {data?.images.map((image, index) => (
                <Carousel.Item key={index}>
                  <div
                    style={{
                      width: "100%",
                      height: "320px",
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
            <ControlProduct data={data} />
          </div>
          {/* Descripción estilizada */}
          <div className="mt-8 p-6 bg-gradient-to-br from-purple-50 to-indigo-100 rounded-xl shadow-lg text-gray-800 max-w-3xl mx-auto">
            <h5 className="text-xl font-bold mb-3 text-indigo-800 border-b border-indigo-200 pb-2">
              <i className="bi bi-info-circle-fill mr-2"></i>Descripción del
              Producto
            </h5>
            <p className="text-base leading-relaxed text-justify">
              {data?.description}
            </p>
          </div>

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
                          maxHeight: "75vh",
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
                            maxHeight: "75vh",
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
        </ContainerMov>
      )}
    </>
  );
};
