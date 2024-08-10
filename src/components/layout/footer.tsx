import { Separator } from '@/components/ui/separator';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <>
      <Separator />
      <footer className="flex justify-between items-center pt-6 pb-16 px-80">
        <p>© ausath ikram</p>
        <nav>
          <ul className="flex items-center gap-8">
            <li>
              <Link
                className="flex gap-2 hover:underline underline-offset-4"
                href="https://github.com/ausathdzil"
              >
                <span>github</span> <ArrowUpRight />
              </Link>
            </li>
            <li>
              <Link
                className="flex gap-2 hover:underline underline-offset-4"
                href="https://linkedin.com/in/ausathdzil"
              >
                <span>linkedin</span> <ArrowUpRight />
              </Link>
            </li>
          </ul>
        </nav>
      </footer>
    </>
  );
}
