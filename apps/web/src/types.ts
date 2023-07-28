export type Stack = {
  id: number;
  name: string;
  tasks: Task[];
  _count: {
    tasks: number;
  };
};

export type Task = {
  id: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};
