import { Customer } from '@app/Model/Customer';
import { StatusCodeProject } from '@app/Model/StatusCodeProject';
import { User } from '@app/Model/User';

export interface Project {
  projectId: number;
  name?: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  status?: StatusCodeProject;
  customer?: Customer;
  createdDate?: Date;
  isActive?:boolean;
  authorize?:number
}