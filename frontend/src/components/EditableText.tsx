import React, { useState, useEffect, useRef } from 'react';

interface EditableTextProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  as?: 'input' | 'textarea';
}

export function EditableText({ value, onChange, className = '', as = 'input' }: EditableTextProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleBlur = () => {
    setIsEditing(false);
    if (editValue !== value) {
      onChange(editValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleBlur();
    }
    if (e.key === 'Escape') {
      setEditValue(value);
      setIsEditing(false);
    }
  };

  if (!isEditing) {
    return (
      <div
        onClick={() => setIsEditing(true)}
        className={`cursor-pointer hover:bg-gray-50 rounded px-2 py-1 -mx-2 ${className}`}
      >
        {value}
      </div>
    );
  }

  const Component = as === 'textarea' ? 'textarea' : 'input';
  
  return (
    <Component
      ref={inputRef as any}
      value={editValue}
      onChange={(e) => setEditValue(e.target.value)}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      className={`w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${className}`}
      rows={as === 'textarea' ? 3 : undefined}
    />
  );
}