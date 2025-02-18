import { Card } from "react-bootstrap";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Trophy, ShoppingBag, LineChart } from "lucide-react";

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

export const ReportList = () => {
  return (
    <div className="container mt-5">
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
