import { MailIcon, MapPinIcon } from 'lucide-react';

export default function Home() {
  return (
    <>
      <section className="py-12 space-y-12">
        <article className="space-y-4">
          <h1 className="text-3xl text-foreground font-bold">ausath ikram</h1>
          <p className="text-lg">
            hi 👋 my name is ausath abdi dzil ikram. i&apos;m an undergraduate
            computer science student majoring in information systems.
          </p>
          <p className="text-lg">
            i&apos;m interested in web development and are currently learning to
            build websites mainly with the react ecosystem. i frequently use
            next.js as my go to react framework. when working with a database
            for my projects, i usually go for serverless so i can focus on
            building the app.
          </p>
          <p className="text-lg">
            while not really focusing on the back-end, i&apos;ve experienced
            building simple back-end services with node.js.
          </p>
          <p className="text-lg">
            outside programming, i&apos;ve also experienced designing mobile and
            web apps with figma. as of doing things on my free time, i enjoy
            listening to music, watching movies, and playing games.
          </p>
        </article>
      </section>
      <section className="pb-12 space-y-4">
        <p className="flex text-muted-foreground gap-2">
          <MailIcon />
          <span>ausathdzil@gmail.com</span>
        </p>
        <p className="flex text-muted-foreground gap-2">
          <MapPinIcon />
          <span>jakarta, indonesia</span>
        </p>
      </section>
    </>
  );
}
