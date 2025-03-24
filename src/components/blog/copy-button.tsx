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
      className="hidden absolute top-4 right-2 end-0 sm:flex w-9 items-center justify-center rounded-e-lg border border-transparent text-muted-foreground/80 ring-offset-background transition-shadow hover:text-primary focus-visible:border-ring focus-visible:text-primary focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed"
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
          className="stroke-emerald-500"
          size={16}
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
        <CopyIcon size={16} strokeWidth={2} aria-hidden="true" />
      </div>
    </button>
  );
}
