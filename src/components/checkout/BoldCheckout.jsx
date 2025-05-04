import { useEffect } from "react";

const BoldCheckout = ({ total, orderId }) => {
  console.log("bold");
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.bold.co/bold.js"; // Script oficial de Bold
    script.async = true;

    script.setAttribute("data-bold-button", "");
    script.setAttribute(
      "data-api-key",
      "i5N_992Eh1CoG8Vx6WSYZEn5Uj6g9O4Tno15zQzLWUo"
    );
    script.setAttribute(
      "data-description",
      "Pago a través de Embedded Checkout"
    );
    script.setAttribute(
      "data-redirection-url",
      "https://micomercio.com/pagos/resultado"
    );
    script.setAttribute("data-render-mode", "embedded");

    document.getElementById("bold-container").appendChild(script);
  }, []);

  return (
    <div>
      <div id="bold-container" />
    </div>
  );
};

export default BoldCheckout;
