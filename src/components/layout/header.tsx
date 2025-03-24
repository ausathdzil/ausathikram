import { ModeToggle } from '@/components/layout/mode-toggle';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="w-full">
      <nav className="flex justify-between items-center py-8">
        <Link href="/">About</Link>
        <div className="flex items-center gap-4 sm:gap-8">
          <Link href="/projects">Projects</Link>
          <Link href="/blog">Blog</Link>
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
}
