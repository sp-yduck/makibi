import React from 'react';
import { CheckCircle2, Circle, Clock, Timer } from 'lucide-react';
import type { Task } from '../types/task';
import { useTaskStore } from '../store/taskStore';

interface TaskListProps {
  objectiveId?: string;
}

export function TaskList({ objectiveId }: TaskListProps) {
  const tasks = useTaskStore((state) => 
    objectiveId ? state.getTasksByObjective(objectiveId) : state.tasks
  );

  const getStatusIcon = (status: Task['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'in-progress':
        return <Timer className="h-5 w-5 text-yellow-500" />;
      default:
        return <Circle className="h-5 w-5 text-gray-400" />;
    }
  };

  if (tasks.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No tasks found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="flex items-start space-x-4 bg-white p-4 rounded-lg shadow-sm"
        >
          {getStatusIcon(task.status)}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-900">{task.title}</h3>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                <span>{new Date(task.dueDate).toLocaleDateString()}</span>
              </div>
            </div>
            <p className="mt-1 text-sm text-gray-500">{task.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}