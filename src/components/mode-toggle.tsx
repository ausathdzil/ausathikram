'use client';

import { MonitorIcon, MoonIcon, SunIcon } from 'lucide-react';

import { useTheme } from 'next-themes';

import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            aria-label="Toggle theme"
            size="icon-sm"
            title="Toggle theme"
            type="button"
            variant="ghost"
          />
        }
      >
        <SunIcon className="dark:-rotate-90 rotate-0 scale-100 dark:scale-0" />
        <MoonIcon className="absolute rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          className="hover:cursor-pointer"
          onClick={() => setTheme('light')}
        >
          <SunIcon />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          className="hover:cursor-pointer"
          onClick={() => setTheme('dark')}
        >
          <MoonIcon />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          className="hover:cursor-pointer"
          onClick={() => setTheme('system')}
        >
          <MonitorIcon />
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
