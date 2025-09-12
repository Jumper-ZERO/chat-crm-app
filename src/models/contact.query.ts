export interface ContactQuery {
  page: number;
  perPage: number;
  name?: string;
  status?: string;
  assignedTo?: string;
}