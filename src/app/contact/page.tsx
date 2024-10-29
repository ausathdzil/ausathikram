import EmailForm from '@/components/contact/email-form';

export const metadata = {
  title: 'Contact Me',
  description: 'Email me for any inquiries.',
};

export default function Page() {
  return (
    <section className="w-full max-w-3xl py-12 space-y-8">
      <article className="space-y-2">
        <h1 className="text-2xl text-foreground font-semibold">Contact Me</h1>
        <p>Feel free to reach out to me for any inquiries.</p>
      </article>
      <EmailForm />
    </section>
  );
}
