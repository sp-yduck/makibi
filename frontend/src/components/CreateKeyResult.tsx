import React from 'react';
import { Trash2 } from 'lucide-react';
import type { KeyResult } from '../types/okr';

interface CreateKeyResultProps {
  keyResult: Partial<KeyResult>;
  onChange: (updates: Partial<KeyResult>) => void;
  onDelete: () => void;
  index: number;
}

export function CreateKeyResult({ keyResult, onChange, onDelete, index }: CreateKeyResultProps) {
  return (
    <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-gray-700">Key Result #{index + 1}</h4>
        <button
          onClick={onDelete}
          className="p-1 hover:bg-gray-200 rounded-full"
        >
          <Trash2 className="h-4 w-4 text-gray-500" />
        </button>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={keyResult.title || ''}
            onChange={(e) => onChange({ title: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="e.g., Increase monthly active users"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Target Value</label>
            <input
              type="number"
              value={keyResult.target || ''}
              onChange={(e) => onChange({ target: Number(e.target.value) })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Current Value</label>
            <input
              type="number"
              value={keyResult.current || ''}
              onChange={(e) => onChange({ 
                current: Number(e.target.value),
                progress: Math.min(100, Math.round((Number(e.target.value) / (keyResult.target || 1)) * 100))
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Unit</label>
          <input
            type="text"
            value={keyResult.unit || ''}
            onChange={(e) => onChange({ unit: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="e.g., users, percent, dollars"
          />
        </div>
      </div>
    </div>
  );
}