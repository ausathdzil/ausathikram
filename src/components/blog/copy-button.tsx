'use client';

import { CheckIcon, CopyIcon } from 'lucide-react';
import { type ReactElement, useState } from 'react';

import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

const COPIED_TIMEOUT = 1500;

export function CopyButton({
  codeElement,
}: {
  codeElement: ReactElement<HTMLPreElement> | undefined;
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
    <Button
      aria-label={copied ? 'Copied' : 'Copy to clipboard'}
      className="absolute top-2 right-2"
      onClick={handleCopy}
      size="icon-sm"
      type="button"
      variant="outline"
    >
      <div
        className={cn(
          'transition-transform',
          copied ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
        )}
      >
        <CheckIcon
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
        <CopyIcon className="size-3 sm:size-4" strokeWidth={2} />
      </div>
    </Button>
  );
}
