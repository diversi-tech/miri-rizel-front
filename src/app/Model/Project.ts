import { Customer } from './Customer';
import { Customer2 } from './Customer2';
import { User } from './User';

export interface Project {
  projectId: number;
  name: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  status?: string;
  customer_id: Customer2;
  createdDate?: Date;
}