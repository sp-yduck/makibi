import React, { useState } from 'react';
import { Modal } from './Modal';

interface ProgressModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  currentProgress: number;
  onSave: (progress: number) => void;
}

export function ProgressModal({ isOpen, onClose, title, currentProgress, onSave }: ProgressModalProps) {
  const [progress, setProgress] = useState(currentProgress);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(progress);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Update Progress">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {title}
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={(e) => setProgress(Number(e.target.value))}
            className="w-full"
          />
          <div className="mt-2 text-center text-sm text-gray-600">
            {progress}%
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
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            Save Progress
          </button>
        </div>
      </form>
    </Modal>
  );
}