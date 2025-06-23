

import { create } from "zustand";
import {
  initSocket,
  emitReport,
  disconnectSocket,
  registerReportCallback,
} from "../services/socket/socketService";

export const useSocketStore = create((set) => ({
  socketConnected: false,
  reports: [],

  // Connect to the socket server
  connectSocket: () => {
    const token = localStorage.getItem("authToken");

    initSocket(token);
    registerReportCallback((incomingReport) => {
      set((state) => {
        const updated  = [incomingReport];
        console.log("Updated reports:", updated);
        return { reports: updated[0] };
        
      });
    });


    set({ socketConnected: true });
  },

  
  emitReportMsg: (payload) => {
    emitReport(payload);
  },

  // Disconnect socket
  disconnect: () => {
    disconnectSocket();
    set({ socketConnected: false });
  },
}));
