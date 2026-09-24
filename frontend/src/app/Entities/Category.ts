export interface Category {
  id: string;
  name: string;
  icon: string;
  initialBalance: number;
  type: "INCOME" | "EXPENSE";
}
