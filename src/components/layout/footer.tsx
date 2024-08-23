import { Separator } from '@/components/ui/separator';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <>
      <Separator />
      <footer className="flex flex-col sm:flex-row justify-center sm:justify-between items-center pt-8 pb-8 lg:pb-16 max-w-3xl mx-8 lg:mx-auto gap-4">
        <p>© ausath ikram</p>
        <nav>
          <ul className="flex items-center gap-8">
            <li>
              <Link
                className="flex gap-2 hover:underline underline-offset-4"
                href="https://github.com/ausathdzil"
                target="_blank"
              >
                <span>github</span>
                <ArrowUpRight />
              </Link>
            </li>
            <li>
              <Link
                className="flex gap-2 hover:underline underline-offset-4"
                href="https://linkedin.com/in/ausathdzil"
                target="_blank"
              >
                <span>linkedin</span>
                <ArrowUpRight />
              </Link>
            </li>
          </ul>
        </nav>
      </footer>
    </>
  );
}
