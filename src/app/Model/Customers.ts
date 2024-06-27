export interface Customer {
    customerId: number,
    firstName: string,
    lastName: string;
    phone: string,
    email: string,
    businessName: string,
    source: string,
    status: string,
    createdDate: Date,
    // projects: Project[],
}
