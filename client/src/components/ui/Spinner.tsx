type SpinnerProps = {
  size?: "sm" | "md" | "lg";
};

const Spinner = ({ size = "md" }: SpinnerProps) => {
  const sizeClasses = {
    sm: "h-4 w-4 border",
    md: "h-8 w-8 border-2",
    lg: "h-12 w-12 border-4",
  };

  return (
    <div className="flex justify-center py-10">
      <div
        className={`animate-spin rounded-full border-white/20 border-t-sky-500 ${sizeClasses[size]}`}
      ></div>
    </div>
  );
};

export default Spinner;
