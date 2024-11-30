import React, { useState } from 'react';
import { Plus, Target, CheckSquare, MessageCircle } from 'lucide-react';
import { Objective } from '../types/okr';
import { ObjectiveCard } from '../components/ObjectiveCard';
import { Modal } from '../components/Modal';
import { CreateObjectiveForm } from '../components/CreateObjectiveForm';
import { TaskList } from '../components/TaskList';
import { CreateTaskForm } from '../components/CreateTaskForm';
import { AIChat } from '../components/AIChat';

export function DashboardPage() {
  // const objectives = useOKRStore((state) => state.objectives);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'objectives' | 'tasks' | 'ai'>('objectives');

  const objectives: Objective[] = [
    {
      id: '1',
      title: 'Increase Market Share',
      description: 'Expand market reach and grow customer base',
      startDate: '2024-04-01',
      dueDate: '2024-06-30',
      progress: 45,
      keyResults: [
        {
          id: 'kr1-1',
          title: 'Acquire new enterprise customers',
          target: 50,
          current: 20,
          progress: 40,
          unit: 'customers',
          startDate: '2024-04-01',
          dueDate: '2024-06-30'
        },
        {
          id: 'kr1-2',
          title: 'Increase revenue from existing customers',
          target: 1000000,
          current: 500000,
          progress: 50,
          unit: 'dollars',
          startDate: '2024-04-01',
          dueDate: '2024-06-30'
        }
      ]
    },
    {
      id: '2',
      title: 'Improve Customer Satisfaction',
      description: 'Enhance overall customer experience and reduce churn rate',
      startDate: '2024-01-01',
      dueDate: '2024-12-31',
      progress: 75,
      keyResults: [
        {
          id: 'kr2-1',
          title: 'Increase NPS score',
          target: 85,
          current: 65,
          progress: 76,
          unit: 'points',
          startDate: '2024-01-01',
          dueDate: '2024-12-31'
        },
        {
          id: 'kr2-2',
          title: 'Reduce customer support response time',
          target: 2,
          current: 1.4,
          progress: 70,
          unit: 'hours',
          startDate: '2024-01-01',
          dueDate: '2024-12-31'
        }
      ]
    }
  ]

  const renderContent = () => {
    switch (activeTab) {
      case 'objectives':
        return objectives.length === 0 ? (
          <div className="text-center py-12">
            <Target className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No objectives</h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by creating a new objective.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {objectives.map((objective) => (
              <ObjectiveCard key={objective.id} objective={objective} />
            ))}
          </div>
        );
      case 'tasks':
        return (
          <div className="bg-white shadow rounded-lg p-6">
            <TaskList />
          </div>
        );
      case 'ai':
        return <AIChat />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveTab('objectives')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              activeTab === 'objectives'
                ? 'bg-primary-100 text-primary-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Target className="h-5 w-5 inline mr-2" />
            Objectives
          </button>
          <button
            onClick={() => setActiveTab('tasks')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              activeTab === 'tasks'
                ? 'bg-primary-100 text-primary-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <CheckSquare className="h-5 w-5 inline mr-2" />
            Tasks
          </button>
          <button
            onClick={() => setActiveTab('ai')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              activeTab === 'ai'
                ? 'bg-primary-100 text-primary-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <MessageCircle className="h-5 w-5 inline mr-2" />
            AI Assistant
          </button>
        </div>
        {activeTab !== 'ai' && (
          <button
            onClick={() => activeTab === 'objectives' ? setIsCreateModalOpen(true) : setIsCreateTaskModalOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            New {activeTab === 'objectives' ? 'Objective' : 'Task'}
          </button>
        )}
      </div>

      {renderContent()}

      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New Objective"
      >
        <CreateObjectiveForm onClose={() => setIsCreateModalOpen(false)} />
      </Modal>

      <Modal
        isOpen={isCreateTaskModalOpen}
        onClose={() => setIsCreateTaskModalOpen(false)}
        title="Create New Task"
      >
        <CreateTaskForm onClose={() => setIsCreateTaskModalOpen(false)} />
      </Modal>
    </div>
  );
}