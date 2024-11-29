import React from 'react';
import { calculateTimeProgress } from '../lib/utils';

interface TimeProgressBarProps {
  startDate: string;
  dueDate: string;
}

export function TimeProgressBar({ startDate, dueDate }: TimeProgressBarProps) {
  const timeProgress = calculateTimeProgress(startDate, dueDate);
  
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs text-gray-500">
        <span>{new Date(startDate).toLocaleDateString()}</span>
        <span>{timeProgress}% time elapsed</span>
        <span>{new Date(dueDate).toLocaleDateString()}</span>
      </div>
      <div className="relative h-1.5 bg-gray-200 rounded">
        <div
          className="absolute top-0 left-0 h-full bg-blue-500 rounded"
          style={{ width: `${timeProgress}%` }}
        />
      </div>
    </div>
  );
}