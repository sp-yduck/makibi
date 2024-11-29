import React, { useState } from 'react';
import { Modal } from './Modal';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  initialValue: string;
  onSave: (value: string) => void;
  type?: 'input' | 'textarea';
}

export function EditModal({ 
  isOpen, 
  onClose, 
  title, 
  initialValue, 
  onSave,
  type = 'input' 
}: EditModalProps) {
  const [value, setValue] = useState(initialValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(value);
    onClose();
  };

  const Component = type === 'textarea' ? 'textarea' : 'input';

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Component
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            rows={type === 'textarea' ? 3 : undefined}
          />
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
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
          >
            Save Changes
          </button>
        </div>
      </form>
    </Modal>
  );
}