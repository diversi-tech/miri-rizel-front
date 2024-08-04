import { StatusCodeUser } from "@app/Model/StatusCodeUser";

export interface Customer {
    customerId: number,
    firstName?: string,
    lastName?: string;
    phone?: string,
    email?: string,
    businessName?: string,
    source?: string,
    status: StatusCodeUser,
    createdDate?: Date,
}
