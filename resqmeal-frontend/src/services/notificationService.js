import API from "./api";

export const fetchNotifications = () => API.get("/notifications");

export const markNotificationRead = (id) =>
  API.put(`/notifications/${id}/read`);


export const markAllRead = () =>
  API.put("/notifications/read-all");