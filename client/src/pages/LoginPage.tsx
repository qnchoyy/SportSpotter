import { useState, type SyntheticEvent } from "react";
import { authService } from "../services/auth";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Button from "../components/ui/Button";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const data = await authService.login({ email, password });
      login(data.user, data.accessToken);
      navigate("/");
    } catch (err: any) {
      const msg = err?.response?.data?.message;
      if (Array.isArray(msg)) setError(msg.join(", "));
      else if (msg) setError(String(msg));
      else setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-md rounded-2xl border border-border bg-surface p-8 shadow-md"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-lime to-transparent" />

        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-lime" />
          <span className="text-xs font-semibold uppercase tracking-wider text-lime-dark">
            Welcome back
          </span>
        </div>

        <h1 className="mt-3 text-2xl font-bold tracking-tight text-ink">
          Log in to SportSpotter
        </h1>

        {error && (
          <div className="mt-6 rounded-lg border border-danger/40 bg-danger/10 p-3 text-sm text-danger">
            {error}
          </div>
        )}

        <div className="mt-6 space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-ink"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              disabled={isLoading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-border bg-surface-muted px-4 py-2.5 text-sm text-ink placeholder:text-ink-subtle outline-none transition-colors focus:border-ink/30"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-ink"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              disabled={isLoading}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-border bg-surface-muted px-4 py-2.5 text-sm text-ink placeholder:text-ink-subtle outline-none transition-colors focus:border-ink/30"
            />
          </div>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={isLoading}
          className="mt-6 w-full"
        >
          {isLoading ? "Logging in..." : "Log in"}
        </Button>

        <p className="mt-6 text-center text-sm text-ink-muted">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-lime-dark transition-colors hover:text-ink"
          >
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
