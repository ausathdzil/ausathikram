'use client';

import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const { back } = useRouter();
  return (
    <div className="flex-1 flex flex-col justify-center items-center text-center space-y-8">
      <h1 className="text-4xl text-primary">404 Not Found</h1>
      <Button onClick={() => back()}>
        <ArrowLeft size={16} />
        <span>Go back</span>
      </Button>
    </div>
  );
}
