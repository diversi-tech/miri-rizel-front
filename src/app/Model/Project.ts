import { User } from './User';

export interface Project {
  projectId: number;
  name: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  status?: string;
  // customerId?: Customer;
  //   customer_id: number;
  createdDate?: Date;
}