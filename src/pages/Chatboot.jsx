import { useState } from "react";

export const Chatboot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async (message) => {
    const userMessage = { sender: "user", message };
    setMessages([...messages, { sender: "user", message }]);

    try {
      const response = await fetch(
        "http://localhost:5005/webhooks/rest/webhook",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userMessage),
        }
      );

      const botMessages = await response.json();

      setMessages((prevMessages) => [
        ...prevMessages,
        ...botMessages.map((msg) => ({ sender: "bot", message: msg.text })),
      ]);
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage(input);
      setInput("");
    }
  };

  return (
    <div className="flex flex-col max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <div className="flex-1 overflow-y-auto mb-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`my-2 p-2 rounded-lg ${
              msg.sender === "bot"
                ? "bg-blue-100 text-left"
                : "bg-green-100 text-right"
            }`}
          >
            <strong>{msg.sender === "bot" ? "Bot: " : "You: "}</strong>{" "}
            {msg.message}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe un mensaje..."
          className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
        >
          Enviar
        </button>
      </form>
    </div>
  );
};
