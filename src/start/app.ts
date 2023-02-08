import { Movie } from "../movie";
import { MovieScreening } from "../movieScreening";
import { MovieTicket } from "../movieTicket";
import { Order } from "../order";
import { TicketExportFormat } from "../ticketExportFormat";

const order = new Order(1, true);
let movie = new Movie("Leuke film");
let movieScreening = new MovieScreening(new Date("2/4/2023 12:00"), 2, movie);
movie.addScreening(movieScreening);
let ticket = new MovieTicket(movieScreening, true, 2, 15);
let ticket2 = new MovieTicket(movieScreening, true, 2, 17);
let ticket3 = new MovieTicket(movieScreening, false, 2, 19);
let ticket4 = new MovieTicket(movieScreening, true, 2, 19);
let ticket5 = new MovieTicket(movieScreening, false, 2, 19);
let ticket6 = new MovieTicket(movieScreening, false, 2, 19);
order.addSeatReservation(ticket);
order.addSeatReservation(ticket2);
order.addSeatReservation(ticket3);
order.addSeatReservation(ticket4);
order.addSeatReservation(ticket5);
order.addSeatReservation(ticket6);

console.log("Orderprice is: " + order.calculatePrice());

const format = TicketExportFormat.JSON;
order.export(format);
