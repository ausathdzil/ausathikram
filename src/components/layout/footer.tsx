import { Link } from 'next-view-transitions';

export default function Footer() {
  return (
    <footer className="text-foreground border-t dark:border-zinc-800">
      <div className="flex justify-between sm:justify-between p-8 lg:px-0 mx-auto max-w-3xl">
        <p className="hidden sm:block">&copy; 2024 Ausath Ikram</p>
        <nav className="grow flex justify-between sm:justify-end items-center gap-8 text-right">
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
