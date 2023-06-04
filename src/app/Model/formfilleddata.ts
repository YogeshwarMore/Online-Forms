import { user } from "../Model/User";
import { details } from "../Model/filledfield";


export interface data {
    user: user;
    filldate: string;
    details: details[]
}