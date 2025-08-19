import { useEffect, useState } from "react";

import { socket } from "../lib/socket";

export function useChatSocket() {
  const [messages, setMessages] = useState<{ from: string; text: string }[]>([]);

  useEffect(() => {
    // 📩 Escuchar mensajes
    socket.on("receive_message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, []);

  // 📤 Enviar mensajes
  const sendMessage = (from: string, text: string) => {
    socket.emit("send_message", { from, text });
  };

  return { messages, sendMessage };
}
