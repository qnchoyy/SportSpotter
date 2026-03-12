import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

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

            <div className="flex items-center gap-6">
              <NavLink
                to="/matches"
                className="text-sm font-medium text-white/70 transition hover:text-white"
              >
                Matches
              </NavLink>
            </div>

            <div className="flex items-center gap-2">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center gap-3 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2">
                    <span className="text-xs text-indigo-400">
                      Welcome back,
                    </span>
                    <span className="text-sm font-semibold text-indigo-200">
                      {user?.username}
                    </span>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <NavLink
                    to="/login"
                    className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
                  >
                    Log In
                  </NavLink>

                  <NavLink
                    to="/register"
                    className="rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 px-4 py-2 text-sm font-semibold text-white shadow-[0_12px_30px_-18px_rgba(99,102,241,1)] transition hover:brightness-110 active:brightness-95"
                  >
                    Get Started
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
