import { Form, Spinner } from "react-bootstrap";
import PropTypes from "prop-types";
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
  useCountOrdersWithCoupons,
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

const SectionHeader = ({ icon, title, accentFrom, accentTo }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
      marginBottom: "1.5rem",
    }}
  >
    <div
      style={{
        width: "4px",
        height: "28px",
        borderRadius: "3px",
        background: `linear-gradient(180deg, ${accentFrom}, ${accentTo})`,
        flexShrink: 0,
      }}
    />
    <i
      className={`bi ${icon}`}
      style={{ color: accentFrom, fontSize: "1.15rem" }}
    ></i>
    <h5
      style={{
        margin: 0,
        fontWeight: 700,
        fontSize: "1.1rem",
        color: "#0f172a",
        letterSpacing: "-0.3px",
      }}
    >
      {title}
    </h5>
    <div
      style={{
        flex: 1,
        height: "1px",
        background: "linear-gradient(90deg, #e2e8f0 0%, transparent 100%)",
      }}
    />
  </div>
);

SectionHeader.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  accentFrom: PropTypes.string.isRequired,
  accentTo: PropTypes.string.isRequired,
};

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

  const {
    data: countOrdersWithCoupons,
    loading: isLoadingCountOrdersWithCoupons,
    error: countOrdersWithCouponsError,
  } = useCountOrdersWithCoupons(queryStartDate, queryEndDate);

  console.log(
    "ReportList: countOrdersWithCoupons recibido del hook:",
    countOrdersWithCoupons
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
        borderColor: "#10b981",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 7,
        borderWidth: 2.5,
        pointBackgroundColor: "#10b981",
        pointBorderColor: "rgba(255,255,255,0.8)",
        pointBorderWidth: 2,
      },
      {
        label: "Utilidad Bruta",
        data:
          utilidadesInfoGraficos?.utilidadesPorDia?.map(
            (item) => item.utilidadBruta
          ) || [],
        borderColor: "#f59e0b",
        backgroundColor: "rgba(245, 158, 11, 0.1)",
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 7,
        borderWidth: 2.5,
        pointBackgroundColor: "#f59e0b",
        pointBorderColor: "rgba(255,255,255,0.8)",
        pointBorderWidth: 2,
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
          color: "rgba(255,255,255,0.8)",
          font: { size: 12, weight: "500" },
          usePointStyle: true,
          pointStyle: "circle",
          padding: 24,
        },
      },
      tooltip: {
        backgroundColor: "rgba(15, 23, 42, 0.96)",
        borderColor: "rgba(255,255,255,0.08)",
        borderWidth: 1,
        titleColor: "rgba(255,255,255,0.9)",
        bodyColor: "rgba(255,255,255,0.65)",
        padding: 12,
        cornerRadius: 10,
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
          color: "rgba(255,255,255,0.45)",
          font: { size: 11 },
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
          color: "rgba(255,255,255,0.05)",
        },
      },
      x: {
        ticks: {
          color: "rgba(255,255,255,0.45)",
          font: { size: 11 },
          maxRotation: 45,
          minRotation: 45,
          autoSkip: true,
          maxTicksLimit: 10,
        },
        grid: {
          color: "rgba(255,255,255,0.05)",
        },
      },
    },
  };

  return (
    <div className="container mt-5 pb-5">
      <style>{`
        .report-select {
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          font-size: 0.875rem;
          color: #374151;
          padding: 0.5rem 0.875rem;
          background: #fff;
          box-shadow: 0 1px 2px rgba(0,0,0,0.05);
          transition: border-color 0.2s, box-shadow 0.2s;
          width: auto;
          min-width: 150px;
          cursor: pointer;
        }
        .report-select:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59,130,246,0.12);
        }
        .report-datepicker-wrapper {
          width: auto;
          min-width: 220px;
        }
        .report-datepicker-wrapper .form-control {
          width: 100%;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          font-size: 0.875rem;
          color: #374151;
          padding: 0.5rem 0.875rem;
          box-shadow: 0 1px 2px rgba(0,0,0,0.05);
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .report-datepicker-wrapper .form-control:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59,130,246,0.12);
        }
        .report-datepicker-wrapper .form-control::placeholder {
          color: #9ca3af;
        }
      `}</style>

      {/* ── Resumen General ─────────────────────────────────────── */}
      <SectionHeader
        icon="bi-bar-chart-line-fill"
        title="Resumen General"
        accentFrom="#3b82f6"
        accentTo="#8b5cf6"
      />

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
            background: "linear-gradient(145deg, #059669 0%, #34d399 100%)",
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
              <i className="bi bi-collection-fill stat-icon"></i>
              <div className="stat-value">
                {countpairs?._sum.quantity?.toLocaleString()}
              </div>
              <div className="stat-label">Pares Registrados</div>
            </>
          )}
        </StatCardStyled>

        <StatCardStyled
          style={{
            background: "linear-gradient(145deg, #d97706 0%, #fbbf24 100%)",
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
            background: "linear-gradient(145deg, #e11d48 0%, #fb7185 100%)",
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

      {/* Divider */}
      <div
        style={{ height: "1px", background: "#f1f5f9", margin: "2.25rem 0" }}
      />

      {/* ── Reporte por Periodo ──────────────────────────────────── */}
      <SectionHeader
        icon="bi-calendar-event-fill"
        title="Reporte por Periodo"
        accentFrom="#10b981"
        accentTo="#3b82f6"
      />

      {/* Filter bar */}
      <div
        style={{
          background: "#f8fafc",
          border: "1px solid #e2e8f0",
          borderRadius: "14px",
          padding: "1rem 1.5rem",
          marginBottom: "1.5rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "0.875rem",
          flexWrap: "wrap",
        }}
      >
        <Form.Select
          aria-label="Seleccionar periodo"
          value={selectedPeriod}
          onChange={handlePeriodChange}
          className="report-select"
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
          wrapperClassName="report-datepicker-wrapper"
          placeholderText="Selecciona rango de fechas"
          disabled={isLoading}
          isClearable
        />
      </div>

      <StatsContainerStyled>
        <StatCardStyled
          style={{
            background: "linear-gradient(145deg, #0284c7 0%, #38bdf8 100%)",
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
                Órdenes · Entregadas y pagos confirmados
              </div>
            </>
          )}
        </StatCardStyled>

        <StatCardStyled
          style={{
            background: "linear-gradient(145deg, #ea580c 0%, #fb923c 100%)",
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
                Pares Vendidos · Pagos confirmados
              </div>
            </>
          )}
        </StatCardStyled>

        <StatCardStyled
          style={{
            background: "linear-gradient(145deg, #7c3aed 0%, #a78bfa 100%)",
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
              <div className="stat-value" style={{ fontSize: "1.55rem" }}>
                {sumaTotalesOrdenes?.toLocaleString("es-CO", {
                  style: "currency",
                  currency: "COP",
                  minimumFractionDigits: 0,
                }) ?? "-"}
              </div>
              <div className="stat-label">
                Total Recaudado · Pagos confirmados
              </div>
            </>
          )}
        </StatCardStyled>

        <StatCardStyled
          style={{
            background: "linear-gradient(145deg, #16a34a 0%, #4ade80 100%)",
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
              <i className="bi bi-star-fill stat-icon"></i>
              <div
                className="stat-value"
                style={{ fontSize: "1.15rem", lineHeight: "1.35" }}
              >
                {modelosMasVendidos.name}
                {modelosMasVendidos.color && (
                  <span
                    style={{
                      display: "block",
                      fontSize: "0.8rem",
                      opacity: 0.75,
                      marginTop: "2px",
                    }}
                  >
                    Color: {modelosMasVendidos.color}
                  </span>
                )}
              </div>
              <div className="stat-label">
                Modelo más vendido ·{" "}
                {modelosMasVendidos.totalQuantitySold?.toLocaleString()} uds
              </div>
            </>
          ) : (
            <>
              <i className="bi bi-question-circle stat-icon"></i>
              <div className="stat-value" style={{ fontSize: "1rem" }}>
                Sin datos
              </div>
              <div className="stat-label">Modelo más vendido</div>
            </>
          )}
        </StatCardStyled>

        {/* Utilidades — span 2 */}
        <StatCardStyled
          style={{
            background: "linear-gradient(145deg, #4338ca 0%, #818cf8 100%)",
            gridColumn: "span 2",
            textAlign: "left",
            padding: "1.75rem 2rem",
          }}
        >
          {isLoadingUtilidadesInfo ? (
            <div className="d-flex justify-content-center align-items-center h-100">
              <Spinner animation="border" variant="light" />
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
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  marginBottom: "1.25rem",
                  paddingBottom: "1rem",
                  borderBottom: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <i
                  className="bi bi-graph-up-arrow"
                  style={{ fontSize: "1.4rem", opacity: 0.85 }}
                ></i>
                <span
                  style={{ fontWeight: 700, fontSize: "1rem", color: "white" }}
                >
                  Resumen de Utilidades
                </span>
              </div>
              <div className="row gx-4 gy-3">
                <div className="col-sm-6 col-md-4">
                  <div
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      borderRadius: "10px",
                      padding: "0.875rem 1rem",
                    }}
                  >
                    <small
                      style={{
                        color: "rgba(255,255,255,0.55)",
                        fontSize: "0.7rem",
                        letterSpacing: "0.5px",
                        textTransform: "uppercase",
                      }}
                    >
                      Utilidad Neta
                    </small>
                    <div
                      style={{
                        fontWeight: 800,
                        fontSize: "1.2rem",
                        color: "#10b981",
                        marginTop: "2px",
                      }}
                    >
                      {formatCurrency(utilidadesInfo.utilidadNetaTotal)}
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-md-4">
                  <div
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      borderRadius: "10px",
                      padding: "0.875rem 1rem",
                    }}
                  >
                    <small
                      style={{
                        color: "rgba(255,255,255,0.55)",
                        fontSize: "0.7rem",
                        letterSpacing: "0.5px",
                        textTransform: "uppercase",
                      }}
                    >
                      Utilidad Bruta
                    </small>
                    <div
                      style={{
                        fontWeight: 800,
                        fontSize: "1.2rem",
                        color: "#f59e0b",
                        marginTop: "2px",
                      }}
                    >
                      {formatCurrency(utilidadesInfo.utilidadBrutaTotal)}
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-md-4">
                  <div
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      borderRadius: "10px",
                      padding: "0.875rem 1rem",
                    }}
                  >
                    <small
                      style={{
                        color: "rgba(255,255,255,0.55)",
                        fontSize: "0.7rem",
                        letterSpacing: "0.5px",
                        textTransform: "uppercase",
                      }}
                    >
                      Descuentos
                    </small>
                    <div
                      style={{
                        fontWeight: 800,
                        fontSize: "1.2rem",
                        color: "#f87171",
                        marginTop: "2px",
                      }}
                    >
                      {formatCurrency(utilidadesInfo.totalDescuentosAplicados)}
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-md-4">
                  <div
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      borderRadius: "10px",
                      padding: "0.875rem 1rem",
                    }}
                  >
                    <small
                      style={{
                        color: "rgba(255,255,255,0.55)",
                        fontSize: "0.7rem",
                        letterSpacing: "0.5px",
                        textTransform: "uppercase",
                      }}
                    >
                      Órdenes
                    </small>
                    <div
                      style={{
                        fontWeight: 800,
                        fontSize: "1.2rem",
                        color: "white",
                        marginTop: "2px",
                      }}
                    >
                      {utilidadesInfo.ordenesConsideradas?.toLocaleString() ??
                        "-"}
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-md-4">
                  <div
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      borderRadius: "10px",
                      padding: "0.875rem 1rem",
                    }}
                  >
                    <small
                      style={{
                        color: "rgba(255,255,255,0.55)",
                        fontSize: "0.7rem",
                        letterSpacing: "0.5px",
                        textTransform: "uppercase",
                      }}
                    >
                      Ítems
                    </small>
                    <div
                      style={{
                        fontWeight: 800,
                        fontSize: "1.2rem",
                        color: "white",
                        marginTop: "2px",
                      }}
                    >
                      {utilidadesInfo.itemsProcesados?.toLocaleString() ?? "-"}
                    </div>
                  </div>
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

        <StatCardStyled
          style={{
            background: "linear-gradient(145deg, #dc2626 0%, #f87171 100%)",
          }}
        >
          {isLoadingCountOrdersWithCoupons ? (
            <Spinner animation="border" size="sm" variant="light" />
          ) : countOrdersWithCouponsError ? (
            <i
              className="bi bi-exclamation-triangle-fill text-danger stat-icon"
              title={countOrdersWithCouponsError.message || "Error"}
            ></i>
          ) : (
            <>
              <i className="bi bi-gift-fill stat-icon"></i>
              <div className="stat-value">
                {countOrdersWithCoupons?.toLocaleString() ?? "-"}
              </div>
              <div className="stat-label">
                Órdenes con Cupones · Pagos confirmados
              </div>
            </>
          )}
        </StatCardStyled>
      </StatsContainerStyled>

      {/* Chart */}
      <StatCardGraficos>
        {isLoadingUtilidadesInfoGraficos ? (
          <div className="loading-container">
            <Spinner animation="border" variant="light" />
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
