import { httpClient } from "../httpClient";

export interface CreateBankAccountParams {
  initialBalance: number;
  name: string;
  color: string;
  type: "CHECKING" | "INVESTMENT" | "CASH";
}

export async function create(params: CreateBankAccountParams) {
  const { data } = await httpClient.post("/bank-accounts", params);

  return data;
}
