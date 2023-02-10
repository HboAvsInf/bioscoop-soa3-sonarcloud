import * as fs from "fs";
import { Order } from "../order";
import { IExportBehaviour } from "./IExportBehaviour";

export class ExportToText implements IExportBehaviour {
    
    exportOrder(order: Order): void {
        fs.writeFile(
            `resources/text/order-${order.getOrderNr()}.txt`,
            order.toString(),
            function (err) {
              if (err) {
                return console.error(err);
              }
            }
          );
    }
    
}