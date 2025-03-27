'use client';

import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();

  return (
    <footer className="text-sm md:text-base w-full border-t flex justify-start items-center gap-4 sm:gap-8 text-right py-8">
      <a
        href="https://github.com/ausathdzil"
        rel="noopener noreferrer"
        target="_blank"
      >
        GitHub
      </a>
      <a
        href="https://linkedin.com/in/ausathdzil"
        rel="noopener noreferrer"
        target="_blank"
      >
        LinkedIn
      </a>
      <a href="mailto:mail@ausathikram.com">Email</a>
      {pathname !== '/' && (
        <a href="/rss" target="_blank">
          RSS
        </a>
      )}
    </footer>
  );
}
