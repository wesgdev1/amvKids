import { useState, useEffect, useRef } from "react";
import { useModelLowStock } from "../../domain/models/useModels";
import {
  Card,
  Badge,
  Spinner,
  Alert,
  Image,
  Form,
  Row,
  Col,
  InputGroup,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

// Hook personalizado para lazy loading
const useLazyImage = (src) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && src && !isLoaded) {
          setImageSrc(src);
          setIsLoaded(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [src, isLoaded]);

  return { imgRef, imageSrc, isLoaded };
};

// Componente de imagen lazy
const LazyImage = ({ src, alt, style, className, onError }) => {
  const { imgRef, imageSrc, isLoaded } = useLazyImage(src);
  const [hasError, setHasError] = useState(false);

  const handleError = (e) => {
    setHasError(true);
    if (onError) onError(e);
  };

  return (
    <div ref={imgRef} style={style} className={className}>
      {!isLoaded && !hasError ? (
        <div
          className="d-flex align-items-center justify-content-center bg-light border rounded"
          style={style}
        >
          <Spinner animation="border" size="sm" variant="secondary" />
        </div>
      ) : hasError || !imageSrc ? (
        <div
          className="d-flex align-items-center justify-content-center bg-light border rounded"
          style={style}
        >
          <i
            className="bi bi-image text-muted"
            style={{ fontSize: "1.2rem" }}
          ></i>
        </div>
      ) : (
        <Image
          src={imageSrc}
          alt={alt}
          rounded
          style={style}
          className="border"
          onError={handleError}
        />
      )}
    </div>
  );
};

LazyImage.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
  onError: PropTypes.func,
};

// Estilos minimalistas
const styles = {
  container: {
    padding: "1rem",
    maxWidth: "1400px",
    margin: "0 auto",
  },
  alertCard: {
    borderLeft: "3px solid #dc3545",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    transition: "all 0.2s ease",
    fontSize: "0.85rem",
    cursor: "pointer",
    marginBottom: "0.75rem",
    height: "100%",
  },
  criticalAlert: {
    borderLeftColor: "#dc3545",
    backgroundColor: "#fff",
  },
  warningAlert: {
    borderLeftColor: "#ffc107",
    backgroundColor: "#fff",
  },
  headerSection: {
    backgroundColor: "#f8f9fa",
    border: "1px solid #dee2e6",
    padding: "0.75rem 1rem",
    borderRadius: "6px",
    marginBottom: "1rem",
  },
  filtersSection: {
    backgroundColor: "#fff",
    border: "1px solid #dee2e6",
    padding: "1rem",
    borderRadius: "6px",
    marginBottom: "1rem",
  },
  priceTag: {
    backgroundColor: "#e9ecef",
    color: "#495057",
    padding: "0.15rem 0.4rem",
    borderRadius: "3px",
    fontSize: "0.7rem",
    fontWeight: "500",
    display: "inline-block",
    margin: "0.1rem",
  },
  stockBadge: {
    fontSize: "0.65rem",
    padding: "0.15rem 0.3rem",
  },
};

export const AlertsList = () => {
  const { data, loading, error } = useModelLowStock();
  const [alertCount, setAlertCount] = useState(0);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("critical"); // critical, name, stock
  const [stockFilter, setStockFilter] = useState("all"); // all, critical, warning, low
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setAlertCount(data.length);
      setFilteredData(data);
    }
  }, [data]);

  // Filtrar y ordenar datos
  useEffect(() => {
    if (!data) return;

    let filtered = [...data];

    // Filtrar por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(
        (model) =>
          model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          model.color?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          model.reference?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrar por tipo de stock
    if (stockFilter !== "all") {
      filtered = filtered.filter((model) => {
        const hasZeroStock = model.stocks.some((stock) => stock.quantity === 0);
        const hasOneStock = model.stocks.some((stock) => stock.quantity === 1);

        switch (stockFilter) {
          case "critical":
            return hasZeroStock;
          case "warning":
            return hasOneStock && !hasZeroStock;
          case "low":
            return !hasZeroStock && !hasOneStock;
          default:
            return true;
        }
      });
    }

    // Ordenar
    filtered.sort((a, b) => {
      switch (sortOrder) {
        case "critical": {
          const aCritical = a.stocks.some((stock) => stock.quantity === 0)
            ? 0
            : 1;
          const bCritical = b.stocks.some((stock) => stock.quantity === 0)
            ? 0
            : 1;
          return aCritical - bCritical;
        }
        case "name":
          return a.name.localeCompare(b.name);
        case "stock": {
          const aMinStock = Math.min(...a.stocks.map((s) => s.quantity));
          const bMinStock = Math.min(...b.stocks.map((s) => s.quantity));
          return aMinStock - bMinStock;
        }
        default:
          return 0;
      }
    });

    setFilteredData(filtered);
  }, [data, searchTerm, sortOrder, stockFilter]);

  const getStockStatus = (quantity) => {
    if (quantity === 0) return { variant: "danger", text: "AGOTADO" };
    if (quantity === 1) return { variant: "warning", text: "CRÍTICO" };
    return { variant: "secondary", text: "BAJO" };
  };

  const formatPrice = (price) => {
    return price ? `$${price.toLocaleString("es-CO")}` : "N/A";
  };

  const getPrimaryImage = (images) => {
    if (!images || images.length === 0) return null;
    const primaryImage = images.find((img) => img.isPrimary);
    return primaryImage || images[0];
  };

  const handleCardClick = (modelId) => {
    navigate(`/profile/models/${modelId}`);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center p-4">
        <Spinner animation="border" size="sm" className="me-2" />
        <span className="text-muted">Cargando alertas...</span>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="m-3">
        <small>Error al cargar alertas: {error.message}</small>
      </Alert>
    );
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.headerSection}>
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <i className="bi bi-exclamation-triangle text-warning me-2"></i>
            <h6 className="mb-0">Alertas de Stock</h6>
          </div>
          <div className="d-flex align-items-center gap-3">
            <small className="text-muted">
              Mostrando {filteredData.length} de {alertCount}
            </small>
            {alertCount > 0 && (
              <Badge bg="secondary" className="px-2 py-1">
                {alertCount} total
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div style={styles.filtersSection}>
        <Row className="g-3 align-items-end">
          <Col md={4}>
            <Form.Label className="small fw-bold text-muted mb-1">
              BUSCAR MODELO
            </Form.Label>
            <InputGroup size="sm">
              <InputGroup.Text>
                <i className="bi bi-search"></i>
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Nombre, color o referencia..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <InputGroup.Text
                  style={{ cursor: "pointer" }}
                  onClick={() => setSearchTerm("")}
                >
                  <i className="bi bi-x"></i>
                </InputGroup.Text>
              )}
            </InputGroup>
          </Col>

          <Col md={3}>
            <Form.Label className="small fw-bold text-muted mb-1">
              ORDENAR POR
            </Form.Label>
            <Form.Select
              size="sm"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="critical">Más crítico primero</option>
              <option value="name">Nombre A-Z</option>
              <option value="stock">Menor stock primero</option>
            </Form.Select>
          </Col>

          <Col md={3}>
            <Form.Label className="small fw-bold text-muted mb-1">
              FILTRAR POR ESTADO
            </Form.Label>
            <Form.Select
              size="sm"
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value)}
            >
              <option value="all">Todos los estados</option>
              <option value="critical">Solo críticos (0 stock)</option>
              <option value="warning">Solo advertencia (1 stock)</option>
              <option value="low">Solo stock bajo (2+ stock)</option>
            </Form.Select>
          </Col>

          <Col md={2}>
            <div className="d-flex gap-2">
              <button
                className="btn btn-outline-secondary btn-sm flex-fill"
                onClick={() => {
                  setSearchTerm("");
                  setSortOrder("critical");
                  setStockFilter("all");
                }}
              >
                <i className="bi bi-arrow-clockwise me-1"></i>
                Limpiar
              </button>
            </div>
          </Col>
        </Row>
      </div>

      {!data || data.length === 0 ? (
        <div className="text-center py-4">
          <i className="bi bi-check-circle text-success me-2"></i>
          <small className="text-muted">Sin alertas de stock</small>
        </div>
      ) : filteredData.length === 0 ? (
        <div className="text-center py-4">
          <i className="bi bi-search text-muted me-2"></i>
          <small className="text-muted">
            No se encontraron resultados con los filtros aplicados
          </small>
        </div>
      ) : (
        <Row className="g-3">
          {filteredData.map((model) => {
            const isCritical = model.stocks.some(
              (stock) => stock.quantity === 0
            );
            const primaryImage = getPrimaryImage(model.images);

            return (
              <Col key={model.id} lg={6}>
                <Card
                  style={{
                    ...styles.alertCard,
                    ...(isCritical
                      ? styles.criticalAlert
                      : styles.warningAlert),
                  }}
                  onClick={() => handleCardClick(model.id)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 2px 8px rgba(0, 0, 0, 0.15)";
                    e.currentTarget.style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 1px 3px rgba(0, 0, 0, 0.1)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <Card.Body className="p-3">
                    <div className="d-flex align-items-center">
                      {/* Imagen con lazy loading */}
                      <div className="flex-shrink-0 me-3">
                        <LazyImage
                          src={primaryImage?.url}
                          alt={model.name}
                          style={{
                            width: "60px",
                            height: "60px",
                            objectFit: "cover",
                          }}
                          className=""
                        />
                      </div>

                      {/* Información principal */}
                      <div className="flex-grow-1 min-w-0">
                        <div className="d-flex align-items-center justify-content-between mb-2">
                          <h6
                            className="mb-0 text-truncate me-2"
                            style={{ fontSize: "0.95rem" }}
                          >
                            {model.name}
                          </h6>
                          <Badge
                            bg={isCritical ? "danger" : "warning"}
                            style={styles.stockBadge}
                          >
                            {isCritical ? "CRÍTICO" : "BAJO"}
                          </Badge>
                        </div>

                        <div
                          className="d-flex align-items-center text-muted mb-2"
                          style={{ fontSize: "0.75rem" }}
                        >
                          {model.color && (
                            <span
                              className="me-3 text-truncate"
                              style={{ maxWidth: "120px" }}
                            >
                              <i className="bi bi-palette me-1"></i>
                              {model.color}
                            </span>
                          )}
                          {model.reference && (
                            <span className="me-3">
                              <i className="bi bi-hash me-1"></i>
                              {model.reference}
                            </span>
                          )}
                        </div>

                        {/* Precios */}
                        <div className="mb-2">
                          <div className="d-flex flex-wrap gap-1">
                            {model.price && (
                              <span style={styles.priceTag}>
                                Rev: {formatPrice(model.price)}
                              </span>
                            )}
                            {model.normalPrice && (
                              <span style={styles.priceTag}>
                                Norm: {formatPrice(model.normalPrice)}
                              </span>
                            )}
                            {model.alliancePrice && (
                              <span style={styles.priceTag}>
                                Ali: {formatPrice(model.alliancePrice)}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Stock por tallas */}
                        <div>
                          <div className="d-flex flex-wrap gap-1">
                            {model.stocks.map((stock) => {
                              const status = getStockStatus(stock.quantity);
                              return (
                                <Badge
                                  key={stock.id}
                                  bg={status.variant}
                                  style={styles.stockBadge}
                                  className="d-flex align-items-center"
                                >
                                  T{stock.size}: {stock.quantity}
                                  {stock.quantity === 0 && (
                                    <i
                                      className="bi bi-exclamation-triangle-fill ms-1"
                                      style={{ fontSize: "0.5rem" }}
                                    ></i>
                                  )}
                                </Badge>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      )}
    </div>
  );
};
