import { useParams } from "react-router-dom";
import { useModel } from "../domain/models/useModel";
import {
  Alert,
  Card,
  Carousel,
  Col,
  Image,
  Spinner,
  Modal,
} from "react-bootstrap";
import {
  ButtonProfile,
  CardStoreStyle,
} from "../components/products/StyledComponents";
import { ControlProduct } from "../components/products/ControlProduct";
import { ContainerMov } from "../components/home/StyledComponents";
import { useState } from "react";

export const ProductDetail = () => {
  const params = useParams();
  const { id } = params;

  const { data, loading, error } = useModel(id);

  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedImage(null);
  };

  return (
    <>
      {loading && <Spinner animation="border" variant="info" />}
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
                <Carousel.Item
                  key={index}
                  onClick={() => handleImageClick(image.url)}
                >
                  <Image
                    src={image.url}
                    alt={data?.name}
                    style={{
                      //objectFit: "cover",
                      borderRadius: "60px",
                      boxShadow: "0 0 5px rgba(0,0,0,1)",
                    }}
                  />
                </Carousel.Item>
              ))}
              {/* <Carousel.Item>
                <Image
                  src={data?.images[0]?.url}
                  alt={data?.name}
                  style={{
                    objectFit: "cover",
                    borderRadius: "60px",
                    boxShadow: "0 0 5px rgba(0,0,0,1)",
                  }}
                />
              </Carousel.Item> */}
            </Carousel>
            {/* <div>
              <Image
                src={data?.images[0]?.url}
                alt={data?.name}
                style={{
                  objectFit: "cover",
                  borderRadius: "10px",
                  boxShadow: "0 0 10px rgba(0,0,0,1)",
                }}
              />
            </div> */}
            <ControlProduct data={data} />
            <div>{data?.description}</div>
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
