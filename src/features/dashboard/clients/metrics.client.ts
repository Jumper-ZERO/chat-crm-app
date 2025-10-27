import { client } from "@/lib/http";

const metrics = client('/metrics')

export interface KPIValue {
  value: number;
  porcentLastMonth: string; // Ej: "+0.00%" o "-100.00%"
}

export interface SentimentKPIs {
  pos: KPIValue;
  neg: KPIValue;
  neu: KPIValue;
}

export interface DashboardKPIs {
  activeChats: KPIValue;
  messagesToday: KPIValue;
  agentsActive: KPIValue;
  sentimentToday: SentimentKPIs;
}

export const getKpis = metrics.get<DashboardKPIs>("/kpis").then(res => res.data)