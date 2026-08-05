export function Footer() {
  return (
    <footer>
      <p>
        <small>
          &copy; {new Date().getFullYear()} Ausath Ikram &lt;
          <a href="mailto:mail@ausathikram.com">mail@ausathikram.com</a>&gt;
        </small>
      </p>
      <p>
        <small>Last Update: {new Date().toISOString()}</small>
      </p>
    </footer>
  )
}
