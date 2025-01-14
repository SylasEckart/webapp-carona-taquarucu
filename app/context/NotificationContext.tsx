import React, { useReducer, useMemo } from "react";
import {
  notificationsReducer,
  initialNotificationsState,
  NotificationAction,
  NotificationsState,
} from "../reducers/notificationsReducer";
import { useNotificationSocket } from "@/hooks/useNotificationSocket";

// Cria o contexto manualmente
const NotificationContext = React.createContext<{
  state: NotificationsState;
  dispatch: React.Dispatch<NotificationAction>;
} | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode; userId: string }> = ({
  children,
  userId,
}) => {
  const [state, dispatch] = useReducer(notificationsReducer, initialNotificationsState);

  useNotificationSocket(userId, dispatch);

  const contextValue = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state, dispatch]
  );

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
};

// Hook para consumir o contexto
export const useNotificationContext = () => {
  const context = React.useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotificationContext must be used within a NotificationProvider");
  }
  return context;
};
