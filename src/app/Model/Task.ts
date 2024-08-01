import { Priority } from '@app/Model/Priority';
import { Project } from '@app/Model/Project';
import { StatusCodeProject } from '@app/Model/StatusCodeProject';
import { User } from '@app/Model/User';

export interface Task {
  taskId?: number;
  title?: string;
  description?: string;
  status?: StatusCodeProject;
  priority?: Priority;
  dueDate?: Date;
  assignedTo?: User
  project?: Project;
  createdDate?: Date;
  googleId?: string;
}
