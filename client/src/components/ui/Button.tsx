import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-lime text-ink hover:bg-lime-dark active:bg-lime-dark disabled:bg-surface-elevated disabled:text-ink-subtle",
  secondary:
    "bg-ink text-surface hover:bg-ink/80 active:bg-ink disabled:bg-surface-elevated disabled:text-ink-subtle",
  ghost:
    "bg-transparent text-ink hover:bg-surface-elevated active:bg-border disabled:text-ink-subtle",
  danger:
    "bg-danger text-surface hover:bg-danger/90 active:bg-danger disabled:bg-surface-elevated disabled:text-ink-subtle",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-2.5 text-sm",
  lg: "px-8 py-3.5 text-base",
};

const Button = ({
  variant = "primary",
  size = "md",
  children,
  className = "",
  disabled,
  ...rest
}: ButtonProps) => {
  const baseStyles =
    "inline-flex cursor-pointer items-center justify-center rounded-full font-semibold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime focus-visible:ring-offset-2 disabled:cursor-not-allowed";

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
