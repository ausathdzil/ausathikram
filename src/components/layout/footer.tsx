import { Separator } from '@/components/ui/separator';
import { ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <>
      <Separator />
      <footer className="flex justify-center sm:justify-between max-w-3xl px-0 sm:px-6 lg:px-0 py-8 lg:pb-16 mx-8 md:mx-auto">
        <p className="hidden sm:block">ausath ikram</p>
        <nav>
          <ul className="flex items-center gap-8">
            <li>
              <a
                className="flex gap-2 hover:underline underline-offset-4"
                href="https://github.com/ausathdzil"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ArrowUpRight />
                <span>github</span>
              </a>
            </li>
            <li>
              <a
                className="flex gap-2 hover:underline underline-offset-4"
                href="https://linkedin.com/in/ausathdzil"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ArrowUpRight />
                <span>linkedin</span>
              </a>
            </li>
          </ul>
        </nav>
      </footer>
    </>
  );
}
