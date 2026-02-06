export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-bg px-6 py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-sm text-text-body">
          &copy; {new Date().getFullYear()} Portfolium. All rights reserved.
        </p>
        <a
          href="mailto:david.fitzgerald.uav@gmail.com"
          className="text-sm text-text-body transition-colors hover:text-accent"
        >
          david.fitzgerald.uav@gmail.com
        </a>
      </div>
    </footer>
  );
}
