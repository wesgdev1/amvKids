import { Html5Qrcode } from "html5-qrcode";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ScanShoe = () => {
  const navigate = useNavigate();
  const scannerRef = useRef(null);
  const [error, setError] = useState("");
  const [scanner, setScanner] = useState(null);

  useEffect(() => {
    const scannerInstance = new Html5Qrcode("scanner"); // ID del contenedor donde se mostrará el video
    setScanner(scannerInstance);
    const config = {
      fps: 60, // Velocidad de cuadros por segundo
      qrbox: { width: 250, height: 250 }, // Tamaño del área de escaneo
    };

    // Inicia el escáner
    scannerInstance
      .start(
        { facingMode: "environment" }, // Usa la cámara trasera
        config,
        (decodedText) => {
          scannerInstance.stop(); // Detiene el escaneo al leer un código
          navigate(`/productos/${decodedText}`); // Redirige al detalle
        },
        (errorMessage) => {
          console.warn("Error en el escaneo:", errorMessage);
        }
      )
      .catch((err) => setError(`Error al iniciar el escáner: ${err.message}`));

    // Limpieza al desmontar el componente
    return () => {
      if (scannerInstance.isScanning) {
        scannerInstance
          .stop()
          .catch((err) => console.warn("Error al detener el escáner:", err));
      }
    };
  }, [navigate]);

  return (
    <div className="pt-5 px-4">
      <h4 className="pb-3">
        <i className="bi bi-receipt-cutoff"></i> Escanear Calzado
      </h4>
      <p>Escane el codigo del calzado</p>
      {error && <p>{error}</p>}

      <div className="flex justify-center">
        <div
          id="scanner"
          ref={scannerRef}
          style={{ width: "30%", height: "30%" }}
        ></div>
      </div>
    </div>
  );
};
