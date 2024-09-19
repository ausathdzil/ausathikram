import { MailIcon, MapPinIcon } from 'lucide-react';

export default function Home() {
  return (
    <section className="max-w-3xl py-12 space-y-8">
      <article className="space-y-4 text-lg">
        <h1 className="text-3xl text-foreground font-bold">ausath ikram</h1>
        <p>
          hi 👋 my name is ausath abdi dzil ikram. i&apos;m an undergraduate
          computer science student majoring in information systems. i&apos;m
          interested in web development and are currently learning to build
          websites mainly with the react ecosystem. i frequently use next.js as
          my go to react framework.
        </p>
      </article>
      <div className="space-y-4">
        <div className="flex text-muted-foreground gap-2">
          <MailIcon />
          <p>ausathdzil@gmail.com</p>
        </div>
        <div className="flex text-muted-foreground gap-2">
          <MapPinIcon />
          <p>jakarta, indonesia</p>
        </div>
      </div>
    </section>
  );
}
