import { client } from "@/lib/http";

const notifications = client("/notifications");

export const getNotifications = async () => {
  const res = await notifications.get("");
  return res.data;
}