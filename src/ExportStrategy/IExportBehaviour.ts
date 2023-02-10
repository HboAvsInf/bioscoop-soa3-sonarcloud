import { Order } from "../order";

export interface IExportBehaviour {
  exportOrder(order: Order): void;
}
