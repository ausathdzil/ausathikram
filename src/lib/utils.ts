import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const url =
  process.env.NODE_ENV === 'production'
    ? 'https://ausathikram.vercel.app'
    : 'http://localhost:3000';
