import React from 'react';
import { ChevronRight, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Objective } from '../types/okr';
import { cn, getProgressColor } from '../lib/utils';
import { TimeProgressBar } from './TimeProgressBar';

interface ObjectiveCardProps {
  objective: Objective;
}

export function ObjectiveCard({ objective }: ObjectiveCardProps) {
  const navigate = useNavigate();

  return (
    <div 
      className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200 cursor-pointer hover:shadow-md transition-shadow duration-200"
      onClick={() => navigate(`/objective/${objective.id}`)}
    >
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">{objective.title}</h3>
          <ChevronRight className="h-5 w-5 text-gray-400" />
        </div>
        <p className="mt-1 text-sm text-gray-500">{objective.description}</p>
        
        <div className="mt-6 space-y-4">
          <div>
            <div className="relative">
              <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                <div
                  style={{ width: `${objective.progress}%` }}
                  className={cn(
                    "shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center",
                    getProgressColor(objective.progress)
                  )}
                />
              </div>
            </div>
            <div className="mt-1 text-sm text-gray-600">
              <span>{objective.progress}% complete</span>
            </div>
          </div>

          <TimeProgressBar
            startDate={objective.startDate}
            dueDate={objective.dueDate}
          />
        </div>
      </div>
      
      <div className="px-4 py-4 sm:px-6">
        <div className="text-sm">
          <span className="font-medium text-gray-900">
            {objective.keyResults.length} Key Results
          </span>
        </div>
      </div>
    </div>
  );
}