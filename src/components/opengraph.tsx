export default function Opengraph({ title }: { title: string }) {
  return (
    <div
      style={{
        fontSize: 64,
        background: 'white',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        padding: '6rem 4rem',
      }}
    >
      {title}
    </div>
  );
}
