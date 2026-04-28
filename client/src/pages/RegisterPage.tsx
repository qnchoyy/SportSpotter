import { useState, type SyntheticEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { authService } from "../services/auth";

type FormFields =
  | "email"
  | "password"
  | "confirmPassword"
  | "username"
  | "firstName"
  | "lastName";

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
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    if (password !== confirmPassword) {
      setErrors({ confirmPassword: "Passwords do not match" });
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
      const data = err.response?.data;
      if (data && typeof data === "object") {
        setErrors(data);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const clearFieldError = (field: FormFields) => {
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-3 rounded-lg border border-white/10 bg-slate-900/50 p-6 backdrop-blur"
      >
        <h1 className="text-2xl font-bold text-white text-center">Register</h1>
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
            onChange={(e) => {
              setEmail(e.target.value);
              clearFieldError("email");
            }}
            className={`w-full rounded-lg border bg-slate-800/50 px-4 py-2 text-white placeholder-gray-500 focus:outline-none ${
              errors.email
                ? "border-red-500"
                : "border-white/10 focus:border-indigo-500"
            }`}
          />
          {errors.email && (
            <p className="text-xs text-red-400">{errors.email}</p>
          )}
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
            onChange={(e) => {
              setPassword(e.target.value);
              clearFieldError("password");
            }}
            className={`w-full rounded-lg border bg-slate-800/50 px-4 py-2 text-white placeholder-gray-500 focus:outline-none ${
              errors.password
                ? "border-red-500"
                : "border-white/10 focus:border-indigo-500"
            }`}
          />
          {errors.password && (
            <p className="text-xs text-red-400">{errors.password}</p>
          )}
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
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              clearFieldError("confirmPassword");
            }}
            className={`w-full rounded-lg border bg-slate-800/50 px-4 py-2 text-white placeholder-gray-500 focus:outline-none ${
              errors.confirmPassword
                ? "border-red-500"
                : "border-white/10 focus:border-indigo-500"
            }`}
          />
          {errors.confirmPassword && (
            <p className="text-xs text-red-400">{errors.confirmPassword}</p>
          )}
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
            onChange={(e) => {
              setUsername(e.target.value);
              clearFieldError("username");
            }}
            className={`w-full rounded-lg border bg-slate-800/50 px-4 py-2 text-white placeholder-gray-500 focus:outline-none ${
              errors.username
                ? "border-red-500"
                : "border-white/10 focus:border-indigo-500"
            }`}
          />
          {errors.username && (
            <p className="text-xs text-red-400">{errors.username}</p>
          )}
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
            onChange={(e) => {
              setFirstName(e.target.value);
              clearFieldError("firstName");
            }}
            className={`w-full rounded-lg border bg-slate-800/50 px-4 py-2 text-white placeholder-gray-500 focus:outline-none ${
              errors.firstName
                ? "border-red-500"
                : "border-white/10 focus:border-indigo-500"
            }`}
          />
          {errors.firstName && (
            <p className="text-xs text-red-400">{errors.firstName}</p>
          )}
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
            onChange={(e) => {
              setLastName(e.target.value);
              clearFieldError("lastName");
            }}
            className={`w-full rounded-lg border bg-slate-800/50 px-4 py-2 text-white placeholder-gray-500 focus:outline-none ${
              errors.lastName
                ? "border-red-500"
                : "border-white/10 focus:border-indigo-500"
            }`}
          />
          {errors.lastName && (
            <p className="text-xs text-red-400">{errors.lastName}</p>
          )}
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
