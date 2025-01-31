import { User } from "./User"

export interface Financial {
  createdAt: string,
  productType: string,
  productName: string,
  saleValue: string,
  productValue: string,
  commissioning: string,
  paidOrRefunded: boolean,
  seller: User,
  obs: string,
  clientNumber: string,
  client: User,
  createdById: string,
  createdBy: User,
  id: string,
  range?: number
}