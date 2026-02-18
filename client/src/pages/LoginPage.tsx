import { useState, type SyntheticEvent } from "react";
import { authService } from "../services/auth";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

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
    <div className="flex min-h-screen items-center justify-center -mt-24">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-4 rounded-lg border border-white/10 bg-slate-900/50 p-8 backdrop-blur"
      >
        <h1 className="text-2xl font-bold text-white text-center">Login</h1>
        {error && (
          <div className="rounded bg-red-500/10 border border-red-500/50 p-3 text-sm text-red-400">
            {error}
          </div>
        )}

        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-300"
          >
            Email
          </label>
          <input
            className="w-full rounded-lg border border-white/10 bg-slate-800/50 px-4 py-2 text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-none"
            required
            disabled={isLoading}
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-300"
          >
            Password
          </label>
          <input
            className="w-full rounded-lg border border-white/10 bg-slate-800/50 px-4 py-2 text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-none"
            required
            disabled={isLoading}
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 px-4 py-2 font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>

        <div className="text-center text-sm text-gray-400">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-indigo-400 hover:text-indigo-300 transition"
          >
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
