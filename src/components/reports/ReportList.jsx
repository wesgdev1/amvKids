import { Form, Spinner } from "react-bootstrap";
import { useState, useEffect } from "react";
import {
  StatsContainerStyled,
  StatCardStyled,
  StatCardGraficos,
} from "./StyledComponents";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { es } from "date-fns/locale";
import {
  useCountModels,
  useCountPairs,
  useCountProdcuts,
  useCountUsers,
  useCountOrders,
  useSumaTotalesOrdenes,
  useParesVendidos,
  useModelosMasVendidos,
  useInfoUtilidades,
  useInfoUtilidadesGraficos,
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
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const ReportList = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("day");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [queryStartDate, setQueryStartDate] = useState(null);
  const [queryEndDate, setQueryEndDate] = useState(null);

  useEffect(() => {
    const timestampFormat = "yyyy-MM-dd HH:mm:ss.SSS";
    if (startDate) {
      setQueryStartDate(format(startOfDay(startDate), timestampFormat));

      if (endDate) {
        setQueryEndDate(format(endOfDay(endDate), timestampFormat));
      } else {
        setQueryEndDate(format(endOfDay(startDate), timestampFormat));
      }
    } else {
      setQueryStartDate(null);
      setQueryEndDate(null);
    }
  }, [startDate, endDate]);

  const {
    data: periodOrderStats,
    loading: isLoadingPeriodReport,
    error: periodReportError,
  } = useCountOrders(queryStartDate, queryEndDate);

  const {
    data: sumaTotalesOrdenes,
    loading: isLoadingSumaTotalesOrdenes,
    error: sumaTotalesOrdenesError,
  } = useSumaTotalesOrdenes(queryStartDate, queryEndDate);

  const {
    data: paresVendidos,
    loading: isLoadingParesVendidos,
    error: paresVendidosError,
  } = useParesVendidos(queryStartDate, queryEndDate);

  const {
    data: utilidadesInfo,
    loading: isLoadingUtilidadesInfo,
    error: utilidadesInfoError,
  } = useInfoUtilidades(queryStartDate, queryEndDate);

  const {
    data: utilidadesInfoGraficos,
    loading: isLoadingUtilidadesInfoGraficos,
    error: utilidadesInfoErrorGraficos,
  } = useInfoUtilidadesGraficos(queryStartDate, queryEndDate);

  console.log(
    "ReportList: utilidadesInfoGraficos recibido del hook:",
    utilidadesInfoGraficos
  );

  const handleDateChange = (dates) => {
    const [newStart, newEnd] = dates;

    setStartDate(newStart);
    setEndDate(newEnd);

    setSelectedPeriod("custom");
  };

  const handlePeriodChange = (event) => {
    const newPeriod = event.target.value;
    setSelectedPeriod(newPeriod);
    const now = new Date();
    let newRawStartDate, newRawEndDate;

    if (newPeriod === "custom") {
      return;
    }

    switch (newPeriod) {
      case "day":
        newRawStartDate = startOfDay(now);
        newRawEndDate = endOfDay(now);
        break;
      case "week":
        newRawStartDate = startOfWeek(now, { weekStartsOn: 1 });
        newRawEndDate = endOfWeek(now, { weekStartsOn: 1 });
        break;
      case "month":
        newRawStartDate = startOfMonth(now);
        newRawEndDate = endOfMonth(now);
        break;
      default:
        newRawStartDate = startOfDay(now);
        newRawEndDate = endOfDay(now);
    }

    setStartDate(newRawStartDate);
    setEndDate(newRawEndDate);
  };

  useEffect(() => {
    const now = new Date();
    setStartDate(startOfDay(now));
    setEndDate(endOfDay(now));
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
  } = useModelosMasVendidos(queryStartDate, queryEndDate);

  useEffect(() => {
    if (!isLoadingPeriodReport) {
      console.log(
        "ReportList: periodOrderStats recibido del hook:",
        periodOrderStats
      );
      console.log("ReportList: isLoadingPeriodReport:", isLoadingPeriodReport);
      console.log("ReportList: periodReportError:", periodReportError);
    }
  }, [
    periodOrderStats,
    isLoadingPeriodReport,
    periodReportError,
    queryStartDate,
    queryEndDate,
  ]);

  const isLoading =
    isLoadingPeriodReport ||
    isLoadingSumaTotalesOrdenes ||
    isLoadingParesVendidos ||
    loadingModelosMasVendidos ||
    isLoadingUtilidadesInfo;

  const formatCurrency = (value) => {
    if (typeof value !== "number") return "-";
    return value.toLocaleString("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  const getDateFormat = (fecha) => {
    const [year, month, day] = fecha.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 7) {
      return format(date, "dd/MM");
    } else if (diffDays <= 31) {
      return format(date, "dd/MM");
    } else if (diffDays <= 365) {
      return format(date, "MMM yyyy", { locale: es });
    } else {
      return format(date, "yyyy");
    }
  };

  const chartData = {
    labels:
      utilidadesInfoGraficos?.utilidadesPorDia?.map((item) =>
        getDateFormat(item.fecha)
      ) || [],
    datasets: [
      {
        label: "Utilidad Neta",
        data:
          utilidadesInfoGraficos?.utilidadesPorDia?.map(
            (item) => item.utilidadNeta
          ) || [],
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: "Utilidad Bruta",
        data:
          utilidadesInfoGraficos?.utilidadesPorDia?.map(
            (item) => item.utilidadBruta
          ) || [],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "white",
          font: {
            size: 12,
          },
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
      tooltip: {
        callbacks: {
          title: function (context) {
            const fecha =
              utilidadesInfoGraficos?.utilidadesPorDia[context[0].dataIndex]
                .fecha;
            const [year, month, day] = fecha.split("-").map(Number);
            const date = new Date(year, month - 1, day);
            return format(date, "dd/MM/yyyy");
          },
          label: function (context) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat("es-CO", {
                style: "currency",
                currency: "COP",
                minimumFractionDigits: 0,
              }).format(context.parsed.y);
            }
            return label;
          },
        },
      },
    },
    scales: {
      y: {
        ticks: {
          color: "white",
          callback: function (value) {
            return new Intl.NumberFormat("es-CO", {
              style: "currency",
              currency: "COP",
              minimumFractionDigits: 0,
              notation: "compact",
            }).format(value);
          },
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
      x: {
        ticks: {
          color: "white",
          maxRotation: 45,
          minRotation: 45,
          autoSkip: true,
          maxTicksLimit: 10,
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
    },
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 fw-bold text-primary">
        <i className="bi bi-bar-chart-line-fill me-2"></i> Resumen General
      </h2>
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
              <div className="stat-value">
                {countpairs?._sum.quantity?.toLocaleString()}
              </div>
              <div className="stat-label">Pares Registrados</div>
            </>
          )}
        </StatCardStyled>

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
      <h2 className="text-center mb-4 fw-bold text-success">
        <i className="bi bi-calendar-event-fill me-2"></i> Reporte por Periodo
      </h2>

      <div className="d-flex justify-content-center align-items-center mb-4 gap-3 flex-wrap">
        <Form.Select
          aria-label="Seleccionar periodo"
          value={selectedPeriod}
          onChange={handlePeriodChange}
          style={{ width: "auto", minWidth: "150px" }}
          disabled={isLoading}
        >
          <option value="day">Hoy</option>
          <option value="week">Esta Semana</option>
          <option value="month">Este Mes</option>
          <option value="custom">Personalizado</option>
        </Form.Select>

        <DatePicker
          selected={startDate}
          onChange={handleDateChange}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          locale={es}
          dateFormat="dd/MM/yyyy"
          className="form-control"
          wrapperClassName="date-picker-wrapper"
          style={{ width: "auto" }}
          placeholderText="Selecciona rango de fechas"
          disabled={isLoading}
          isClearable
        />
        <style>{`
          .date-picker-wrapper {
            width: auto;
            min-width: 220px;
          }
          .date-picker-wrapper .form-control {
             width: 100%;
          }
        `}</style>
      </div>

      <StatsContainerStyled>
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
                Órdenes Creadas - Pedidos entregados y pagos confirmados
              </div>
            </>
          )}
        </StatCardStyled>

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
                Pares Vendidos - Pedidos entregados y pagos Confirmados
              </div>
            </>
          )}
        </StatCardStyled>

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
              title={sumaTotalesOrdenesError.message || "Error"}
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
                Total Recaudado - pedidos Entregados y pagos confirmados
              </div>
            </>
          )}
        </StatCardStyled>

        <StatCardStyled
          style={{
            background: "linear-gradient(135deg, #28a745 0%, #218838 100%)",
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
                Modelo Más Vendido
              </div>
              <i className="bi bi-star-fill stat-icon"></i>{" "}
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
                Modelo Más Vendido
              </div>
              <i className="bi bi-question-circle stat-icon"></i>
              <div className="stat-value" style={{ fontSize: "1rem" }}>
                No hay datos
              </div>
            </>
          )}
        </StatCardStyled>

        <StatCardStyled
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            gridColumn: "span 2",
            textAlign: "left",
            padding: "15px",
          }}
        >
          {isLoadingUtilidadesInfo ? (
            <div className="d-flex justify-content-center align-items-center h-100">
              <Spinner animation="border" size="lg" variant="light" />
            </div>
          ) : utilidadesInfoError ? (
            <div className="d-flex flex-column justify-content-center align-items-center h-100">
              <i
                className="bi bi-emoji-frown-fill text-warning stat-icon mb-2"
                style={{ fontSize: "2rem" }}
              ></i>
              <div className="stat-label text-center">
                Error al cargar utilidades
                {utilidadesInfoError.message && (
                  <small className="d-block">
                    ({utilidadesInfoError.message})
                  </small>
                )}
              </div>
            </div>
          ) : utilidadesInfo ? (
            <>
              <div className="d-flex align-items-center mb-3">
                <i
                  className="bi bi-graph-up-arrow stat-icon me-3"
                  style={{ fontSize: "2.5rem" }}
                ></i>
                <h5 className="mb-0 text-white fw-bold">
                  Resumen de Utilidades
                </h5>
              </div>
              <div className="row gx-3 gy-2">
                <div className="col-sm-6">
                  <small className="text-white-50 d-block">
                    Utilidad Neta Total
                  </small>
                  <strong className="fs-5 text-white">
                    {formatCurrency(utilidadesInfo.utilidadNetaTotal)}
                  </strong>
                </div>
                <div className="col-sm-6">
                  <small className="text-white-50 d-block">
                    Utilidad Bruta Total
                  </small>
                  <strong className="fs-5 text-white">
                    {formatCurrency(utilidadesInfo.utilidadBrutaTotal)}
                  </strong>
                </div>
                <div className="col-sm-6">
                  <small className="text-white-50 d-block">
                    Descuentos Aplicados
                  </small>
                  <strong className="fs-5 text-white">
                    {formatCurrency(utilidadesInfo.totalDescuentosAplicados)}
                  </strong>
                </div>
                <div className="col-sm-6">
                  <small className="text-white-50 d-block">
                    Órdenes Consideradas
                  </small>
                  <strong className="fs-5 text-white">
                    {utilidadesInfo.ordenesConsideradas?.toLocaleString() ??
                      "-"}
                  </strong>
                </div>
                <div className="col-sm-6">
                  <small className="text-white-50 d-block">
                    Ítems Procesados
                  </small>
                  <strong className="fs-5 text-white">
                    {utilidadesInfo.itemsProcesados?.toLocaleString() ?? "-"}
                  </strong>
                </div>
              </div>
            </>
          ) : (
            <div className="d-flex flex-column justify-content-center align-items-center h-100">
              <i
                className="bi bi-info-circle-fill text-white-50 stat-icon mb-2"
                style={{ fontSize: "2rem" }}
              ></i>
              <div className="stat-label text-center">
                No hay datos de utilidad para el periodo.
              </div>
            </div>
          )}
        </StatCardStyled>
      </StatsContainerStyled>

      <StatCardGraficos>
        {isLoadingUtilidadesInfoGraficos ? (
          <div className="loading-container">
            <Spinner animation="border" size="lg" variant="light" />
          </div>
        ) : utilidadesInfoErrorGraficos ? (
          <div className="error-container">
            <i className="bi bi-exclamation-triangle-fill text-warning"></i>
            <div className="stat-label text-center">
              Error al cargar gráfico de utilidades
              {utilidadesInfoErrorGraficos.message && (
                <small className="d-block">
                  ({utilidadesInfoErrorGraficos.message})
                </small>
              )}
            </div>
          </div>
        ) : utilidadesInfoGraficos?.utilidadesPorDia?.length > 0 ? (
          <>
            <div className="grafico-header">
              <i className="bi bi-graph-up-arrow"></i>
              <h5>Evolución de Utilidades</h5>
            </div>
            <div className="grafico-container">
              <Line data={chartData} options={chartOptions} />
            </div>
          </>
        ) : (
          <div className="no-data-container">
            <i className="bi bi-info-circle-fill"></i>
            <div className="stat-label text-center">
              No hay datos de utilidad para el periodo seleccionado.
            </div>
          </div>
        )}
      </StatCardGraficos>
    </div>
  );
};
