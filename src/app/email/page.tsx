import EmailForm from '@/components/email/email-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Email',
  description: 'Email me for any inquiries.',
  openGraph: {
    title: 'Email | Ausath Ikram',
    description: 'Email me for any inquiries.',
    url: 'https://ausathikram.vercel.app/email',
    siteName: 'Ausath Ikram',
    locale: 'en_US',
  },
};

export default function Page() {
  return (
    <section className="w-full space-y-8">
      <article className="space-y-2">
        <h1 className="text-2xl text-primary font-semibold">Email</h1>
        <p>Feel free to reach out to me for any inquiries.</p>
      </article>
      <EmailForm />
    </section>
  );
}
