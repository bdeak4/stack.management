export type Stack = {
  id: number;
  name: string;
  tasks: Task[];
  createdAt: string;
  updatedAt: string;
  _count: {
    tasks: number;
  };
};

export type Task = {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
};
