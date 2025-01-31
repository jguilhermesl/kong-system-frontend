import { Store } from "./Store";
import { User } from "./User";

export interface PendingTask {
  id: string;
  userId: string,
  user: User,
  type: "point-usage",
  price: number,
  gameId?: string,
  game?: Store,
  createdAt?: string
}