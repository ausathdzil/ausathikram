export default function PlaygroundLayout({
  children,
}: LayoutProps<'/playground'>) {
  return (
    <article className="prose prose-neutral dark:prose-invert">
      {children}
    </article>
  );
}
