import { ArrowUpRight } from 'lucide-react';
import { Link } from 'next-view-transitions';

export default function Footer() {
  return (
    <footer className="text-foreground border-t dark:border-zinc-800">
      <div className="flex justify-center sm:justify-between px-6 lg:px-0 py-8 mx-auto max-w-3xl">
        <p className="hidden sm:block">&copy; 2024 Ausath Ikram</p>
        <nav className="flex items-center gap-4 sm:gap-8">
          <Link
            className="flex gap-2 hover:underline underline-offset-4"
            href="/contact"
          >
            <ArrowUpRight />
            <span>contact</span>
          </Link>
          <a
            className="flex gap-2 hover:underline underline-offset-4"
            href="https://github.com/ausathdzil"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ArrowUpRight />
            <span>github</span>
          </a>
          <a
            className="flex gap-2 hover:underline underline-offset-4"
            href="https://linkedin.com/in/ausathdzil"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ArrowUpRight />
            <span>linkedin</span>
          </a>
        </nav>
      </div>
    </footer>
  );
}
