import { Frown } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="max-w-2xl py-44 flex flex-col justify-center items-center text-center space-y-4">
      <Frown className="text-foreground" size={64} />
      <h1 className="text-5xl text-foreground">404 Not Found</h1>
    </div>
  );
}
