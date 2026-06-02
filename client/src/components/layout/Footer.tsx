import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative mt-20 overflow-hidden bg-ink text-surface">
      <div
        className="pointer-events-none absolute left-0 top-0 h-64 w-64"
        style={{
          background:
            "radial-gradient(circle, rgba(198, 244, 50, 0.12), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 py-16">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="max-w-xs">
            <span className="text-lg font-bold tracking-tight">
              SportSpotter
            </span>
            <p className="mt-3 text-sm text-surface/60">
              Find players, book venues, and play more sport in your city.
            </p>
          </div>

          <div className="flex gap-16">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-surface/40">
                Explore
              </h3>
              <ul className="mt-4 space-y-3 text-sm">
                <li>
                  <Link
                    to="/matches"
                    className="text-surface/70 transition-colors hover:text-lime"
                  >
                    Matches
                  </Link>
                </li>
                <li>
                  <Link
                    to="/matches/create"
                    className="text-surface/70 transition-colors hover:text-lime"
                  >
                    Create a match
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-surface/40">
                Account
              </h3>
              <ul className="mt-4 space-y-3 text-sm">
                <li>
                  <Link
                    to="/login"
                    className="text-surface/70 transition-colors hover:text-lime"
                  >
                    Log in
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="text-surface/70 transition-colors hover:text-lime"
                  >
                    Get started
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-surface/40">
                More
              </h3>
              <ul className="mt-4 space-y-3 text-sm">
                <li>
                  <a
                    href="https://github.com/qnchoyy"
                    target="_blank"
                    rel="noreferrer"
                    className="text-surface/70 transition-colors hover:text-lime"
                  >
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex items-center justify-between border-t border-surface/10 py-8 text-sm text-surface/50">
          <span>© 2026 SportSpotter</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
