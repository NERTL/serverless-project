/**
 * Fields in a request to create a single TODO item.
 */
export interface CreateTodoRequest {
  todoId: string
  name: string
  createdAt: string
  done: string
  attachmentUrl: string
  dueDate: string
}
