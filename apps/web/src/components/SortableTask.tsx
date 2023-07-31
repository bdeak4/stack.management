import { Task } from '../types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

type Props = {
  task: Task;
  handleDeleteTask: (id: number) => void;
};

export const SortableTask: React.FC<Props> = ({ task, handleDeleteTask }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li ref={setNodeRef} style={style}>
      <div className="content">{task.content}</div>
      <div className="stack-buttons">
        <button type="button" className="move" {...attributes} {...listeners}>
          mv
        </button>
        <button type="button" onClick={() => handleDeleteTask(task.id)}>
          rm
        </button>
      </div>
    </li>
  );
};
