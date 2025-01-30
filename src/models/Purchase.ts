import { InventoryItem } from "./Inventory";

export interface Purchase {
  id: string;
  createdAt: string | null;
  inventory: InventoryItem;
}