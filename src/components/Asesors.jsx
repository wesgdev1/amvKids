// import React from 'react'; // No es necesario en versiones recientes de React con el nuevo transform JSX

const Asesors = () => {
  const imageUrl =
    "https://res.cloudinary.com/dppqkypts/image/upload/v1745955616/ChatGPT_Image_29_abr_2025_02_38_09_p.m._a9mgmk.png";
  // Reemplaza 'TU_NUMERO' con tu número de WhatsApp real, incluyendo código de país sin el '+'
  const whatsappNumber = "573112728811"; // Ejemplo Perú: 51 + número
  const whatsappMessage = encodeURIComponent(
    "Hola, estoy interesado en ser asesor de sus productos."
  );
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6 md:p-10 rounded-lg shadow-lg my-8 mx-auto max-w-6xl overflow-hidden">
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
        {/* Imagen */}
        <div className="w-full md:w-5/12 flex-shrink-0 transform transition duration-500 hover:scale-105">
          <img
            src={imageUrl}
            alt="Conviértete en Asesor y obtén ganancias"
            className="rounded-xl shadow-md w-full h-auto object-cover max-h-[350px] md:max-h-[450px]" // Ajustar altura máxima si es necesario
          />
        </div>

        {/* Contenido de Texto y Botón */}
        <div className="w-full md:w-7/12 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 leading-tight">
            🚀 ¡Impulsa tus Ingresos! Conviértete en Asesor
          </h2>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            ¿Buscas una oportunidad emocionante? Únete a nuestro equipo y genera{" "}
            <strong className="text-indigo-600 font-semibold">
              magníficas ganancias
            </strong>{" "}
            promocionando productos innovadores que la gente ama. Te brindamos
            todo el apoyo y las herramientas para que triunfes.
          </p>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-3 bg-green-500 hover:bg-green-600 text-white text-lg font-semibold rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-green-50"
          >
            <i className="bi bi-whatsapp mr-3 text-2xl"></i>{" "}
            {/* Ícono de WhatsApp más grande */}
            ¡Quiero ser Asesor!
          </a>
        </div>
      </div>
    </div>
  );
};

export default Asesors;
