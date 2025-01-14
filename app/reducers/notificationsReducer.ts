import { Status } from "@/types/Interfaces";

export enum NotificationType {
    PUSH = "push",
    SNACKBAR = "snackbar",
    HEADER = "header"
}

interface Notification {
    type? : NotificationType.PUSH | NotificationType.HEADER | NotificationType.SNACKBAR;
    key?: string;
    message: string;
    status?: Status;
}

interface PushNotification extends Notification {
    type: NotificationType.PUSH;
}

interface SnackbarNotification extends Notification {
    type: NotificationType.SNACKBAR;
}

export interface HeaderNotification extends Notification {
    type: NotificationType.HEADER;
    key: string;
}


export interface NotificationsState {
    notifications: Notification[];
    loading: boolean;
    error: string | null;
}

export const initialNotificationsState: NotificationsState = {
    notifications: [],
    loading: false,
    error: null
}

export enum NotificationActionType {
    ADD_PUSH_NOTIFICATION = "ADD_PUSH_NOTIFICATION",
    ADD_SNACKBAR_NOTIFICATION = "ADD_SNACKBAR_NOTIFICATION",
    ADD_HEADER_NOTIFICATION = "ADD_HEADER_NOTIFICATION",
    CLEAN_NOTIFICATIONS = "CLEAN_NOTIFICATIONS",
    FETCH_START = "FETCH_START",
    FETCH_SUCCESS = "FETCH_SUCCESS",
    FETCH_ERROR = "FETCH_ERROR",
}

export type NotificationAction = 
{
    type: NotificationActionType.FETCH_START;
} |
{
    type: NotificationActionType.FETCH_SUCCESS;
    payload: Notification[];
} |
{
    type: NotificationActionType.FETCH_ERROR;
    payload: string;
} |
{ 
    type: NotificationActionType.ADD_PUSH_NOTIFICATION; payload: PushNotification;
} | {
    type: NotificationActionType.ADD_SNACKBAR_NOTIFICATION; payload: SnackbarNotification;
} | {
    type: NotificationActionType.ADD_HEADER_NOTIFICATION; payload: HeaderNotification;
} | {
    type: NotificationActionType.CLEAN_NOTIFICATIONS;
}

export const notificationsReducer = (state: NotificationsState, action: NotificationAction): NotificationsState => {
    switch (action.type) {       
        case "FETCH_START":
            return { ...state, loading: true, error: null };
        case "FETCH_SUCCESS":
            return { ...state, notifications: action.payload, loading: false, error: null };
        case "FETCH_ERROR":
            return { ...state, loading: false, error: action.payload };
        case "ADD_PUSH_NOTIFICATION":
        case "ADD_SNACKBAR_NOTIFICATION": 
        case "ADD_HEADER_NOTIFICATION":
            return { 
                notifications: state.notifications.some(n => n.key === action.payload.key) ? state.notifications : [...state.notifications, action.payload], 
                loading: false,
                error: null
            };
        case "CLEAN_NOTIFICATIONS":
            return { notifications: [], loading: false, error: null };
        default:
            return state;
    }
}
