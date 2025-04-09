// import { useEffect, useRef } from "react";

// const AddiWidget = ({ price, allySlug }) => {
//   const widgetRef = useRef(null);

//   console.log("AddiWidget", price, allySlug);

//   useEffect(() => {
//     if (window.addi && widgetRef.current) {
//       window.addi.renderWidget(widgetRef.current);
//     }
//   }, [price, allySlug]);

// return (
//   <div
//     className=" h-20 flex justify-center items-center"
//     ref={widgetRef}
//     dangerouslySetInnerHTML={{
//       __html: `<addi-widget price="${price}" ally-slug="${allySlug}"></addi-widget>`,
//     }}
//   />
// );
// };

// export default AddiWidget;

// import { useEffect, useRef } from "react";

// const AddiWidget = ({ price, allySlug }) => {
//   const widgetRef = useRef(null);

//   useEffect(() => {
//     if (
//       window.addi &&
//       typeof window.addi.renderWidget === "function" &&
//       widgetRef.current
//     ) {
//       window.addi.renderWidget(widgetRef.current);
//     } else {
//       console.error("Addi library or renderWidget function is not available.");
//     }
//   }, [price, allySlug]);

// return (
//   <div className="h-20 flex justify-center items-center" ref={widgetRef}>
//     <addi-widget price={price} ally-slug={allySlug}></addi-widget>
//   </div>
// );
// };

// export default AddiWidget;

// import { useEffect, useRef } from "react";

// const AddiWidget = ({ price, allySlug }) => {
//   const widgetRef = useRef(null);

//   useEffect(() => {
//     const checkAddiLibrary = () => {
//       if (
//         window.addi &&
//         typeof window.addi.renderWidget === "function" &&
//         widgetRef.current
//       ) {
//         window.addi.renderWidget(widgetRef.current);
//       } else {
//         console.error(
//           "Addi library or renderWidget function is not available."
//         );
//       }
//     };

//     if (!window.addi) {
//       const interval = setInterval(() => {
//         if (window.addi) {
//           clearInterval(interval);
//           checkAddiLibrary();
//         }
//       }, 100);
//     } else {
//       checkAddiLibrary();
//     }
//   }, [price, allySlug]);

//   if (!price || !allySlug) {
//     console.error("Price or AllySlug is missing.");
//     return null;
//   }

//   return (
//     <div
//       className=" h-20 flex justify-center items-center"
//       ref={widgetRef}
//       dangerouslySetInnerHTML={{
//         __html: `<addi-widget price="${price}" ally-slug="${allySlug}"></addi-widget>`,
//       }}
//     />
//   );
// };

// export default AddiWidget;

// import { useEffect, useRef } from "react";

// const AddiWidget = ({ price, allySlug }) => {
//   const widgetRef = useRef(null);

//   useEffect(() => {
//     const renderAddiWidget = () => {
//       if (
//         window.addi &&
//         typeof window.addi.renderWidget === "function" &&
//         widgetRef.current
//       ) {
//         window.addi.renderWidget(widgetRef.current);
//       } else {
//         console.error(
//           "Addi library or renderWidget function is not available."
//         );
//       }
//     };

//     // Cargar el script si no está presente
//     if (!window.addi) {
//       const script = document.createElement("script");
//       script.src = "https://cdn.addi.com/widget/checkout/index.min.js";
//       script.async = true;
//       script.onload = renderAddiWidget;
//       document.body.appendChild(script);
//     } else {
//       renderAddiWidget();
//     }
//   }, [price, allySlug]);

//   if (!price || !allySlug) {
//     console.error("Price or AllySlug is missing.");
//     return null;
//   }

//   return (
//     <div
//       className="min-h-[200px] w-full flex justify-center items-center"
//       ref={widgetRef}
//       dangerouslySetInnerHTML={{
//         __html: `<addi-widget price="${price}" ally-slug="${allySlug}"></addi-widget>`,
//       }}
//     />
//   );
// };

// export default AddiWidget;

// import { useEffect, useRef } from "react";

// const AddiWidget = ({ price, allySlug }) => {
//   const widgetRef = useRef(null);

//   useEffect(() => {
//     const renderAddi = () => {
//       setTimeout(() => {
//         if (
//           window.addi &&
//           typeof window.addi.renderWidget === "function" &&
//           widgetRef.current
//         ) {
//           window.addi.renderWidget(widgetRef.current);
//         } else {
//           console.error("Addi library not ready.");
//         }
//       }, 200); // da tiempo al DOM de montarse
//     };

//     if (!window.addi) {
//       const script = document.createElement("script");
//       script.src = "https://cdn.addi.com/widget/checkout/index.min.js";
//       script.async = true;
//       script.onload = renderAddi;
//       document.body.appendChild(script);
//     } else {
//       renderAddi();
//     }
//   }, [price, allySlug]);

//   if (!price || !allySlug) {
//     console.error("Price or AllySlug is missing.");
//     return null;
//   }

//   return (
//     <div
//       ref={widgetRef}
//       className="min-h-[200px] w-full flex justify-center items-center"
//       dangerouslySetInnerHTML={{
//         __html: `<addi-product-widget
//           price="${price}"
//           ally-slug="${allySlug}"
//           >
//         </addi-product-widget>`,
//       }}
//     />
//   );
// };

// export default AddiWidget;

// import { useEffect, useRef } from "react";

// const AddiWidget = ({ price, allySlug }) => {
//   const widgetRef = useRef(null);

//   useEffect(() => {
//     // Función para renderizar el widget de Addi
//     const renderAddiWidget = () => {
//       if (
//         window.addi &&
//         typeof window.addi.renderWidget === "function" &&
//         widgetRef.current
//       ) {
//         window.addi.renderWidget(widgetRef.current);
//       } else {
//         console.error(
//           "La librería de Addi no está disponible o renderWidget no es una función."
//         );
//       }
//     };

//     // Verificar si el script de Addi ya está cargado
//     if (!window.addi) {
//       const script = document.createElement("script");
//       script.src = "https://s3.amazonaws.com/widgets.addi.com/bundle.min.js";
//       script.async = true;
//       script.onload = renderAddiWidget;
//       document.body.appendChild(script);
//     } else {
//       renderAddiWidget();
//     }
//   }, [price, allySlug]);

//   if (!price || !allySlug) {
//     console.error("El precio o el allySlug no están definidos.");
//     return null;
//   }

//   return (
//     <div
//       ref={widgetRef}
//       className="min-h-[200px] w-full flex justify-center items-center"
//       dangerouslySetInnerHTML={{
//         __html: `<addi-widget price="${price}" ally-slug="${allySlug}"></addi-widget>`,
//       }}
//     />
//   );
// };

// export default AddiWidget;

// import { useEffect, useRef } from "react";

// const AddiWidget = ({ price, allySlug }) => {
//   const widgetRef = useRef(null);

//   useEffect(() => {
//     // Evita recargar el script si ya está cargado
//     if (!document.getElementById("addi-script")) {
//       const script = document.createElement("script");
//       script.id = "addi-script";
//       script.src = "https://s3.amazonaws.com/widgets.addi.com/bundle.min.js";
//       script.async = true;
//       document.body.appendChild(script);
//     }
//   }, []);

//   if (!price || !allySlug) {
//     console.error("El precio o el allySlug no están definidos.");
//     return null;
//   }

//   return (
//     <div
//       ref={widgetRef}
//       className="min-h-[200px] w-full flex justify-center items-center"
//       dangerouslySetInnerHTML={{
//         __html: `<addi-widget price="${price}" ally-slug="${allySlug}"></addi-widget>`,
//       }}
//     />
//   );
// };

// export default AddiWidget;

import { useEffect, useRef } from "react";

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

  return (
    <div
      ref={widgetRef}
      className="pt-2 w-full flex justify-center items-center"
      dangerouslySetInnerHTML={{
        __html: `<addi-widget price="${price}" ally-slug="${allySlug}"></addi-widget>`,
      }}
    />
  );
};

export default AddiWidget;
