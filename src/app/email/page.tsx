import EmailForm from '@/components/email/email-form';
import { baseUrl } from '@/lib/utils';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Email',
  description: 'Email me for any inquiries.',
  openGraph: {
    title: 'Email | Ausath Ikram',
    description: 'Email me for any inquiries.',
    url: 'https://ausathikram.com/email',
    siteName: 'Ausath Ikram',
    locale: 'en_US',
    images: [
      {
        url: `${baseUrl}/api/og?title=${encodeURIComponent(
          'Email | Ausath Ikram'
        )}`,
        width: 1200,
        height: 630,
        alt: 'Reach out to me for any inquiries.',
      },
    ],
  },
};

export default function Page() {
  return (
    <section className="w-full space-y-8">
      <article className="space-y-2">
        <h1 className="text-2xl font-semibold">Email</h1>
        <p className="text-muted-foreground">
          Feel free to reach out to me for any inquiries.
        </p>
      </article>
      <EmailForm />
    </section>
  );
}
