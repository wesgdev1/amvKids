import { useParams } from "react-router-dom";
import { useModel } from "../domain/models/useModel";
import { Alert, Carousel, Image, Spinner, Modal } from "react-bootstrap";
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
  const [selectedImage, setSelectedImage] = useState(null);
  const [zoomedIndex, setZoomedIndex] = useState(-1);
  const [zoomCoords, setZoomCoords] = useState({ x: 0, y: 0 });

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedImage(null);
  };

  const handleMouseMove = (e, index) => {
    if (zoomedIndex === index) {
      const { left, top, width, height } = e.target.getBoundingClientRect();
      const x = ((e.clientX - left) / width) * 100;
      const y = ((e.clientY - top) / height) * 100;
      setZoomCoords({ x, y });
    }
  };

  const handleMouseEnter = (index) => {
    setZoomedIndex(index);
  };

  const handleMouseLeave = () => {
    setZoomedIndex(-1);
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
                      cursor: "zoom-in",
                    }}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                    onMouseMove={(e) => handleMouseMove(e, index)}
                    onClick={() => handleImageClick(image.url)}
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
                          zoomedIndex === index ? "scale(1.75)" : "scale(1)",
                        transformOrigin:
                          zoomedIndex === index
                            ? `${zoomCoords.x}% ${zoomCoords.y}%`
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
            <Modal.Body className="text-center">
              {selectedImage && (
                <Image
                  src={selectedImage}
                  alt={data?.name}
                  style={{
                    width: "100%",
                    height: "auto",
                    cursor: "zoom-in",
                  }}
                />
              )}
            </Modal.Body>
          </Modal>
        </ContainerMov>
      )}
    </>
  );
};
