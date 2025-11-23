'use client';

import { CheckIcon, CopyIcon } from 'lucide-react';
import { useState } from 'react';

import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

const COPIED_TIMEOUT = 1500;

export function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = async () => {
    if (code) {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), COPIED_TIMEOUT);
    }
  };

  return (
    <Button
      aria-label={copied ? 'Copied' : 'Copy to clipboard'}
      className="absolute top-2 right-2 active:scale-[0.97]"
      onClick={copied ? undefined : handleCopy}
      size="icon-sm"
      title={copied ? 'Copied' : 'Copy to clipboard'}
      type="button"
      variant="outline"
    >
      <div
        className={cn(
          'transition-transform',
          copied ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
        )}
      >
        <CheckIcon className="stroke-green-500" />
      </div>
      <div
        className={cn(
          'absolute transition-transform',
          copied ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
        )}
      >
        <CopyIcon />
      </div>
    </Button>
  );
}
