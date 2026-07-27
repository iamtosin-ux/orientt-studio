// Left column — the wordmark. The menu lives top-right (see page.tsx / TopMenu).
export default function SideNav() {
  return (
    <nav className="hidden lg:sticky lg:top-20 lg:flex lg:self-start">
      <a href="#top" aria-label="orientt: home" className="w-fit">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.svg" alt="orientt" className="h-6 w-auto" />
      </a>
    </nav>
  );
}
