import { User } from "./User";

export interface Task {
    taskId: number,
    title: string,
    description: string,
    status: string,
    priority: string,
    dueDate: Date,
    assignedTo: User,
    projectId: number,
    createdDate: Date
}