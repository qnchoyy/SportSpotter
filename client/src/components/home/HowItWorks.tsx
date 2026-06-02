import FeatureCard from "./FeatureCard";

const HowItWorks = () => {
  return (
    <section className="py-14">
      <div className="flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-lime"></span>
        <span className="text-xs font-semibold uppercase tracking-wider text-lime-dark">
          From idea to game day
        </span>
      </div>

      <h2 className="mt-4 max-w-xl text-4xl font-bold tracking-tight text-ink">
        How it works
      </h2>

      <p className="mt-3 max-w-md text-ink-muted">
        Three steps and you're on the pitch.
      </p>

      <div className="relative mt-12">
        <div className="absolute left-0 right-0 top-14 hidden h-px bg-border md:block" />

        <div className="relative grid grid-cols-1 gap-6 md:grid-cols-3">
          <FeatureCard
            number="01"
            title="Find a match"
            description="Browse games near you, filtered by sport and skill level."
          />
          <FeatureCard
            number="02"
            title="Join or create"
            description="Join an existing game, or organize your own in minutes."
          />
          <FeatureCard
            number="03"
            title="Play"
            description="Show up, meet players, and enjoy your favorite sport."
            highlight
          />
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
