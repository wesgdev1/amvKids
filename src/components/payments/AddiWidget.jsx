import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

const AddiWidget = ({ price, allySlug }) => {
  const widgetRef = useRef(null);

  useEffect(() => {
    const render = () => {
      if (window.addi && widgetRef.current) {
        window.addi.renderWidget(widgetRef.current);
      }
    };

    if (!document.getElementById("addi-script")) {
      const script = document.createElement("script");
      script.id = "addi-script";
      script.src = "https://s3.amazonaws.com/widgets.addi.com/bundle.min.js";
      script.async = true;
      script.onload = render;
      document.body.appendChild(script);
    } else {
      render();
    }
  }, [price, allySlug]);

  if (!price || !allySlug) return null;

  // Convertir precio a número para la comparación
  const numericalPrice = parseFloat(price);

  // No renderizar si el precio no es válido o es menor/igual a 50000
  if (isNaN(numericalPrice) || numericalPrice <= 50000) {
    return null;
  }

  return (
    <div
      ref={widgetRef}
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "0 auto",
        backgroundColor: "white",
        borderRadius: "10px",
        paddingTop: "10px",
      }}
      className="my-2 w-full text-center"
      dangerouslySetInnerHTML={{
        __html: `
          <addi-widget 
            price="${price}" 
            ally-slug="${allySlug}"
            widget-border-radius="20px" 
            widget-font-color="white"
            widget-badge-background-color="#2563eb"
            widget-border-color="#2563eb"
            widget-font-family="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
            widget-font-size="16px"
            widget-margin="0"
           
            widget-addi-icon-type="filled"
          ></addi-widget>
        `,
      }}
    />
  );
};

AddiWidget.propTypes = {
  price: PropTypes.string.isRequired,
  allySlug: PropTypes.string.isRequired,
};

export default AddiWidget;
