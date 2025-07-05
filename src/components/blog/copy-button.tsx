'use client';

import { CheckIcon, CopyIcon } from 'lucide-react';
import { useState } from 'react';

import { cn } from '@/lib/utils';

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
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <button
      aria-label={copied ? 'Copied' : 'Copy to clipboard'}
      className="righ-1.5 absolute end-0 top-2.5 flex w-9 items-center justify-center rounded-md border border-transparent text-muted-foreground/80 ring-offset-background transition-shadow hover:text-primary focus-visible:border-ring focus-visible:text-primary focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed sm:top-3.5 sm:right-2"
      disabled={copied}
      onClick={handleCopy}
      type="button"
    >
      <div
        className={cn(
          'transition-all',
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
          'absolute transition-all',
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
