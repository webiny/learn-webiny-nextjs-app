import Link from "next/link";

export const Header = () => {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-[1100px] px-4 h-16 flex items-center justify-between gap-8">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-bold text-gray-900 shrink-0"
        >
          <span className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white text-sm font-bold">
            A
          </span>
          Acme Inc
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            href="/"
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/articles"
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            Articles
          </Link>
        </nav>
      </div>
    </header>
  );
};
