const Asesors = () => {
  const imageUrl =
    "https://res.cloudinary.com/dppqkypts/image/upload/v1745955616/ChatGPT_Image_29_abr_2025_02_38_09_p.m._a9mgmk.png";
  const whatsappNumber = "573123460008";
  const whatsappMessage = encodeURIComponent(
    "Hola, estoy interesado en ser asesor de sus productos."
  );
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="relative my-12 mx-4 lg:mx-8">
      {/* Fondo con gradiente animado */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-500 to-green-400 rounded-3xl animate-pulse opacity-20"></div>

      {/* Contenedor principal */}
      <div className="relative bg-white/90 backdrop-blur-sm border border-white/20 rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-700 hover:scale-[1.02] hover:shadow-purple-500/25">
        {/* Efectos de brillo */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-blue-400 to-green-400 animate-pulse"></div>

        <div className="flex flex-col lg:flex-row items-center">
          {/* Sección de imagen */}
          <div className="w-full lg:w-1/2 p-8 lg:p-12">
            <div className="relative group">
              {/* Efecto de glow detrás de la imagen */}
              <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>

              <img
                src={imageUrl}
                alt="Conviértete en Asesor y obtén ganancias"
                className="relative rounded-2xl w-full h-auto object-cover shadow-xl transform transition-all duration-500 group-hover:scale-105 group-hover:rotate-1"
              />

              {/* Overlay con efecto hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>

          {/* Sección de contenido */}
          <div className="w-full lg:w-1/2 p-8 lg:p-12 text-center lg:text-left">
            {/* Badge animado */}
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-sm font-medium rounded-full mb-6 animate-bounce">
              ✨ Oportunidad Exclusiva
            </div>

            {/* Título principal */}
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-black bg-gradient-to-r from-purple-600 via-blue-600 to-green-500 bg-clip-text text-transparent mb-6 leading-tight">
              ¡Impulsa tus Ingresos!
            </h2>

            {/* Subtítulo */}
            <p className="text-xl lg:text-2xl font-semibold text-gray-700 mb-4">
              Conviértete en Asesor
            </p>

            {/* Descripción */}
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Únete a nuestro equipo y genera{" "}
              <span className="font-bold bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
                ganancias extraordinarias
              </span>{" "}
              promocionando productos innovadores. Te brindamos todas las
              herramientas para tu éxito.
            </p>

            {/* Botón CTA con efectos avanzados */}
            <div className="relative group inline-block">
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300 animate-pulse"></div>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white text-xl font-bold rounded-2xl shadow-xl transform transition-all duration-300 hover:scale-110 hover:shadow-green-500/50 focus:outline-none focus:ring-4 focus:ring-green-300 group-hover:from-green-400 group-hover:to-green-500"
              >
                <i className="bi bi-whatsapp mr-3 text-2xl animate-bounce"></i>
                <span className="relative">
                  ¡Quiero ser Asesor!
                  <span className="absolute inset-0 bg-white/20 rounded-lg transform scale-0 group-hover:scale-100 transition-transform duration-300"></span>
                </span>
              </a>
            </div>

            {/* Elementos decorativos */}
            <div className="flex justify-center lg:justify-start space-x-6 mt-8 text-sm text-gray-500">
              <div className="flex items-center">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                Sin inversión inicial
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></span>
                Capacitación incluida
              </div>
            </div>
          </div>
        </div>

        {/* Partículas flotantes */}
        <div className="absolute top-10 left-10 w-4 h-4 bg-purple-400 rounded-full opacity-30 animate-ping"></div>
        <div className="absolute top-20 right-20 w-3 h-3 bg-blue-400 rounded-full opacity-40 animate-bounce delay-100"></div>
        <div className="absolute bottom-20 left-20 w-2 h-2 bg-green-400 rounded-full opacity-50 animate-pulse delay-200"></div>
      </div>
    </div>
  );
};

export default Asesors;
