import { RoleCodeUser } from "@app/Model/RoleCodeUser";

export interface User {
    userId?:number,
    firstName?: string,
    lastName?: string;
    password?: string;
    email?: string;
    role?: RoleCodeUser;
    createdDate?:Date;
}