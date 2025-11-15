import { client } from "@/lib/http";

const notifications = client("/notifications");

export const getNotifications = async () => {
  const res = await notifications.get("");
  return res.data;
}

export const maskAsRead = async (ids: string[]) => {
  const res = await notifications.post("/read", ids);
  return res.data
}