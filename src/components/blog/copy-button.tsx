'use client';

import { CheckIcon, CopyIcon } from 'lucide-react';
import { useState } from 'react';

import { cn } from '@/lib/utils';

const COPIED_TIMEOUT = 1500;

export function CopyButton({
  codeElement,
}: {
  codeElement: React.ReactElement<HTMLPreElement> | undefined;
}) {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = async () => {
    if (codeElement) {
      await navigator.clipboard.writeText(String(codeElement.props.children));
      setCopied(true);
      setTimeout(() => setCopied(false), COPIED_TIMEOUT);
    }
  };

  return (
    <button
      aria-label={copied ? 'Copied' : 'Copy to clipboard'}
      className="absolute top-3 right-3 flex items-center justify-center rounded-md border border-transparent text-muted-foreground/80 ring-offset-background transition-shadow hover:text-primary focus-visible:border-ring focus-visible:text-primary focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed sm:top-4 sm:right-4"
      disabled={copied}
      onClick={handleCopy}
      type="button"
    >
      <div
        className={cn(
          'transition-transform',
          copied ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
        )}
      >
        <CheckIcon
          aria-hidden="true"
          className="size-3 stroke-green-600 sm:size-4"
          strokeWidth={2}
        />
      </div>
      <div
        className={cn(
          'absolute transition-transform',
          copied ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
        )}
      >
        <CopyIcon
          aria-hidden="true"
          className="size-3 sm:size-4"
          strokeWidth={2}
        />
      </div>
    </button>
  );
}
