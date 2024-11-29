import React, { useState } from 'react';
import { useTaskStore } from '../store/taskStore';
import { useOKRStore } from '../store/okrStore';
import type { Task } from '../types/task';

interface CreateTaskFormProps {
  onClose: () => void;
  objectiveId?: string;
}

export function CreateTaskForm({ onClose, objectiveId }: CreateTaskFormProps) {
  const addTask = useTaskStore((state) => state.addTask);
  const objectives = useOKRStore((state) => state.objectives);
  const [task, setTask] = useState<Partial<Task>>({
    title: '',
    description: '',
    status: 'todo',
    dueDate: '',
    objectiveId,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!task.title || !task.dueDate) return;

    const newTask: Task = {
      id: crypto.randomUUID(),
      title: task.title,
      description: task.description || '',
      status: task.status as Task['status'],
      dueDate: task.dueDate,
      objectiveId: task.objectiveId,
      keyResultId: task.keyResultId,
      createdAt: new Date().toISOString(),
    };

    addTask(newTask);
    onClose();
  };

  const selectedObjective = objectives.find((obj) => obj.id === task.objectiveId);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          value={task.title}
          onChange={(e) => setTask((prev) => ({ ...prev, title: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={task.description}
          onChange={(e) => setTask((prev) => ({ ...prev, description: e.target.value }))}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Due Date</label>
        <input
          type="date"
          value={task.dueDate}
          onChange={(e) => setTask((prev) => ({ ...prev, dueDate: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          required
        />
      </div>

      {!objectiveId && (
        <div>
          <label className="block text-sm font-medium text-gray-700">Link to Objective</label>
          <select
            value={task.objectiveId || ''}
            onChange={(e) => setTask((prev) => ({ ...prev, objectiveId: e.target.value || undefined }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            <option value="">None</option>
            {objectives.map((objective) => (
              <option key={objective.id} value={objective.id}>
                {objective.title}
              </option>
            ))}
          </select>
        </div>
      )}

      {selectedObjective && (
        <div>
          <label className="block text-sm font-medium text-gray-700">Link to Key Result</label>
          <select
            value={task.keyResultId || ''}
            onChange={(e) => setTask((prev) => ({ ...prev, keyResultId: e.target.value || undefined }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            <option value="">None</option>
            {selectedObjective.keyResults.map((kr) => (
              <option key={kr.id} value={kr.id}>
                {kr.title}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          Create Task
        </button>
      </div>
    </form>
  );
}