export type Stack = {
  id: number;
  name: string;
  tasks: Task[];
};

export type Task = {
  id: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};
