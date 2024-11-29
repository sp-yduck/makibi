import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useOKRStore } from '../store/okrStore';
import { CreateKeyResult } from './CreateKeyResult';
import type { Objective, KeyResult } from '../types/okr';
import { calculateProgress } from '../lib/utils';

interface CreateObjectiveFormProps {
  onClose: () => void;
}

export function CreateObjectiveForm({ onClose }: CreateObjectiveFormProps) {
  const addObjective = useOKRStore((state) => state.addObjective);
  const [objective, setObjective] = useState<Partial<Objective>>({
    title: '',
    description: '',
    startDate: '',
    dueDate: '',
    keyResults: [],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!objective.title || !objective.startDate || !objective.dueDate || objective.keyResults?.length === 0) {
      return;
    }

    const newObjective: Objective = {
      id: crypto.randomUUID(),
      title: objective.title,
      description: objective.description || '',
      startDate: objective.startDate,
      dueDate: objective.dueDate,
      keyResults: objective.keyResults.map(kr => ({
        ...kr,
        startDate: objective.startDate,
        dueDate: objective.dueDate
      })) as KeyResult[],
      progress: calculateProgress(objective.keyResults as KeyResult[]),
    };

    addObjective(newObjective);
    onClose();
  };

  const addKeyResult = () => {
    setObjective((prev) => ({
      ...prev,
      keyResults: [
        ...(prev.keyResults || []),
        {
          id: crypto.randomUUID(),
          title: '',
          target: 0,
          current: 0,
          progress: 0,
          unit: '',
          startDate: prev.startDate || '',
          dueDate: prev.dueDate || ''
        },
      ],
    }));
  };

  const updateKeyResult = (index: number, updates: Partial<KeyResult>) => {
    setObjective((prev) => ({
      ...prev,
      keyResults: prev.keyResults?.map((kr, i) =>
        i === index ? { ...kr, ...updates } : kr
      ),
    }));
  };

  const deleteKeyResult = (index: number) => {
    setObjective((prev) => ({
      ...prev,
      keyResults: prev.keyResults?.filter((_, i) => i !== index),
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={objective.title}
            onChange={(e) => setObjective((prev) => ({ ...prev, title: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="e.g., Increase Market Share"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={objective.description}
            onChange={(e) => setObjective((prev) => ({ ...prev, description: e.target.value }))}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="Describe your objective..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Start Date</label>
            <input
              type="date"
              value={objective.startDate}
              onChange={(e) => setObjective((prev) => ({ ...prev, startDate: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Due Date</label>
            <input
              type="date"
              value={objective.dueDate}
              onChange={(e) => setObjective((prev) => ({ ...prev, dueDate: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              required
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Key Results</h3>
          <button
            type="button"
            onClick={addKeyResult}
            className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-blue-100 hover:bg-blue-200"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Key Result
          </button>
        </div>

        <div className="space-y-4">
          {objective.keyResults?.map((kr, index) => (
            <CreateKeyResult
              key={kr.id}
              keyResult={kr}
              onChange={(updates) => updateKeyResult(index, updates)}
              onDelete={() => deleteKeyResult(index)}
              index={index}
            />
          ))}
        </div>
      </div>

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
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Create Objective
        </button>
      </div>
    </form>
  );
}