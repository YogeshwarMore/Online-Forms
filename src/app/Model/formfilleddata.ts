import { user } from "./User";
import { details } from "./filledfield";

export interface data {
    user: user;
    filldate: string;
    details: details[]
}