import { useState, type SyntheticEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { authService } from "../services/auth";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);

    try {
      const data = await authService.register({
        email,
        password,
        username,
        firstName,
        lastName,
      });
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
    <div className="flex min-h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-3 rounded-lg border border-white/10 bg-slate-900/50 p-6 backdrop-blur"
      >
        <h1 className="text-2xl font-bold text-white text-center">Register</h1>
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
            id="email"
            type="email"
            value={email}
            required
            disabled={isLoading}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-slate-800/50 px-4 py-2 text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-none"
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
            id="password"
            type="password"
            value={password}
            required
            disabled={isLoading}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-slate-800/50 px-4 py-2 text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-none"
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-300"
          >
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            required
            disabled={isLoading}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-slate-800/50 px-4 py-2 text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-none"
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-300"
          >
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            required
            disabled={isLoading}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-slate-800/50 px-4 py-2 text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-none"
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-300"
          >
            First Name
          </label>
          <input
            id="firstName"
            type="text"
            value={firstName}
            required
            disabled={isLoading}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-slate-800/50 px-4 py-2 text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-none"
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-300"
          >
            Last Name
          </label>
          <input
            id="lastName"
            type="text"
            value={lastName}
            required
            disabled={isLoading}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-slate-800/50 px-4 py-2 text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 px-4 py-2 font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? "Registering.." : "Register"}
        </button>

        <div className="text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-400 hover:text-indigo-300 transition"
          >
            Log in
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
