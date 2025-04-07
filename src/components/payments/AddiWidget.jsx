import { useEffect, useRef } from "react";

const AddiWidget = ({ price, allySlug }) => {
  const widgetRef = useRef(null);

  console.log("AddiWidget", price, allySlug);

  useEffect(() => {
    if (window.addi && widgetRef.current) {
      window.addi.renderWidget(widgetRef.current);
    }
  }, [price, allySlug]);

  return (
    <div
      className=" h-20 flex justify-center items-center"
      ref={widgetRef}
      dangerouslySetInnerHTML={{
        __html: `<addi-widget price="${price}" ally-slug="${allySlug}"></addi-widget>`,
      }}
    />
  );
};

export default AddiWidget;
