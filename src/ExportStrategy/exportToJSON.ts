import * as fs from "fs";
import { Order } from "../order";
import { IExportBehaviour } from "./IExportBehaviour";

export class ExportToJSON implements IExportBehaviour {

    exportOrder(order: Order): void {
        const content = JSON.stringify(order, null, 2);
        fs.writeFile(
            `resources/json/order-${order.getOrderNr()}.json`,
            content,
            (err) => {
                if (err) {
                    return console.error(err);
                }
            }
        );
    }
}
