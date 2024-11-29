import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { KeyResult } from '../types/okr';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateProgress(keyResults: KeyResult[]): number {
  if (keyResults.length === 0) return 0;
  const totalProgress = keyResults.reduce((acc, kr) => acc + kr.progress, 0);
  return Math.round(totalProgress / keyResults.length);
}

export function calculateTimeProgress(startDate: string, dueDate: string): number {
  const start = new Date(startDate).getTime();
  const end = new Date(dueDate).getTime();
  const now = Date.now();
  
  if (now <= start) return 0;
  if (now >= end) return 100;
  
  const totalDuration = end - start;
  const elapsed = now - start;
  return Math.round((elapsed / totalDuration) * 100);
}

export function getProgressColor(progress: number): string {
  return progress < 50 ? "bg-red-500" :
         progress < 80 ? "bg-yellow-500" : "bg-green-500";
}