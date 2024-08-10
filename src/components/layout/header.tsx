import { ModeToggle } from '@/components/layout/mode-toggle';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

export default function Header() {
  return (
    <>
      <header className="pt-16 pb-4 px-80">
        <nav className="flex justify-between items-center">
          <Link
            className="hover:underline underline-offset-4"
            href="/"
          >
            home
          </Link>
          <ul className="flex items-center gap-8">
            <li>
              <Link
                className="hover:underline underline-offset-4"
                href="/projects"
              >
                projects
              </Link>
            </li>
            <li>
              <Link
                className="hover:underline underline-offset-4"
                href="/contact"
              >
                contact
              </Link>
            </li>
            <li>
              <ModeToggle />
            </li>
          </ul>
        </nav>
      </header>
      <Separator />
    </>
  );
}
