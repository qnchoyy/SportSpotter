type FeatureCardProps = {
  number: string;
  title: string;
  description: string;
  highlight?: boolean;
};

const FeatureCard = ({
  number,
  title,
  description,
  highlight = false,
}: FeatureCardProps) => {
  return (
    <div
      className={`rounded-xl border p-8 transition hover:-translate-y-1 ${
        highlight ? "border-lime bg-lime" : "border-border bg-surface"
      }`}
    >
      <span
        className={`text-4xl font-bold ${
          highlight ? "text-ink" : "text-lime-dark"
        }`}
      >
        {number}
      </span>

      <h3 className="mt-4 text-xl font-bold text-ink">{title}</h3>

      <p className={`mt-2 ${highlight ? "text-ink/70" : "text-ink-muted"}`}>
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;
