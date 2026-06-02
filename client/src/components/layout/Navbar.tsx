import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import Button from "../ui/Button";

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const { profile } = useCurrentUser();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `relative text-sm font-medium transition-colors ${
      isActive ? "text-ink" : "text-ink-muted hover:text-ink"
    }`;

  return (
    <div className="top-0 z-50 px-4 pt-4">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-full border border-border/80 bg-surface px-5 py-3 shadow-[0_8px_30px_-12px_var(--color-lime)]">
          <div className="flex items-center justify-between">
            <NavLink
              to="/"
              className="text-lg font-bold tracking-tight text-ink transition-colors hover:text-ink-muted"
            >
              SportSpotter
            </NavLink>

            <div className="flex items-center gap-8">
              <NavLink to="/" end className={navLinkClass}>
                {({ isActive }) => (
                  <>
                    Home
                    {isActive && (
                      <span className="absolute -bottom-2 left-0 right-0 h-0.5 rounded-full bg-lime shadow-[0_0_8px_var(--color-lime)]" />
                    )}
                  </>
                )}
              </NavLink>

              <NavLink to="/matches" className={navLinkClass}>
                {({ isActive }) => (
                  <>
                    Matches
                    {isActive && (
                      <span className="absolute -bottom-2 left-0 right-0 h-0.5 rounded-full bg-lime shadow-[0_0_8px_var(--color-lime)]" />
                    )}
                  </>
                )}
              </NavLink>

              {isAuthenticated && (
                <NavLink to="/profile" className={navLinkClass}>
                  {({ isActive }) => (
                    <>
                      Profile
                      {isActive && (
                        <span className="absolute -bottom-2 left-0 right-0 h-0.5 rounded-full bg-lime shadow-[0_0_8px_var(--color-lime)]" />
                      )}
                    </>
                  )}
                </NavLink>
              )}
            </div>

            <div className="flex items-center gap-3">
              {isAuthenticated ? (
                <>
                  <span className="text-sm font-medium text-ink-muted">
                    Hi,{" "}
                    <span className="text-lime-dark">{profile?.username}</span>
                  </span>
                  <Button variant="ghost" size="sm" onClick={handleLogout}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <NavLink to="/login">
                    <Button variant="ghost" size="sm">
                      Log In
                    </Button>
                  </NavLink>
                  <NavLink to="/register">
                    <Button variant="primary" size="sm">
                      Get Started
                    </Button>
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
