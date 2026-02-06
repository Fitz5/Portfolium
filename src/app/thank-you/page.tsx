import Link from "next/link";

export default function ThankYou() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-bg px-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-text-heading">Thank You!</h1>
        <p className="mt-4 text-lg text-text-body">
          Your payment was successful. I&apos;ll be in touch shortly to kick off
          your project.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-lg bg-accent px-8 py-3 font-semibold text-white transition-transform hover:scale-105"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
