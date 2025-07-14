import { create } from "zustand";
import {
  initSocket,
  emitReport,
  disconnectSocket,
  registerReportCallback,
  successReport,  // ✅ Import successReport listener
} from "../services/socket/socketService";

export const useSocketStore = create((set) => ({
  socketConnected: false,
  reports: [],
  isSending: false,
  lastSuccessResponse: null,  // ✅ New state to hold success_response data
  
  // Connect to the socket server
  connectSocket: () => {
    const token = localStorage.getItem("authToken");

    initSocket(token);

    registerReportCallback((incomingReport) => {
      set((state) => {
        const updated = [incomingReport];
        console.log("Updated reports:", updated);
        return { reports: updated[0] };
      });
    });

    // ✅ Setup listener for success_response when socket connects
    successReport((successData) => {
      console.log("🎉 success_response received in store:", successData);
      set({ lastSuccessResponse: successData, isSending: false });
    });

    set({ socketConnected: true });
  },

  emitReportMsg: (payload) => {
    set({ isSending: true });

    emitReport(payload, (ack) => {
      if (ack === "send_report") {
        console.log("✅ Server acknowledged report");
      } else {
        console.warn("⚠️ Unexpected ACK:", ack);
      }
      // ✅ Optionally: handle optimistic updates here if needed
    });
  },

  // Disconnect socket
  disconnect: () => {
    disconnectSocket();
    set({ socketConnected: false });
  },
}));
