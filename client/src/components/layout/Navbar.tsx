import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="sticky top-0 z-50 px-4 pt-4">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-full border border-white/10 bg-slate-950/40 px-4 py-3 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <NavLink
              to="/"
              className="font-semibold text-white transition hover:text-white/90"
            >
              SportSpotter
            </NavLink>

            <div className="flex items-center gap-2">
              <NavLink
                to="/login"
                className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
              >
                Log In
              </NavLink>

              <NavLink
                to="/"
                className="rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 px-4 py-2 text-sm font-semibold text-white shadow-[0_12px_30px_-18px_rgba(99,102,241,1)] transition hover:brightness-110 active:brightness-95"
              >
                Get Started
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
