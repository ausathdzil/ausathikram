import EmailForm from "@/components/contact/email-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Email me for any inquiries.",
};

export default function Page() {
  return (
    <section className="w-full space-y-8">
      <article className="space-y-2">
        <h1 className="text-2xl text-primary font-semibold">Contact Me</h1>
        <p>Feel free to reach out to me for any inquiries.</p>
      </article>
      <EmailForm />
    </section>
  );
}
