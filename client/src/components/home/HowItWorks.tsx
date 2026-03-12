import FeatureCard from "./FeatureCard";

const HowItWorks = () => {
  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold text-center">How SportSpotter Works</h2>

      <div className="mt-12 grid grid-cols-3 gap-8">
        <FeatureCard
          title="Browse Matches"
          description="Discover matches created by other players near you."
        />

        <FeatureCard
          title="Create or Join"
          description="Join existing games or organize your own match."
        />

        <FeatureCard
          title="Play"
          description="Meet players and enjoy your favorite sport."
        />
      </div>
    </section>
  );
};

export default HowItWorks;
