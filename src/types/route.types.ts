import type { AuthUser } from "@/types/auth.types";

export interface RouteContext {
  user: AuthUser | null;
}