import { useEffect } from "react";
import "@n8n/chat/style.css"; // estilos base del widget (primero)
import "./chat.css"; // tus overrides (después)

// Componente del chat
export const N8nChat = () => {
  useEffect(() => {
    const initChat = async () => {
      try {
        console.log("🚀 Iniciando chat N8n...");

        const { createChat } = await import("@n8n/chat");

        createChat({
          webhookUrl:
            "https://n8n.srv1004706.hstgr.cloud/webhook/1181f253-d7de-4005-a652-29835aa6b537/chat",
          target: "#n8n-chat-container",

          mode: "window",
          chatInputKey: "chatInput",
          chatSessionKey: "sessionId",
          loadPreviousSession: true,
          metadata: {
            empresa: "AMV KIDS",
            ciudad: "Cúcuta",
          },
          showWelcomeScreen: false,
          defaultLanguage: "es",
          initialMessages: [
            "¡Hola! 👋",
            "Soy el asistente virtual de AMV KIDS. ¿Cómo puedo ayudarte hoy?",
          ],
          i18n: {
            es: {
              title: "Soporte AMV KIDS  🤖",
              //emoji robótico: 🤖
              subtitle: "Estamos aquí para ayudarte",
              footer: "Disponible 24/7",
              getStarted: "Nueva conversación",
              inputPlaceholder: "Escribe tu mensaje...",
            },
          },
          enableStreaming: false,
        });

        console.log("✅ Chat creado");
        setTimeout(() => {
          const toggleButton = document.querySelector(".n8n-chat-toggle");
          if (toggleButton) {
            // Aplicar estilos directamente
            toggleButton.style.background = "#fff";
            toggleButton.style.backgroundImage = 'url("/mi-icono.png")';
            toggleButton.style.backgroundSize = "60% auto";
            toggleButton.style.backgroundRepeat = "no-repeat";
            toggleButton.style.backgroundPosition = "center";
            toggleButton.style.border = "2px solid #390688";

            // Ocultar SVG
            const svg = toggleButton.querySelector("svg");
            if (svg) {
              svg.style.display = "none";
            }

            console.log("🎨 Estilos personalizados aplicados");
          }
        }, 500);
      } catch (error) {
        console.error("❌ Error al crear el chat:", error);
      }
    };

    initChat();
  }, []);

  return (
    <>
      {/* Contenedor del chat */}
      <div id="n8n-chat-container"></div>
    </>
  );
};
