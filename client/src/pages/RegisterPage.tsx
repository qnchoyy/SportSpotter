import { useState, type SyntheticEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { authService } from "../services/auth";
import Button from "../components/ui/Button";

type FormFields =
  | "email"
  | "password"
  | "confirmPassword"
  | "username"
  | "firstName"
  | "lastName";
type FormErrors = Partial<Record<FormFields, string>>;

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
  const [errors, setErrors] = useState<FormErrors>({});

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

  const fieldClass = (field: FormFields) =>
    `w-full rounded-lg border bg-surface-muted px-4 py-2.5 text-sm text-ink placeholder:text-ink-subtle outline-none transition-colors ${
      errors[field] ? "border-danger" : "border-border focus:border-ink/30"
    }`;

  return (
    <div className="flex min-h-[70vh] items-center justify-center py-10">
      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-md rounded-2xl border border-border bg-surface p-8 shadow-md"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-lime to-transparent" />

        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-lime" />
          <span className="text-xs font-semibold uppercase tracking-wider text-lime-dark">
            Get started
          </span>
        </div>

        <h1 className="mt-3 text-2xl font-bold tracking-tight text-ink">
          Create your account
        </h1>

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
              onChange={(e) => {
                setEmail(e.target.value);
                clearFieldError("email");
              }}
              className={fieldClass("email")}
            />
            {errors.email && (
              <p className="text-xs text-danger">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-ink"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              required
              disabled={isLoading}
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                clearFieldError("username");
              }}
              className={fieldClass("username")}
            />
            {errors.username && (
              <p className="text-xs text-danger">{errors.username}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-ink"
              >
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                required
                disabled={isLoading}
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                  clearFieldError("firstName");
                }}
                className={fieldClass("firstName")}
              />
              {errors.firstName && (
                <p className="text-xs text-danger">{errors.firstName}</p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-ink"
              >
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                required
                disabled={isLoading}
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                  clearFieldError("lastName");
                }}
                className={fieldClass("lastName")}
              />
              {errors.lastName && (
                <p className="text-xs text-danger">{errors.lastName}</p>
              )}
            </div>
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
              onChange={(e) => {
                setPassword(e.target.value);
                clearFieldError("password");
              }}
              className={fieldClass("password")}
            />
            {errors.password && (
              <p className="text-xs text-danger">{errors.password}</p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-ink"
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
              className={fieldClass("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="text-xs text-danger">{errors.confirmPassword}</p>
            )}
          </div>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={isLoading}
          className="mt-6 w-full"
        >
          {isLoading ? "Registering..." : "Register"}
        </Button>

        <p className="mt-6 text-center text-sm text-ink-muted">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-lime-dark transition-colors hover:text-ink"
          >
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
