import EmailForm from '@/components/contact/email-form';
import { Toaster } from '@/components/ui/sonner';

export const metadata = {
  title: 'contact me',
  description: 'email me for any inquiries.',
};

export default function Page() {
  return (
    <section className="w-full max-w-3xl py-12 space-y-8">
      <article className="space-y-2">
        <h1 className="text-2xl text-foreground font-bold">email me</h1>
        <p>feel free to reach out to me for any inquiries.</p>
      </article>
      <EmailForm />
      <Toaster richColors />
    </section>
  );
}
