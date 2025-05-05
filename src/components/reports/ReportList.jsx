import { Card, Form, Spinner } from "react-bootstrap";
import { useState } from "react";
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
} from "../../domain/reports/useReports";

// Datos de prueba
const salesData = [
  { day: "Lun", ventas: 120 },
  { day: "Mar", ventas: 180 },
  { day: "Mié", ventas: 150 },
  { day: "Jue", ventas: 200 },
  { day: "Vie", ventas: 220 },
  { day: "Sáb", ventas: 250 },
  { day: "Dom", ventas: 190 },
];

const bestSellers = [
  { name: "Juan Pérez", sales: 55 },
  { name: "María Gómez", sales: 48 },
  { name: "Carlos Ruiz", sales: 45 },
];

const topProduct = {
  name: "Nike Air Max 90",
  sales: 120,
};

// Datos estáticos para el reporte por periodo
const periodStatsData = {
  day: { orders: 15, pairs: 45, revenue: 1250000 },
  week: { orders: 80, pairs: 280, revenue: 7800000 },
  month: { orders: 350, pairs: 1100, revenue: 31000000 },
};

export const ReportList = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("day"); // Estado para el periodo

  // Handler para el cambio de selección
  const handlePeriodChange = (event) => {
    const newPeriod = event.target.value;
    setSelectedPeriod(newPeriod);
    console.log(`Periodo seleccionado: ${newPeriod}. Fetching data...`);
    // Aquí iría la llamada a la API para obtener datos reales
  };

  // Obtener los datos a mostrar según el periodo seleccionado
  const currentPeriodData = periodStatsData[selectedPeriod];

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
        >
          <option value="day">Hoy</option>
          <option value="week">Esta Semana</option>
          <option value="month">Este Mes</option>
        </Form.Select>
      </div>
      {/* Sección de Estadísticas por Periodo */}
      <StatsContainerStyled>
        <StatCardStyled
          style={{
            background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
          }}
        >
          <i className="bi bi-cart-check-fill stat-icon"></i>
          <div className="stat-value">
            {currentPeriodData.orders.toLocaleString()}
          </div>
          <div className="stat-label">Órdenes Creadas</div>
        </StatCardStyled>

        <StatCardStyled
          style={{
            background: "linear-gradient(135deg, #ff8c42 0%, #ffcc6b 100%)",
          }}
        >
          <i className="bi bi-tag-fill stat-icon"></i>
          <div className="stat-value">
            {currentPeriodData.pairs.toLocaleString()}
          </div>
          <div className="stat-label">Pares Vendidos</div>
        </StatCardStyled>

        <StatCardStyled
          style={{
            background: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
          }}
        >
          <i className="bi bi-cash-coin stat-icon"></i>
          <div className="stat-value">
            {currentPeriodData.revenue.toLocaleString("es-CO", {
              style: "currency",
              currency: "COP",
              minimumFractionDigits: 0,
            })}
          </div>
          <div className="stat-label">Total Recaudado</div>
        </StatCardStyled>
        {/* Se puede añadir una 4ta tarjeta vacía o con otra métrica si es necesario para el grid */}
        {/* <StatCardStyled style={{ background: 'transparent', boxShadow: 'none'}}></StatCardStyled> */}
      </StatsContainerStyled>
      <hr className="mt-5" /> {/* Separador antes de la siguiente sección */}
      {/* Título para la sección de detalles */}
      <h2 className="text-center mb-4 fw-bold text-info">
        <i className="bi bi-graph-up-arrow me-2"></i> Análisis Detallado
      </h2>
      <div className="row g-4">
        {/* Mejores vendedores */}
        <div className="col-md-4">
          <Card className="shadow-lg border-0 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
            <Card.Body>
              <div className="d-flex align-items-center gap-2">
                <Trophy size={28} />
                <Card.Title className="fs-4 fw-bold">
                  Mejores Vendedores
                </Card.Title>
              </div>

              {/* usar una tabla */}
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Ventas</th>
                  </tr>
                </thead>
                <tbody>
                  {bestSellers.map((seller, index) => (
                    <tr key={index}>
                      <td>{seller.name}</td>
                      <td>{seller.sales}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card.Body>
          </Card>
        </div>

        {/* Producto más vendido */}
        <div className="col-md-4">
          <Card className="shadow-lg border-0 rounded-xl bg-gradient-to-r from-green-500 to-teal-500 text-white">
            <Card.Body>
              <div className="d-flex align-items-center gap-2">
                <ShoppingBag size={28} />
                <Card.Title className="fs-4 fw-bold">Más Vendido</Card.Title>
              </div>
              <p className="mt-3 fs-3 fw-bold">{topProduct.name}</p>
              <p className="fs-5">Ventas: {topProduct.sales}</p>
            </Card.Body>
          </Card>
        </div>

        {/* Ventas diarias */}
        <div className="col-md-4">
          <Card className="shadow-lg border-0 rounded-xl">
            <Card.Body>
              <div className="d-flex align-items-center text-primary gap-2">
                <LineChart size={28} />
                <Card.Title className="fs-4 fw-bold">Ventas Diarias</Card.Title>
              </div>
              <div className="mt-4">
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={salesData}>
                    <XAxis dataKey="day" stroke="#888" />
                    <YAxis />
                    <Tooltip />
                    <Bar
                      dataKey="ventas"
                      fill="#3b82f6"
                      radius={[5, 5, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};
