'use client';

import { cn } from '@/lib/utils';
import { CheckIcon, CopyIcon } from 'lucide-react';
import { useState } from 'react';

export default function CopyButton({
  codeElement,
}: {
  codeElement: React.ReactElement<HTMLPreElement> | undefined;
}) {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = async () => {
    if (codeElement) {
      await navigator.clipboard.writeText(String(codeElement.props.children));
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="absolute top-2.5 sm:top-3.5 righ-1.5 sm:right-2 end-0 flex w-9 items-center justify-center rounded-md border border-transparent text-muted-foreground/80 ring-offset-background transition-shadow hover:text-primary focus-visible:border-ring focus-visible:text-primary focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed"
      aria-label={copied ? 'Copied' : 'Copy to clipboard'}
      disabled={copied}
    >
      <div
        className={cn(
          'transition-all',
          copied ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
        )}
      >
        <CheckIcon
          className="stroke-green-600 size-3 sm:size-4"
          strokeWidth={2}
          aria-hidden="true"
        />
      </div>
      <div
        className={cn(
          'absolute transition-all',
          copied ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
        )}
      >
        <CopyIcon
          className="size-3 sm:size-4"
          strokeWidth={2}
          aria-hidden="true"
        />
      </div>
    </button>
  );
}
