import { User } from "./User";

export interface InventoryItem {
  id: string,
  soldAt?: Date,
  game: string,
  email: string,
  recoverEmail?: string,
  emailPassword: string,
  recoverPhone?: string,
  psnUser: string,
  psnPassword: string,
  gameVersion: "PS4 E PS5" | "PS4" | "PS5",
  accountType: "Primaria" | "Secundaria",
  gameValue: number,
  purchaseValue: number,
  accountValue: number,
  sold: boolean,
  client?: User,
  soldBy?: string
}