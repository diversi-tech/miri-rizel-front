export interface Task {
    taskId: number,
    title: string,
    description: string,
    status: string,
    priority: string,
    dueDate: Date,
    assignedTo: number,
    projectId: number,
    createdDate: Date
}