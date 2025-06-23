import { io } from "socket.io-client";


let socket = null;
let reportHandler = null;
let onReportCallback = null;

export const initSocket = (token) => {
  if (!socket) {
    socket = io("https://criminal-fonj.onrender.com/", {
      auth: { authorization: `Bearer ${token}` },
    });

    socket.on("connect", () => {
      console.log("✅ Socket Connected:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("📴 Socket Disconnected");
    });

    socket.on("connect_error", (err) => {
      console.error("⚠️ Connection Error:", err.message);
    });
  }

  if (reportHandler) {
    socket.off("report", reportHandler);
  }

  reportHandler = (data, callback) => {
    console.log("📥 Received report:", data);
    if (typeof callback === "function") {
      callback("send_report");
    }

    if (typeof onReportCallback === "function") {
      onReportCallback(data); // 👈 trigger shared callback
    }
  };

  socket.on("report", reportHandler);
};

export const registerReportCallback = (cb) => {
  onReportCallback = cb;
};


export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
    reportHandler = null;
    onReportCallback = null;
  }
};


export const emitReport = (payload) => {
  
  if (socket && socket.connected) {
    console.log("Emitting report:", payload);

    socket.emit("send_report", payload)
    console.log("EMITTED!!", socket.id, socket?.connected)
  } else {
    console.log("Socket not connected. Cannot emit report.");

  }
};



