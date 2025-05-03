import { useEffect } from "react";

const BoldCheckout = ({ total, orderId }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.bold.co/checkout.js"; // Asegúrate de usar la URL correcta
    script.dataset.boldButton = "";
    script.dataset.apiKey = "TU_LLAVE_API";
    script.dataset.description = "Pago a través de Embedded Checkout";
    script.dataset.redirectionUrl = "https://micomercio.com/pagos/resultado";
    script.dataset.renderMode = "embedded";

    // 👇 Aquí envías la información de la orden
    script.dataset.checkoutData = JSON.stringify({
      amount: total, // en centavos, por ejemplo 5000 = $50.00
      currency: "COP",
      external_id: orderId,
      items: [
        {
          name: "Orden de compra",
          price: total,
          quantity: 1,
        },
      ],
    });

    const container = document.getElementById("bold-checkout");
    container.innerHTML = ""; // Limpiar si ya existía
    container.appendChild(script);
  }, [total, orderId]);

  return <div id="bold-checkout"></div>;
};

export default BoldCheckout;
