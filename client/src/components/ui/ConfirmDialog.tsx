type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isLoading?: boolean;
  variant?: "danger" | "default";
};

const ConfirmDialog = ({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  isLoading = false,
  variant = "default",
}: Props) => {
  const variantClasses = {
    danger: "bg-red-500/15 border-red-500/30 text-red-300 hover:bg-red-500/25",
    default:
      "bg-indigo-500/15 border-indigo-500/30 text-indigo-400 hover:bg-indigo-500/25",
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="w-full max-w-sm bg-slate-900/80 backdrop-blur border border-white/10 p-6 rounded-2xl shadow-2xl">
        <h2 className="text-xl font-semibold text-white mb-2">{title}</h2>

        <p className="text-sm text-white/60 mb-6">{description}</p>

        <div className="flex gap-3 justify-end">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {cancelLabel}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${variantClasses[variant]}`}
          >
            {isLoading ? "Loading..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
