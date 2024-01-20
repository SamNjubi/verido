export interface Institution {
  id: number;
  name: string;
  status: "active" | "suspended" | "deleted";
}
