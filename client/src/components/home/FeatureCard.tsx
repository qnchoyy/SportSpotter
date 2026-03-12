type FeatureCardProps = {
  title: string;
  description: string;
};

const FeatureCard = ({ title, description }: FeatureCardProps) => {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900/40 p-6 text-center transition hover:-translate-y-1 hover:border-blue-500/50">
      <h3 className="text-xl font-semibold text-white">{title}</h3>

      <p className="mt-2 text-gray-400">{description}</p>
    </div>
  );
};

export default FeatureCard;
