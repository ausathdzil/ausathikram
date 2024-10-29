import { ArrowUpRight } from 'lucide-react';
import { Link } from 'next-view-transitions';

export default function Footer() {
  return (
    <footer className="text-foreground border-t dark:border-zinc-800">
      <div className="flex justify-center sm:justify-between px-6 lg:px-0 py-8 mx-auto max-w-3xl">
        <p className="hidden sm:block">&copy; 2024 Ausath Ikram</p>
        <nav className="flex items-center gap-4 sm:gap-8">
          <Link href="/contact">Contact</Link>
          <a
            href="https://github.com/ausathdzil"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/ausathdzil"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </nav>
      </div>
    </footer>
  );
}
