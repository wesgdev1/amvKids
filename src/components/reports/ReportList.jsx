import { Card, Form, Spinner } from "react-bootstrap";
import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Trophy, ShoppingBag, LineChart } from "lucide-react";
import { StatsContainerStyled, StatCardStyled } from "./StyledComponents";
import {
  useCountModels,
  useCountPairs,
  useCountProdcuts,
  useCountUsers,
  useCountOrders,
  useSumaTotalesOrdenes,
  useParesVendidos,
  useModelosMasVendidos,
} from "../../domain/reports/useReports";
import {
  format,
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
} from "date-fns";

// DATOS ESTÁTICOS ADICIONALES PARA LAS NUEVAS TARJETAS DEL PERIODO
const periodExtraStatsData = {
  day: {
    topSellers: [
      { name: "Vendedor Ágil", sales: 10 },
      { name: "Vendedor Rápido", sales: 8 },
      { name: "Vendedor Veloz", sales: 7 },
    ],
    sellersIcon: "bi-people-fill",
  },
  week: {
    topSellers: [
      { name: "Líder Semanal", sales: 50 },
      { name: "Campeón Semanal", sales: 40 },
      { name: "Finalista Semanal", sales: 30 },
    ],
    sellersIcon: "bi-trophy",
  },
  month: {
    topSellers: [
      { name: "Emperador del Mes", sales: 200 },
      { name: "Rey del Mes", sales: 150 },
      { name: "Príncipe del Mes", sales: 100 },
    ],
    sellersIcon: "bi-shield-check",
  },
};

export const ReportList = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("day"); // Estado para el periodo

  // Estados para las fechas del periodo seleccionado
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Hook para obtener los datos de órdenes del periodo
  const {
    data: periodOrderStats, // Renombrar data a periodOrderStats para claridad
    loading: isLoadingPeriodReport, // Renombrar loading
    error: periodReportError, // Renombrar error
  } = useCountOrders(startDate, endDate);

  const {
    data: sumaTotalesOrdenes,
    loading: isLoadingSumaTotalesOrdenes,
    error: sumaTotalesOrdenesError,
  } = useSumaTotalesOrdenes(startDate, endDate);

  const {
    data: paresVendidos,
    loading: isLoadingParesVendidos,
    error: paresVendidosError,
  } = useParesVendidos(startDate, endDate);

  // Handler para el cambio de selección
  const handlePeriodChange = (event) => {
    const newPeriod = event.target.value;
    setSelectedPeriod(newPeriod);

    // Calcular fechas exactas
    const now = new Date();
    let newStartDate, newEndDate;

    switch (newPeriod) {
      case "day":
        newStartDate = startOfDay(now);
        newEndDate = endOfDay(now);
        break;
      case "week":
        newStartDate = startOfWeek(now, { weekStartsOn: 1 });
        newEndDate = endOfWeek(now, { weekStartsOn: 1 });
        break;
      case "month":
        newStartDate = startOfMonth(now);
        newEndDate = endOfMonth(now);
        break;
      default:
        newStartDate = startOfDay(now); // Default a hoy si algo raro pasa
        newEndDate = endOfDay(now);
    }

    // Actualizar los estados de fecha, lo que activará el hook useCountOrders
    setStartDate(newStartDate);
    setEndDate(newEndDate);

    // Formatear fechas al estilo timestamp(3) - Log opcional
    const timestampFormat = "yyyy-MM-dd HH:mm:ss.SSS";
    const formattedStartDate = format(newStartDate, timestampFormat);
    const formattedEndDate = format(newEndDate, timestampFormat);

    console.log(
      `Periodo seleccionado: ${newPeriod}. Fechas: ${formattedStartDate} a ${formattedEndDate}. Fetching data...`
    );

    // Aquí iría la llamada a la API para obtener datos reales
    // Es recomendable enviar los objetos Date (startDate, endDate) directamente
    // si tu API/backend puede manejarlos, o las cadenas formateadas si es necesario.
    // Ejemplo: fetchDataForPeriod({ startDate, endDate });
  };

  // useEffect para la carga inicial al montar el componente
  useEffect(() => {
    // Calcular fechas para el periodo inicial ('day')
    const now = new Date();
    setStartDate(startOfDay(now));
    setEndDate(endOfDay(now));
    // El array vacío [] asegura que esto se ejecute solo una vez al montar
  }, []);

  const {
    data: countpairs,
    loading: loadingPairs,
    error: errorPairs,
  } = useCountPairs();

  const {
    data: countUsers,
    loading: loadingUsers,
    error: errorUsers,
  } = useCountUsers();

  const {
    data: countModels,
    loading: loadingModels,
    error: errorModels,
  } = useCountModels();

  const {
    data: countCategories,
    loading: loadingCategories,
    error: errorCategories,
  } = useCountProdcuts();

  const {
    data: modelosMasVendidos,
    loading: loadingModelosMasVendidos,
    error: errorModelosMasVendidos,
  } = useModelosMasVendidos(startDate, endDate);

  // Log para depurar el estado recibido del hook
  useEffect(() => {
    if (!isLoadingPeriodReport) {
      // Loguear solo cuando no está cargando
      console.log(
        "ReportList: periodOrderStats recibido del hook:",
        periodOrderStats
      );
      console.log("ReportList: isLoadingPeriodReport:", isLoadingPeriodReport);
      console.log("ReportList: periodReportError:", periodReportError);
    }
  }, [periodOrderStats, isLoadingPeriodReport, periodReportError]);

  // Obtener los datos extra para el periodo seleccionado
  const currentPeriodExtraData = periodExtraStatsData[selectedPeriod];

  return (
    <div className="container mt-5">
      {/* Título para la sección de estadísticas */}
      <h2 className="text-center mb-4 fw-bold text-primary">
        <i className="bi bi-bar-chart-line-fill me-2"></i> Resumen General
      </h2>
      {/* Sección de Estadísticas Clave */}
      <StatsContainerStyled>
        <StatCardStyled>
          {loadingUsers ? (
            <Spinner animation="border" size="sm" variant="light" />
          ) : errorUsers ? (
            <i
              className="bi bi-exclamation-triangle-fill text-danger stat-icon"
              title={errorUsers.message || "Error"}
            ></i>
          ) : (
            <>
              <i className="bi bi-people-fill stat-icon"></i>
              <div className="stat-value">
                {countUsers?.toLocaleString() ?? "-"}
              </div>
              <div className="stat-label">Usuarios Totales</div>
            </>
          )}
        </StatCardStyled>

        {/* Pares Registrados - Nuevo Gradiente Verde/Turquesa */}
        <StatCardStyled
          style={{
            background: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
          }}
        >
          {loadingPairs ? (
            <Spinner animation="border" size="sm" variant="light" />
          ) : errorPairs ? (
            <i
              className="bi bi-exclamation-triangle-fill text-danger stat-icon"
              title={errorPairs.message || "Error"}
            ></i>
          ) : (
            <>
              <i className="bi bi-collection-fill stat-icon"></i>{" "}
              {/* Icono aproximado para pares */}
              <div className="stat-value">
                {countpairs?._sum.quantity?.toLocaleString()}
              </div>
              <div className="stat-label">Pares Registrados</div>
            </>
          )}
        </StatCardStyled>

        {/* Modelos Activos - Nuevo Gradiente Rojo/Naranja */}
        <StatCardStyled
          style={{
            background: "linear-gradient(135deg, #ff4e50 0%, #f9d423 100%)",
          }}
        >
          {loadingModels ? (
            <Spinner animation="border" size="sm" variant="light" />
          ) : errorModels ? (
            <i
              className="bi bi-exclamation-triangle-fill text-danger stat-icon"
              title={errorModels.message || "Error"}
            ></i>
          ) : (
            <>
              <i className="bi bi-box-seam stat-icon"></i>
              <div className="stat-value">
                {countModels?.toLocaleString() ?? "-"}
              </div>
              <div className="stat-label">Modelos Activos</div>
            </>
          )}
        </StatCardStyled>

        {/* Categorías - Nuevo Gradiente Rosa/Rojo */}
        <StatCardStyled
          style={{
            background: "linear-gradient(135deg, #ec008c 0%, #fc6767 100%)",
          }}
        >
          {loadingCategories ? (
            <Spinner animation="border" size="sm" variant="light" />
          ) : errorCategories ? (
            <i
              className="bi bi-exclamation-triangle-fill text-danger stat-icon"
              title={errorCategories.message || "Error"}
            ></i>
          ) : (
            <>
              <i className="bi bi-tags-fill stat-icon"></i>
              <div className="stat-value">
                {countCategories?.toLocaleString() ?? "-"}
              </div>
              <div className="stat-label">Categorías</div>
            </>
          )}
        </StatCardStyled>
      </StatsContainerStyled>
      <hr />
      {/* Título para Reporte por Periodo */}
      <h2 className="text-center mb-4 fw-bold text-success">
        <i className="bi bi-calendar-event-fill me-2"></i> Reporte por Periodo
      </h2>
      {/* Selector de Periodo */}
      <div className="d-flex justify-content-center mb-4">
        <Form.Select
          aria-label="Seleccionar periodo"
          value={selectedPeriod}
          onChange={handlePeriodChange}
          style={{ maxWidth: "250px" }}
          disabled={
            isLoadingPeriodReport ||
            isLoadingSumaTotalesOrdenes ||
            isLoadingParesVendidos ||
            loadingModelosMasVendidos
          }
        >
          <option value="day">Hoy</option>
          <option value="week">Esta Semana</option>
          <option value="month">Este Mes</option>
        </Form.Select>
      </div>
      {/* Sección de Estadísticas por Periodo */}
      <StatsContainerStyled>
        {/* Tarjeta Órdenes Creadas */}
        <StatCardStyled
          style={{
            background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
          }}
        >
          {isLoadingPeriodReport ? (
            <Spinner animation="border" size="sm" variant="light" />
          ) : periodReportError ? (
            <i
              className="bi bi-exclamation-triangle-fill text-danger stat-icon"
              title={periodReportError.message || "Error"}
            ></i>
          ) : (
            <>
              <i className="bi bi-cart-check-fill stat-icon"></i>
              <div className="stat-value">
                {periodOrderStats?.toLocaleString() ?? "-"}
              </div>
              <div className="stat-label">
                Órdenes Creadas - Todos los estados
              </div>
            </>
          )}
        </StatCardStyled>

        {/* Tarjeta Pares Vendidos */}
        <StatCardStyled
          style={{
            background: "linear-gradient(135deg, #ff8c42 0%, #ffcc6b 100%)",
          }}
        >
          {isLoadingParesVendidos ? (
            <Spinner animation="border" size="sm" variant="light" />
          ) : paresVendidosError ? (
            <i
              className="bi bi-exclamation-triangle-fill text-danger stat-icon"
              title={paresVendidosError.message || "Error"}
            ></i>
          ) : (
            <>
              <i className="bi bi-tag-fill stat-icon"></i>
              <div className="stat-value">
                {paresVendidos?.toLocaleString() ?? "-"}
              </div>
              <div className="stat-label">
                Pares Vendidos - Pedidos entregados
              </div>
            </>
          )}
        </StatCardStyled>

        {/* Tarjeta Total Recaudado */}
        <StatCardStyled
          style={{
            background: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
          }}
        >
          {isLoadingSumaTotalesOrdenes ? (
            <Spinner animation="border" size="sm" variant="light" />
          ) : sumaTotalesOrdenesError ? (
            <i
              className="bi bi-exclamation-triangle-fill text-danger stat-icon"
              title={sumaTotalesOrdenesError.message || "Error"} // Corregido para usar sumaTotalesOrdenesError
            ></i>
          ) : (
            <>
              <i className="bi bi-cash-coin stat-icon"></i>
              <div className="stat-value">
                {sumaTotalesOrdenes?.toLocaleString("es-CO", {
                  style: "currency",
                  currency: "COP",
                  minimumFractionDigits: 0,
                }) ?? "-"}
              </div>
              <div className="stat-label">
                Total Recaudado - pedidos entregados
              </div>
            </>
          )}
        </StatCardStyled>

        {/* Tarjeta Zapato Más Vendido (AHORA CON DATOS REALES) */}
        <StatCardStyled
          style={{
            background: "linear-gradient(135deg, #28a745 0%, #218838 100%)", // Tono verde
          }}
        >
          {loadingModelosMasVendidos ? (
            <Spinner animation="border" size="sm" variant="light" />
          ) : errorModelosMasVendidos ? (
            <i
              className="bi bi-exclamation-triangle-fill text-danger stat-icon"
              title={
                errorModelosMasVendidos.message ||
                "Error al cargar modelo más vendido"
              }
            ></i>
          ) : modelosMasVendidos && modelosMasVendidos.name ? (
            <>
              <div
                className="stat-label fw-bold"
                style={{ fontSize: "1.0rem", marginBottom: "2px" }}
              >
                Zapato Más Vendido
              </div>
              <i className="bi bi-star-fill stat-icon"></i>{" "}
              {/* Icono genérico de estrella/premio */}
              <div
                className="stat-value"
                style={{ fontSize: "1.1rem", lineHeight: "1.3" }}
              >
                {modelosMasVendidos.name}
                {modelosMasVendidos.color && (
                  <span
                    style={{
                      display: "block",
                      fontSize: "0.85rem",
                      opacity: 0.8,
                    }}
                  >
                    Color: {modelosMasVendidos.color}
                  </span>
                )}
              </div>
              <div className="stat-label" style={{ fontSize: "0.9rem" }}>
                {modelosMasVendidos.totalQuantitySold?.toLocaleString()} uds
                vendidas
              </div>
            </>
          ) : (
            <>
              <div
                className="stat-label fw-bold"
                style={{ fontSize: "1.0rem", marginBottom: "2px" }}
              >
                Zapato Más Vendido
              </div>
              <i className="bi bi-question-circle stat-icon"></i>
              <div className="stat-value" style={{ fontSize: "1rem" }}>
                No hay datos
              </div>
            </>
          )}
        </StatCardStyled>

        {/* Tarjeta Mejores 3 Vendedores (CON DATOS FICTICIOS AÚN) */}
        {/* <StatCardStyled
          style={{
            background: "linear-gradient(135deg, #17a2b8 0%, #138496 100%)", // Tono azul verdoso/info
            paddingTop: "12px",
            paddingBottom: "12px",
          }}
        >
          <>
            <i
              className={`bi ${currentPeriodExtraData.sellersIcon} stat-icon mb-2`}
            ></i>
            <div
              className="stat-label fw-bold"
              style={{ fontSize: "1.1rem", marginBottom: "5px" }}
            >
              Top 3 Vendedores
            </div>
            <ul
              className="list-unstyled text-start w-100 px-2"
              style={{ fontSize: "0.8rem" }}
            >
              {currentPeriodExtraData.topSellers.map((seller, index) => (
                <li key={index} className="d-flex justify-content-between py-1">
                  <span>
                    {index + 1}. {seller.name}
                  </span>
                  <span className="fw-bold">
                    {seller.sales.toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
          </>
        </StatCardStyled> */}

        {/* Se puede añadir una 4ta tarjeta vacía o con otra métrica si es necesario para el grid */}
        {/* <StatCardStyled style={{ background: 'transparent', boxShadow: 'none'}}></StatCardStyled> */}
      </StatsContainerStyled>
    </div>
  );
};
